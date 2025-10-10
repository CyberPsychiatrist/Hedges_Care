import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { NFTCard } from "./NFTCard";
import { nftService } from "@/services/nftService";
import { PlantNFT, NFTMarketplace } from "@/types/nft";
import { 
  ShoppingCart, 
  Wallet, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Search,
  Filter,
  Grid,
  List,
  Star,
  Zap,
  Leaf,
  TreePine,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const NFTMarketplace: React.FC = () => {
  const { toast } = useToast();
  const [marketplaceData, setMarketplaceData] = useState<NFTMarketplace | null>(null);
  const [allNFTs, setAllNFTs] = useState<PlantNFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'date' | 'rarity'>('date');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriceRange, setFilterPriceRange] = useState<string>('all');
  const [selectedNFT, setSelectedNFT] = useState<PlantNFT | null>(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Initialize NFT service
        nftService.initialize();
        
        // Load marketplace listings
        const marketplace = await nftService.getMarketplaceListings();
        setMarketplaceData(marketplace);
        
        // Load all NFTs for additional filtering
        const allNFTsData = await nftService.getAllNFTs();
        setAllNFTs(allNFTsData);
      } catch (error) {
        console.error('Error loading marketplace data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Combine marketplace listings with all NFTs for comprehensive view
  const marketplaceNFTs = allNFTs.filter(nft => 
    marketplaceData?.listings.some(listing => listing.tokenId === nft.tokenId)
  );

  // Filter and sort NFTs
  const filteredNFTs = marketplaceNFTs
    .filter(nft => {
      const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          nft.speciesName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          nft.commonName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRarity = filterRarity === 'all' || nft.metadata.rarity === filterRarity;
      const matchesType = filterType === 'all' || nft.plantType === filterType;
      
      let matchesPrice = true;
      if (filterPriceRange !== 'all') {
        const price = nft.marketData?.currentPrice || 0;
        switch (filterPriceRange) {
          case '0-0.1':
            matchesPrice = price >= 0 && price <= 0.1;
            break;
          case '0.1-0.5':
            matchesPrice = price > 0.1 && price <= 0.5;
            break;
          case '0.5-1':
            matchesPrice = price > 0.5 && price <= 1;
            break;
          case '1+':
            matchesPrice = price > 1;
            break;
        }
      }
      
      return matchesSearch && matchesRarity && matchesType && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return (a.marketData?.currentPrice || 0) - (b.marketData?.currentPrice || 0);
        case 'date':
          return new Date(b.metadata.scanDate).getTime() - new Date(a.metadata.scanDate).getTime();
        case 'rarity':
          const rarityOrder = { 'legendary': 5, 'epic': 4, 'rare': 3, 'uncommon': 2, 'common': 1 };
          return (rarityOrder[b.metadata.rarity] || 0) - (rarityOrder[a.metadata.rarity] || 0);
        default:
          return 0;
      }
    });

  const handleBuyNFT = (nft: PlantNFT) => {
    setSelectedNFT(nft);
    setShowPurchaseDialog(true);
  };

  const handlePurchase = async () => {
    if (!selectedNFT || !walletAddress) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your wallet address",
      });
      return;
    }

    setPurchaseLoading(true);
    try {
      const result = await nftService.purchaseNFT(selectedNFT.id, walletAddress);
      if (result.success) {
        toast({
          title: "Purchase Successful!",
          description: `You have successfully purchased ${selectedNFT.name}`,
        });
        setShowPurchaseDialog(false);
        // Refresh data
        const updatedMarketplace = await nftService.getMarketplaceListings();
        setMarketplaceData(updatedMarketplace);
        const updatedNFTs = await nftService.getAllNFTs();
        setAllNFTs(updatedNFTs);
      } else {
        throw new Error(result.error || "Purchase failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "An error occurred during purchase",
      });
    } finally {
      setPurchaseLoading(false);
    }
  };

  const getListedNFTs = () => {
    return allNFTs.filter(nft => nft.marketData?.listedForSale);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-purple-500 text-white';
      case 'epic': return 'bg-purple-600 text-white';
      case 'rare': return 'bg-blue-500 text-white';
      case 'uncommon': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return `${price.toFixed(4)} ${currency}`;
  };

  const totalVolume = marketplaceNFTs.reduce((sum, nft) => 
    sum + (nft.marketData?.currentPrice || 0), 0
  );

  const averagePrice = marketplaceNFTs.length > 0 
    ? totalVolume / marketplaceNFTs.length 
    : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Plant NFT Marketplace</h1>
          <p className="text-gray-600">Buy, sell, and trade unique plant NFTs representing environmental impact</p>
        </div>

        {/* Marketplace Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Listed NFTs</p>
                  <p className="text-2xl font-bold text-green-600">{marketplaceNFTs.length}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Volume</p>
                  <p className="text-2xl font-bold text-blue-600">{formatPrice(totalVolume, 'ETH')}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Price</p>
                  <p className="text-2xl font-bold text-purple-600">{formatPrice(averagePrice, 'ETH')}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Floor Price</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {formatPrice(Math.min(...marketplaceNFTs.map(nft => nft.marketData?.currentPrice || 0)), 'ETH')}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search marketplace..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sort and Filter */}
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="rarity">Rarity</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterRarity} onValueChange={setFilterRarity}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rarities</SelectItem>
                    <SelectItem value="legendary">Legendary</SelectItem>
                    <SelectItem value="epic">Epic</SelectItem>
                    <SelectItem value="rare">Rare</SelectItem>
                    <SelectItem value="uncommon">Uncommon</SelectItem>
                    <SelectItem value="common">Common</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="tree">Trees</SelectItem>
                    <SelectItem value="flower">Flowers</SelectItem>
                    <SelectItem value="shrub">Shrubs</SelectItem>
                    <SelectItem value="grass">Grasses</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterPriceRange} onValueChange={setFilterPriceRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-0.1">0 - 0.1 ETH</SelectItem>
                    <SelectItem value="0.1-0.5">0.1 - 0.5 ETH</SelectItem>
                    <SelectItem value="0.5-1">0.5 - 1 ETH</SelectItem>
                    <SelectItem value="1+">1+ ETH</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NFT Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          {filteredNFTs.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              onBuy={(nftId) => {
                const nftToBuy = allNFTs.find(n => n.id === nftId);
                if (nftToBuy) handleBuyNFT(nftToBuy);
              }}
              showActions={true}
              currentOwner={false}
            />
          ))}
        </div>

        {filteredNFTs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No NFTs found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}

        {/* Purchase Dialog */}
        <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-green-500" />
                Purchase NFT
              </DialogTitle>
            </DialogHeader>
            
            {selectedNFT && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedNFT.imageUrl} 
                    alt={selectedNFT.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-green-800">{selectedNFT.name}</h3>
                    <p className="text-sm text-gray-600">{selectedNFT.commonName}</p>
                    <Badge className={`${getRarityColor(selectedNFT.metadata.rarity)} border-0 mt-1`}>
                      {selectedNFT.metadata.rarity}
                    </Badge>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Price</span>
                    <span className="text-lg font-bold text-green-600">
                      {formatPrice(selectedNFT.marketData?.currentPrice || 0, 'ETH')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Platform Fee</span>
                    <span className="text-sm font-medium text-gray-800">
                      {formatPrice((selectedNFT.marketData?.currentPrice || 0) * 0.1, 'ETH')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="font-medium text-gray-800">Total</span>
                    <span className="font-bold text-green-600">
                      {formatPrice((selectedNFT.marketData?.currentPrice || 0) * 1.1, 'ETH')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Wallet Address</label>
                  <Input
                    placeholder="0x..."
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Enter your wallet address where the NFT will be sent
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPurchaseDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handlePurchase} 
                disabled={purchaseLoading || !walletAddress}
                className="bg-green-600 hover:bg-green-700"
              >
                {purchaseLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4 mr-2" />
                    Purchase
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default NFTMarketplace;