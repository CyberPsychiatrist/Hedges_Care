import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plant, PlantCategory } from '@/types/plant';
import { plants, plantCategories } from '@/data/plants';
import PlantCard from './PlantCard';
import PlantFilters from './PlantFilters';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Filter, ArrowLeft } from 'lucide-react';

const PlantStore: React.FC = () => {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [careLevel, setCareLevel] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Filter and sort plants
  const filteredAndSortedPlants = useMemo(() => {
    let filtered = plants.filter(plant => {
      // Category filter
      if (selectedCategory && plant.category !== selectedCategory) return false;
      
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          plant.name.toLowerCase().includes(searchLower) ||
          plant.scientificName.toLowerCase().includes(searchLower) ||
          plant.description.toLowerCase().includes(searchLower) ||
          plant.benefits.some(benefit => benefit.toLowerCase().includes(searchLower))
        );
      }
      
      // Care level filter
      if (careLevel && plant.careLevel !== careLevel) return false;
      
      // Price range filter
      if (plant.price < priceRange.min || plant.price > priceRange.max) return false;
      
      return true;
    });

    // Sort plants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

    return filtered;
  }, [plants, selectedCategory, searchTerm, careLevel, sortBy, priceRange]);

  const categoriesWithAll = [
    { id: '', name: 'All Plants', icon: '🌿', description: 'All available plants' },
    ...plantCategories
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Button */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-emerald-50"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-emerald-600">🌿</span>
                Plant Store
              </h1>
              <p className="text-gray-600 mt-1">
                Discover and purchase beautiful plants for your home or garden
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-emerald-600" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600">
                {filteredAndSortedPlants.length} plants found
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <PlantFilters
              categories={categoriesWithAll}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              careLevel={careLevel}
              onCareLevelChange={setCareLevel}
              sortBy={sortBy}
              onSortChange={setSortBy}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Category Header */}
            {selectedCategory && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {plantCategories.find(cat => cat.id === selectedCategory)?.name || 'All Plants'}
                </h2>
                <p className="text-gray-600">
                  {plantCategories.find(cat => cat.id === selectedCategory)?.description || 'Browse our entire collection'}
                </p>
              </div>
            )}

            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredAndSortedPlants.length} of {plants.length} plants
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedPlants.length > 0 ? (
                filteredAndSortedPlants.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">🌱</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No plants found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setSearchTerm('');
                      setCareLevel('');
                      setPriceRange({ min: 0, max: 1000 });
                    }}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantStore;