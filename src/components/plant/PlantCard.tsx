import React from 'react';
import { Plant } from '@/types/plant';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Star, Plus, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlantCardProps {
  plant: Plant;
  className?: string;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, className = '' }) => {
  const { addItem, isInCart, getQuantity } = useCart();
  const cartQuantity = getQuantity(plant.id);

  const handleAddToCart = () => {
    addItem(plant, 1);
  };

  const careLevelColors = {
    easy: 'bg-green-100 text-green-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    difficult: 'bg-red-100 text-red-800'
  };

  const sunlightColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-yellow-100 text-yellow-800'
  };

  const waterColors = {
    low: 'bg-purple-100 text-purple-800',
    medium: 'bg-cyan-100 text-cyan-800',
    high: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
      {/* Plant Image */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-6xl opacity-50">
          {plant.category === 'succulents' ? '🌵' : 
           plant.category === 'herbs' ? '🌿' :
           plant.category === 'flowering' ? '🌸' :
           plant.category === 'outdoor' ? '🌳' : '🪴'}
        </div>
        {!plant.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
          <div className="flex items-center text-xs font-medium">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span className="ml-1">{plant.rating}</span>
          </div>
        </div>
      </div>

      {/* Plant Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 truncate">
              {plant.name}
            </h3>
            <p className="text-sm text-gray-600 italic">
              {plant.scientificName}
            </p>
          </div>
          <div className="text-lg font-bold text-emerald-600 ml-2">
            Ksh{plant.price.toFixed(2)}
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {plant.description}
        </p>

        {/* Care Indicators */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${careLevelColors[plant.careLevel]}`}>
            {plant.careLevel}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${sunlightColors[plant.sunlight]}`}>
            ☀️ {plant.sunlight}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${waterColors[plant.waterNeeds]}`}>
            💧 {plant.waterNeeds}
          </span>
        </div>

        {/* Benefits */}
        <div className="mb-4">
          <p className="text-xs text-gray-600 mb-1">Benefits:</p>
          <div className="flex flex-wrap gap-1">
            {plant.benefits.slice(0, 2).map((benefit, index) => (
              <span key={index} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs">
                {benefit}
              </span>
            ))}
            {plant.benefits.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{plant.benefits.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            disabled={!plant.inStock}
            className={`flex-1 ${isInCart(plant.id) ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-500 hover:bg-emerald-600'} text-white transition-colors duration-200`}
            size="sm"
          >
            {isInCart(plant.id) ? (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                View Cart ({cartQuantity})
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Add to Cart
              </>
            )}
          </Button>
          {isInCart(plant.id) && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-emerald-600 border-emerald-300 hover:bg-emerald-50"
            >
              <Link to="/cart">View</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantCard;