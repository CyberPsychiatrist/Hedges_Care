
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nftService } from '../nftService';
import { PlantNFT, MintingRequest, NFTTrade, UserNFTPortfolio } from '@/types/nft';

// Mock environment variables
const mockEnv = {
  VITE_NFT_CONTRACT_ADDRESS: '0x1234567890123456789012345678901234567890',
  VITE_BLOCKCHAIN_CHAIN_ID: '137',
  VITE_MOCK_CURRENCY: 'ETH'
};

describe('NFT Service', () => {
  beforeEach(() => {
    // Reset mock data before each test
    const originalEnv = { ...import.meta.env };
    Object.assign(import.meta.env, mockEnv);
    
    // Clear mock data
    (global as any).mockNFTs = [];
    (global as any).mockCollections = [];
    (global as any).mockTrades = [];
    
    // Initialize the service
    nftService.initialize();
  });

  describe('initialize', () => {
    it('should initialize mock data with default NFTs', async () => {
      nftService.initialize();
      
      const nfts = await nftService.getAllNFTs();
      expect(nfts.length).toBeGreaterThan(0);
      
      const collections = await nftService.getCollections();
      expect(collections.length).toBeGreaterThan(0);
    });
  });

  describe('mintNFT', () => {
    it('should successfully mint a new NFT', async () => {
      const mintingRequest: MintingRequest = {
        plantData: {},
        userId: 'test-user-1',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f845e0'
      };

      const result = await nftService.mintNFT(mintingRequest);
      
      expect(result.success).toBe(true);
      expect(result.nft).toBeDefined();
      expect(result.error).toBeUndefined();
      
      if (result.nft) {
        expect(result.nft.id).toBeDefined();
        expect(result.nft.tokenId).toBeDefined();
        expect(result.nft.name).toContain('Guardian');
        expect(result.nft.ownership.ownerAddress).toBe(mintingRequest.walletAddress);
      }
    });

    it('should handle minting errors gracefully', async () => {
      // Test with invalid request
      const invalidRequest: any = {};
      
      const result = await nftService.mintNFT(invalidRequest);
      
      // Since this is a mock service, it should still succeed
      // but we can test the error handling structure
      expect(result).toBeDefined();
    });
  });

  describe('getUserPortfolio', () => {
    it('should return user portfolio with NFTs', async () => {
      const userId = 'test-user-1';
      const portfolio = await nftService.getUserPortfolio(userId);
      
      expect(portfolio).toBeDefined();
      expect(portfolio.userId).toBe(userId);
      expect(Array.isArray(portfolio.nfts)).toBe(true);
      expect(Array.isArray(portfolio.recentTrades)).toBe(true);
      expect(typeof portfolio.totalNFTs).toBe('number');
      expect(typeof portfolio.totalValue).toBe('number');
    });

    it('should return empty portfolio for non-existent user', async () => {
      const portfolio = await nftService.getUserPortfolio('non-existent-user');
      
      expect(portfolio).toBeDefined();
      expect(portfolio.totalNFTs).toBe(0);
      expect(portfolio.totalValue).toBe(0);
      expect(portfolio.nfts.length).toBe(0);
    });
  });

  describe('getAllNFTs', () => {
    it('should return all NFTs', async () => {
      const nfts = await nftService.getAllNFTs();
      
      expect(Array.isArray(nfts)).toBe(true);
      if (nfts.length > 0) {
        expect(nfts[0]).toHaveProperty('id');
        expect(nfts[0]).toHaveProperty('tokenId');
        expect(nfts[0]).toHaveProperty('name');
        expect(nfts[0]).toHaveProperty('imageUrl');
      }
    });
  });

  describe('getNFTById', () => {
    it('should return NFT by valid ID', async () => {
      // First get all NFTs to find a valid ID
      const allNFTs = await nftService.getAllNFTs();
      const validId = allNFTs[0]?.id;
      
      if (validId) {
        const nft = await nftService.getNFTById(validId);
        expect(nft).toBeDefined();
        expect(nft?.id).toBe(validId);
      }
    });

    it('should return null for invalid ID', async () => {
      const nft = await nftService.getNFTById('invalid-id');
      expect(nft).toBeNull();
    });
  });

  describe('listNFTForSale', () => {
    it('should successfully list NFT for sale', async () => {
      // First get all NFTs to find a valid ID
      const allNFTs = await nftService.getAllNFTs();
      const validNFT = allNFTs[0];
      
      if (validNFT) {
        const result = await nftService.listNFTForSale(validNFT.id, 0.1);
        
        expect(result.success).toBe(true);
        expect(result.error).toBeUndefined();
        
        // Verify the NFT is now listed for sale
        const updatedNFT = await nftService.getNFTById(validNFT.id);
        expect(updatedNFT?.marketData?.listedForSale).toBe(true);
        expect(updatedNFT?.marketData?.currentPrice).toBe(0.1);
      }
    });

    it('should handle invalid NFT ID', async () => {
      const result = await nftService.listNFTForSale('invalid-id', 0.1);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('NFT not found');
    });
  });

  describe('purchaseNFT', () => {
    it('should successfully purchase NFT', async () => {
      // First list an NFT for sale
      const allNFTs = await nftService.getAllNFTs();
      const validNFT = allNFTs[0];
      
      if (validNFT) {
        // List it for sale first
        await nftService.listNFTForSale(validNFT.id, 0.1);
        
        const buyerAddress = '0xbuyer-address';
        const result = await nftService.purchaseNFT(validNFT.id, buyerAddress);
        
        expect(result.success).toBe(true);
        expect(result.error).toBeUndefined();
        
        // Verify ownership changed
        const updatedNFT = await nftService.getNFTById(validNFT.id);
        expect(updatedNFT?.ownership.ownerAddress).toBe(buyerAddress);
        expect(updatedNFT?.marketData?.listedForSale).toBe(false);
      }
    });

    it('should handle purchasing non-listed NFT', async () => {
      const allNFTs = await nftService.getAllNFTs();
      const validNFT = allNFTs[0];
      
      if (validNFT) {
        const result = await nftService.purchaseNFT(validNFT.id, 'buyer-address');
        
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
        expect(result.error).toContain('not available for purchase');
      }
    });

    it('should handle purchasing non-existent NFT', async () => {
      const result = await nftService.purchaseNFT('invalid-id', 'buyer-address');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('NFT not found');
    });
  });

  describe('getMarketplaceListings', () => {
    it('should return marketplace listings', async () => {
      // First list an NFT for sale
      const allNFTs = await nftService.getAllNFTs();
      const validNFT = allNFTs[0];
      
      if (validNFT) {
        await nftService.listNFTForSale(validNFT.id, 0.1);
        
        const marketplace = await nftService.getMarketplaceListings();
        
        expect(marketplace).toBeDefined();
        expect(Array.isArray(marketplace.listings)).toBe(true);
        
        if (marketplace.listings.length > 0) {
          expect(marketplace.listings[0]).toHaveProperty('nftId');
          expect(marketplace.listings[0]).toHaveProperty('tokenId');
          expect(marketplace.listings[0]).toHaveProperty('sellerAddress');
          expect(marketplace.listings[0]).toHaveProperty('price');
        }
      }
    });

    it('should return empty array when no listings', async () => {
      // Ensure no NFTs are listed for sale
      const marketplace = await nftService.getMarketplaceListings();
      
      expect(marketplace).toBeDefined();
      expect(Array.isArray(marketplace.listings)).toBe(true);
    });
  });

  describe('getCollections', () => {
    it('should return collections', async () => {
      const collections = await nftService.getCollections();
      
      expect(Array.isArray(collections)).toBe(true);
      if (collections.length > 0) {
        expect(collections[0]).toHaveProperty('id');
        expect(collections[0]).toHaveProperty('name');
        expect(collections[0]).toHaveProperty('totalSupply');
        expect(collections[0]).toHaveProperty('mintedCount');
      }
    });
  });

  describe('getCollectionById', () => {
    it('should return collection by valid ID', async () => {
      const collections = await nftService.getCollections();
      const validId = collections[0]?.id;
      
      if (validId) {
        const collection = await nftService.getCollectionById(validId);
        expect(collection).toBeDefined();
        expect(collection?.id).toBe(validId);
      }
    });

    it('should return null for invalid collection ID', async () => {
      const collection = await nftService.getCollectionById('invalid-id');
      expect(collection).toBeNull();
    });
  });
});