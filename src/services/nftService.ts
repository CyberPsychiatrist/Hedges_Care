import { PlantNFT, NFTCollection, MintingRequest, NFTTrade, UserNFTPortfolio, NFTMarketplace } from '@/types/nft';
import { MockUser } from './mockDataService';

// Environment variables
const NFT_CONTRACT_ADDRESS = import.meta.env.VITE_NFT_CONTRACT_ADDRESS || '0x1234567890123456789012345678901234567890';
const BLOCKCHAIN_CHAIN_ID = import.meta.env.VITE_BLOCKCHAIN_CHAIN_ID || '137'; // Polygon mainnet
const MOCK_CURRENCY = import.meta.env.VITE_MOCK_CURRENCY || 'ETH';

// Sample plant species for NFT generation
const samplePlantSpecies = [
  {
    species_name: 'Mangifera indica',
    common_name: 'Mango Tree',
    plant_type: 'tree',
    description: 'Tropical fruit tree known for its delicious fruits and excellent carbon sequestration capabilities.',
    environmental_benefits: 'High CO2 absorption rate of 52.5 kg CO2 annually per healthy tree.',
    co2_absorption: {
      daily: 0.144,
      annual: 52.5,
      impact: 'Equivalent to offsetting 1,825 km of car driving annually'
    },
    growth_conditions: {
      height_m: 14.98,
      canopy_m2: 61.162,
      optimal_temp: 20.71,
      rainfall_mm: 530.4,
      soil_type: 'Loam'
    },
    confidence: 0.95
  },
  {
    species_name: 'Jacaranda mimosifolia',
    common_name: 'Jacaranda Tree',
    plant_type: 'tree',
    description: 'Beautiful ornamental tree with purple flowers. Excellent for urban landscaping.',
    environmental_benefits: 'Absorbs 28.9 kg CO2 annually. Creates beautiful canopy cover and improves urban air quality.',
    co2_absorption: {
      daily: 0.079,
      annual: 28.9,
      impact: 'Equivalent to offsetting 1,000 km of car driving annually'
    },
    growth_conditions: {
      height_m: 17.685,
      canopy_m2: 7.692,
      optimal_temp: 10.16,
      rainfall_mm: 335.9,
      soil_type: 'Sandy'
    },
    confidence: 0.92
  },
  {
    species_name: 'Delonix regia',
    common_name: 'Flame Tree',
    plant_type: 'tree',
    description: 'Striking ornamental tree with brilliant red-orange flowers. Fast-growing and excellent for carbon sequestration.',
    environmental_benefits: 'High absorption rate of 51.0 kg CO2 annually. Provides excellent shade and habitat for birds.',
    co2_absorption: {
      daily: 0.140,
      annual: 51.0,
      impact: 'Equivalent to offsetting 1,860 km of car driving annually'
    },
    growth_conditions: {
      height_m: 6.965,
      canopy_m2: 42.891,
      optimal_temp: 26.17,
      rainfall_mm: 1377.9,
      soil_type: 'Peaty'
    },
    confidence: 0.94
  }
];

// Generate rarity based on environmental impact
const generateRarity = (co2Absorption: number): 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' => {
  if (co2Absorption >= 60) return 'legendary';
  if (co2Absorption >= 45) return 'epic';
  if (co2Absorption >= 35) return 'rare';
  if (co2Absorption >= 25) return 'uncommon';
  return 'common';
};

// Generate mock NFT image URL
const generateNFTImageUrl = (tokenId: string, species: string): string => {
  return `https://picsum.photos/seed/${species}-${tokenId}/400/400.jpg`;
};

// Mock NFT data storage
let mockNFTs: PlantNFT[] = [];
let mockCollections: NFTCollection[] = [];
let mockTrades: NFTTrade[] = [];

// Initialize mock data
const initializeMockData = () => {
  if (mockNFTs.length === 0) {
    // Create sample NFTs
    mockNFTs = [
      {
        id: 'nft-1',
        tokenId: '1001',
        name: 'Mango Tree Guardian',
        description: 'A majestic mango tree contributing to carbon sequestration and biodiversity.',
        imageUrl: generateNFTImageUrl('1001', 'Mango'),
        speciesName: 'Mangifera indica',
        commonName: 'Mango Tree',
        plantType: 'tree',
        environmentalImpact: {
          co2AbsorbedAnnual: 52.5,
          co2AbsorbedDaily: 0.144,
          canopyArea: 61.162,
          height: 14.98,
          location: 'Nairobi, Kenya'
        },
        metadata: {
          confidence: 0.95,
          scanDate: new Date(Date.now() - 86400000).toISOString(),
          optimalTemp: 20.71,
          rainfall: 530.4,
          soilType: 'Loam',
          healthScore: 0.92,
          rarity: generateRarity(52.5)
        },
        ownership: {
          ownerAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f845e0',
          creatorAddress: '0x1234567890123456789012345678901234567890',
          mintDate: new Date(Date.now() - 86400000).toISOString()
        },
        blockchain: {
          contractAddress: NFT_CONTRACT_ADDRESS,
          chainId: BLOCKCHAIN_CHAIN_ID,
          transactionHash: '0xabc123...456def',
          blockNumber: 12345678
        },
        marketData: {
          currentPrice: 0.15,
          currency: MOCK_CURRENCY,
          listedForSale: false,
          lastSalePrice: 0.12,
          lastSaleDate: new Date(Date.now() - 172800000).toISOString()
        }
      },
      {
        id: 'nft-2',
        tokenId: '1002',
        name: 'Jacaranda Beauty',
        description: 'An elegant jacaranda tree enhancing urban air quality and aesthetic beauty.',
        imageUrl: generateNFTImageUrl('1002', 'Jacaranda'),
        speciesName: 'Jacaranda mimosifolia',
        commonName: 'Jacaranda Tree',
        plantType: 'tree',
        environmentalImpact: {
          co2AbsorbedAnnual: 28.9,
          co2AbsorbedDaily: 0.079,
          canopyArea: 7.692,
          height: 17.685,
          location: 'Mombasa, Kenya'
        },
        metadata: {
          confidence: 0.92,
          scanDate: new Date(Date.now() - 172800000).toISOString(),
          optimalTemp: 10.16,
          rainfall: 335.9,
          soilType: 'Sandy',
          healthScore: 0.88,
          rarity: generateRarity(28.9)
        },
        ownership: {
          ownerAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f845e0',
          creatorAddress: '0x1234567890123456789012345678901234567890',
          mintDate: new Date(Date.now() - 172800000).toISOString()
        },
        blockchain: {
          contractAddress: NFT_CONTRACT_ADDRESS,
          chainId: BLOCKCHAIN_CHAIN_ID,
          transactionHash: '0xdef456...789abc',
          blockNumber: 12345679
        },
        marketData: {
          currentPrice: 0.08,
          currency: MOCK_CURRENCY,
          listedForSale: true,
          lastSalePrice: 0.06,
          lastSaleDate: new Date(Date.now() - 259200000).toISOString()
        }
      }
    ];

    // Create sample collection
    mockCollections = [
      {
        id: 'collection-1',
        name: 'Plant Guardians Collection',
        description: 'NFTs representing verified plant species and their environmental impact.',
        totalSupply: 1000,
        mintedCount: 2,
        floorPrice: 0.06,
        averagePrice: 0.115,
        totalVolume: 0.18,
        imageUrl: 'https://picsum.photos/seed/plant-guardians/400/400.jpg',
        contractAddress: NFT_CONTRACT_ADDRESS,
        ownerAddress: '0x1234567890123456789012345678901234567890',
        createdAt: new Date(Date.now() - 604800000).toISOString()
      }
    ];

    // Create sample trades
    mockTrades = [
      {
        id: 'trade-1',
        tokenId: '1001',
        fromAddress: '0x1234567890123456789012345678901234567890',
        toAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f845e0',
        price: 0.12,
        currency: MOCK_CURRENCY,
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        transactionHash: '0xtrade123...456trade',
        marketplaceFee: 0.012
      },
      {
        id: 'trade-2',
        tokenId: '1002',
        fromAddress: '0x1234567890123456789012345678901234567890',
        toAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f845e0',
        price: 0.06,
        currency: MOCK_CURRENCY,
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        transactionHash: '0xtrade456...789trade',
        marketplaceFee: 0.006
      }
    ];
  }
};

export const nftService = {
  // Initialize mock data
  initialize: () => {
    initializeMockData();
  },

  // Mint a new plant NFT
  mintNFT: async (mintingRequest: MintingRequest): Promise<{ success: boolean; nft?: PlantNFT; error?: string }> => {
    try {
      initializeMockData();
      
      // Simulate minting delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const randomPlant = samplePlantSpecies[Math.floor(Math.random() * samplePlantSpecies.length)];
      const tokenId = (1000 + mockNFTs.length + 1).toString();
      
      const newNFT: PlantNFT = {
        id: `nft-${Date.now()}`,
        tokenId,
        name: `${randomPlant.common_name} Guardian #${tokenId}`,
        description: randomPlant.description,
        imageUrl: generateNFTImageUrl(tokenId, randomPlant.species_name),
        speciesName: randomPlant.species_name,
        commonName: randomPlant.common_name,
        plantType: randomPlant.plant_type,
        environmentalImpact: {
          co2AbsorbedAnnual: randomPlant.co2_absorption.annual,
          co2AbsorbedDaily: randomPlant.co2_absorption.daily,
          canopyArea: randomPlant.growth_conditions.canopy_m2,
          height: randomPlant.growth_conditions.height_m,
          location: 'Kenya'
        },
        metadata: {
          confidence: randomPlant.confidence,
          scanDate: new Date().toISOString(),
          optimalTemp: randomPlant.growth_conditions.optimal_temp,
          rainfall: randomPlant.growth_conditions.rainfall_mm,
          soilType: randomPlant.growth_conditions.soil_type,
          healthScore: Math.random() * 0.3 + 0.7, // Random health score between 0.7-1.0
          rarity: generateRarity(randomPlant.co2_absorption.annual)
        },
        ownership: {
          ownerAddress: mintingRequest.walletAddress || `0xuser-${mintingRequest.userId}`,
          creatorAddress: mintingRequest.walletAddress || `0xuser-${mintingRequest.userId}`,
          mintDate: new Date().toISOString()
        },
        blockchain: {
          contractAddress: NFT_CONTRACT_ADDRESS,
          chainId: BLOCKCHAIN_CHAIN_ID,
          transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          blockNumber: 12345678 + mockNFTs.length
        }
      };
      
      mockNFTs.push(newNFT);
      
      // Update collection stats
      if (mockCollections.length > 0) {
        mockCollections[0].mintedCount += 1;
      }
      
      return { success: true, nft: newNFT };
    } catch (error) {
      return { success: false, error: 'Failed to mint NFT' };
    }
  },

  // Get user's NFT portfolio
  getUserPortfolio: async (userId: string): Promise<UserNFTPortfolio> => {
    initializeMockData();
    
    const userNFTs = mockNFTs.filter(nft => 
      nft.ownership.ownerAddress === `0xuser-${userId}` || 
      nft.ownership.ownerAddress === '0x742d35Cc6634C0532925a3b844Bc9e7595f845e0'
    );
    
    const totalValue = userNFTs.reduce((sum, nft) => {
      return sum + (nft.marketData?.currentPrice || 0);
    }, 0);
    
    return {
      userId,
      totalNFTs: userNFTs.length,
      totalValue,
      nfts: userNFTs,
      recentTrades: mockTrades.filter(trade => 
        trade.toAddress === `0xuser-${userId}` || 
        trade.fromAddress === `0xuser-${userId}`
      ).slice(0, 5)
    };
  },

  // Get all NFTs
  getAllNFTs: async (): Promise<PlantNFT[]> => {
    initializeMockData();
    return mockNFTs;
  },

  // Get NFT by ID
  getNFTById: async (id: string): Promise<PlantNFT | null> => {
    initializeMockData();
    return mockNFTs.find(nft => nft.id === id) || null;
  },

  // List NFT for sale
  listNFTForSale: async (nftId: string, price: number): Promise<{ success: boolean; error?: string }> => {
    try {
      initializeMockData();
      const nft = mockNFTs.find(n => n.id === nftId);
      if (!nft) {
        return { success: false, error: 'NFT not found' };
      }
      
      nft.marketData = {
        ...nft.marketData,
        currentPrice: price,
        currency: MOCK_CURRENCY,
        listedForSale: true
      };
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to list NFT' };
    }
  },

  // Purchase NFT
  purchaseNFT: async (nftId: string, buyerAddress: string): Promise<{ success: boolean; error?: string }> => {
    try {
      initializeMockData();
      const nft = mockNFTs.find(n => n.id === nftId);
      if (!nft) {
        return { success: false, error: 'NFT not found' };
      }
      
      if (!nft.marketData?.listedForSale) {
        return { success: false, error: 'NFT not available for purchase' };
      }
      
      // Create trade record
      const newTrade: NFTTrade = {
        id: `trade-${Date.now()}`,
        tokenId: nft.tokenId,
        fromAddress: nft.ownership.ownerAddress,
        toAddress: buyerAddress,
        price: nft.marketData.currentPrice || 0,
        currency: MOCK_CURRENCY,
        timestamp: new Date().toISOString(),
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        marketplaceFee: (nft.marketData.currentPrice || 0) * 0.1
      };
      
      mockTrades.unshift(newTrade);
      
      // Update NFT ownership
      nft.ownership.ownerAddress = buyerAddress;
      nft.ownership.lastTransferDate = new Date().toISOString();
      nft.marketData.listedForSale = false;
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to purchase NFT' };
    }
  },

  // Get marketplace listings
  getMarketplaceListings: async (): Promise<NFTMarketplace> => {
    initializeMockData();
    
    const listings = mockNFTs
      .filter(nft => nft.marketData?.listedForSale)
      .map(nft => ({
        nftId: nft.id,
        tokenId: nft.tokenId,
        sellerAddress: nft.ownership.ownerAddress,
        price: nft.marketData?.currentPrice || 0,
        currency: MOCK_CURRENCY,
        expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }));
    
    return { listings };
  },

  // Get collections
  getCollections: async (): Promise<NFTCollection[]> => {
    initializeMockData();
    return mockCollections;
  },

  // Get collection by ID
  getCollectionById: async (id: string): Promise<NFTCollection | null> => {
    initializeMockData();
    return mockCollections.find(c => c.id === id) || null;
  }
};