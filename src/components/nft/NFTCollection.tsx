import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PlantNFT, NFTCollection } from "@/types/nft";
import { nftService } from "@/services/nftService";
import NFTCard from "./NFTCard";
import { 
  Grid, 
  List, 
  Search, 
  Filter, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Leaf,
  TreePine,
  Zap
} from "lucide-react";

interface NFTCollectionProps {
  collectionId?: string;
  showControls?: boolean;
  showActions?: boolean;
}

const NFTCollection: React.FC<NFTCollectionProps> = ({ 
  collectionId, 
  showControls = true,
  showActions = false 
}) => {
  const [nfts, setNfts] = useState<PlantNFT[]>([]);
  const [collection, setCollection] = useState<NFTCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'date' | 'rarity'>('date');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const nftsPerPage = 12;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (collectionId) {
          const collectionData = await nftService.getCollectionById(collectionId);
          setCollection(collectionData);
        }
        
        const allNFTs = await nftService.getAllNFTs();
        setNfts(allNFTs);
      } catch (error) {
        console.error('Error loading NFT collection:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    nftService.initialize();
  }, [collectionId]);

  // Filter and sort NFTs
  const filteredNFTs = nfts
    .filter(nft => {
      const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          nft.speciesName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          nft.commonName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRarity = filterRarity === 'all' || nft.metadata.rarity === filterRarity;
      const matchesType = filterType === 'all' || nft.plantType === filterType;
      
      return matchesSearch && matchesRarity && matchesType;
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

  // Pagination
  const totalPages = Math.ceil(filteredNFTs.length / nftsPerPage);
  const paginatedNFTs = filteredNFTs.slice(
    (currentPage - 1) * nftsPerPage,
    currentPage * nftsPerPage
  );

  const handleBuyNFT = (nftId: string) => {
    // Placeholder for buy functionality
    console.log('Buy NFT:', nftId);
  };

  const handleListNFT = (nftId: string, price: number) => {
    // Placeholder for list functionality
    console.log('List NFT:', nftId, price);
  };

  const handleViewNFT = (nftId: string) => {
    // Placeholder for view functionality
    console.log('View NFT:', nftId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Collection Header */}
      {collection && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-green-800">
                  {collection.name}
                </CardTitle>
                <p className="text-gray-600 mt-1">{collection.description}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{collection.mintedCount}</p>
                    <p className="text-sm text-gray-500">Minted</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-blue-600">
                      {collection.floorPrice.toFixed(3)} ETH
                    </p>
                    <p className="text-sm text-gray-500">Floor Price</p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Controls */}
      {showControls && (
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search NFTs..."
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

            {/* Results Info */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {paginatedNFTs.length} of {filteredNFTs.length} NFTs
            </div>
          </CardContent>
        </Card>
      )}

      {/* NFT Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
        {paginatedNFTs.map((nft) => (
          <NFTCard
            key={nft.id}
            nft={nft}
            onBuy={handleBuyNFT}
            onList={handleListNFT}
            onView={handleViewNFT}
            showActions={showActions}
            currentOwner={nft.ownership.ownerAddress === '0x742d35Cc6634C0532925a3b844Bc9e7595f845e0'}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredNFTs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Leaf className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No NFTs found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            );
          })}
          
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default NFTCollection;