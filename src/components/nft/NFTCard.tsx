import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlantNFT } from "@/types/nft";
import { 
  Leaf, 
  TreePine, 
  Droplets, 
  Zap, 
  TrendingUp, 
  Eye,
  ShoppingCart,
  Wallet,
  Calendar,
  MapPin,
  Thermometer,
  Cloud,
  Mountain,
  Star
} from "lucide-react";

interface NFTCardProps {
  nft: PlantNFT;
  onBuy?: (nftId: string) => void;
  onList?: (nftId: string, price: number) => void;
  onView?: (nftId: string) => void;
  showActions?: boolean;
  currentOwner?: boolean;
}

const NFTCard = ({ 
  nft, 
  onBuy, 
  onList, 
  onView, 
  showActions = false,
  currentOwner = false 
}: NFTCardProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-purple-500 text-white';
      case 'epic': return 'bg-purple-600 text-white';
      case 'rare': return 'bg-blue-500 text-white';
      case 'uncommon': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Star className="h-4 w-4" />;
      case 'epic': return <Zap className="h-4 w-4" />;
      case 'rare': return <TrendingUp className="h-4 w-4" />;
      case 'uncommon': return <Leaf className="h-4 w-4" />;
      default: return <TreePine className="h-4 w-4" />;
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return `${price.toFixed(3)} ${currency}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={nft.imageUrl} 
            alt={nft.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 right-2">
            <Badge className={`${getRarityColor(nft.metadata.rarity)} border-0`}>
              <div className="flex items-center gap-1">
                {getRarityIcon(nft.metadata.rarity)}
                <span className="capitalize">{nft.metadata.rarity}</span>
              </div>
            </Badge>
          </div>
          {nft.marketData?.listedForSale && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-green-500 text-white border-0">
                <ShoppingCart className="h-3 w-3 mr-1" />
                For Sale
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <CardTitle className="text-lg font-bold text-green-800 line-clamp-1">
            {nft.name}
          </CardTitle>
          <p className="text-sm text-gray-600 italic line-clamp-1">
            {nft.commonName}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <TreePine className="h-3 w-3" />
          <span className="capitalize">{nft.plantType}</span>
          <span className="text-gray-300">•</span>
          <Calendar className="h-3 w-3" />
          <span>{formatDate(nft.metadata.scanDate)}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Leaf className="h-3 w-3 text-green-500" />
              <span>CO₂/Year</span>
            </div>
            <span className="text-sm font-medium text-green-600">
              {nft.environmentalImpact.co2AbsorbedAnnual.toFixed(1)} kg
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <MapPin className="h-3 w-3 text-blue-500" />
              <span>Location</span>
            </div>
            <span className="text-sm text-gray-600">
              {nft.environmentalImpact.location}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Thermometer className="h-3 w-3 text-red-500" />
              <span>Health</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${nft.metadata.healthScore * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">
                {(nft.metadata.healthScore * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {nft.marketData?.currentPrice && (
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Price</span>
              <span className="text-lg font-bold text-green-600">
                {formatPrice(nft.marketData.currentPrice, nft.marketData.currency)}
              </span>
            </div>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 pt-2">
            {onView && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onView(nft.id)}
                className="flex-1"
              >
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
            )}
            
            {nft.marketData?.listedForSale && onBuy && !currentOwner && (
              <Button 
                size="sm" 
                onClick={() => onBuy(nft.id)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Buy
              </Button>
            )}
            
            {!nft.marketData?.listedForSale && currentOwner && onList && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onList(nft.id, 0.1)}
                className="flex-1"
              >
                <Wallet className="h-3 w-3 mr-1" />
                List
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NFTCard;