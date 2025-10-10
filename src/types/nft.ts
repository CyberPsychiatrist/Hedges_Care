export interface PlantNFT {
  id: string;
  tokenId: string;
  name: string;
  description: string;
  imageUrl: string;
  speciesName: string;
  commonName: string;
  plantType: string;
  environmentalImpact: {
    co2AbsorbedAnnual: number;
    co2AbsorbedDaily: number;
    canopyArea: number;
    height: number;
    location: string;
  };
  metadata: {
    confidence: number;
    scanDate: string;
    optimalTemp: number;
    rainfall: number;
    soilType: string;
    healthScore: number;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  };
  ownership: {
    ownerAddress: string;
    creatorAddress: string;
    mintDate: string;
    lastTransferDate?: string;
  };
  blockchain: {
    contractAddress: string;
    chainId: string;
    transactionHash: string;
    blockNumber: number;
  };
  marketData?: {
    currentPrice?: number;
    currency?: string;
    listedForSale?: boolean;
    lastSalePrice?: number;
    lastSaleDate?: string;
  };
}

export interface NFTCollection {
  id: string;
  name: string;
  description: string;
  totalSupply: number;
  mintedCount: number;
  floorPrice: number;
  averagePrice: number;
  totalVolume: number;
  imageUrl: string;
  contractAddress: string;
  ownerAddress: string;
  createdAt: string;
}

export interface MintingRequest {
  plantData: any;
  userId: string;
  walletAddress?: string;
  gasPrice?: number;
  estimatedGas?: number;
  estimatedCost?: number;
}

export interface NFTTrade {
  id: string;
  tokenId: string;
  fromAddress: string;
  toAddress: string;
  price: number;
  currency: string;
  timestamp: string;
  transactionHash: string;
  marketplaceFee: number;
}

export interface UserNFTPortfolio {
  userId: string;
  totalNFTs: number;
  totalValue: number;
  nfts: PlantNFT[];
  recentTrades: NFTTrade[];
}

export interface NFTMarketplace {
  listings: {
    nftId: string;
    tokenId: string;
    sellerAddress: string;
    price: number;
    currency: string;
    expirationDate: string;
  }[];
}

export enum NFTStatus {
  MINTING = 'minting',
  MINTED = 'minted',
  LISTED = 'listed',
  TRANSFERRED = 'transferred',
  BURNED = 'burned'
}