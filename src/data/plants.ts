import { Plant, PlantCategory } from '@/types/plant';

export const plantCategories: PlantCategory[] = [
  {
    id: 'indoor',
    name: 'Indoor Plants',
    description: 'Perfect for homes and offices',
    icon: '🏠'
  },
  {
    id: 'outdoor',
    name: 'Outdoor Plants',
    description: 'Great for gardens and patios',
    icon: '🌳'
  },
  {
    id: 'herbs',
    name: 'Herbs & Edibles',
    description: 'Grow your own food',
    icon: '🌿'
  },
  {
    id: 'succulents',
    name: 'Succulents & Cacti',
    description: 'Low maintenance beauties',
    icon: '🌵'
  },
  {
    id: 'flowering',
    name: 'Flowering Plants',
    description: 'Add color to your space',
    icon: '🌸'
  },
  {
    id: 'air-purifying',
    name: 'Air Purifying',
    description: 'Improve your indoor air',
    icon: '💨'
  }
];

export const plants: Plant[] = [
  {
    id: '1',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    description: 'Low maintenance air purifying plant perfect for beginners.',
    price: 25.99,
    category: 'indoor',
    image: '/placeholder.svg',
    careLevel: 'easy',
    sunlight: 'low',
    waterNeeds: 'low',
    height: '2-3 ft',
    spread: '1-2 ft',
    growthRate: 'slow',
    benefits: ['Air purifying', 'Low maintenance', 'Pet friendly'],
    inStock: true,
    rating: 4.5,
    reviewCount: 128
  },
  {
    id: '2',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    description: 'Tropical beauty with distinctive split leaves.',
    price: 45.99,
    category: 'indoor',
    image: '/placeholder.svg',
    careLevel: 'moderate',
    sunlight: 'medium',
    waterNeeds: 'medium',
    height: '6-8 ft',
    spread: '3-4 ft',
    growthRate: 'moderate',
    benefits: ['Statement piece', 'Air purifying', 'Easy propagation'],
    inStock: true,
    rating: 4.7,
    reviewCount: 256
  },
  {
    id: '3',
    name: 'Rosemary',
    scientificName: 'Rosmarinus officinalis',
    description: 'Aromatic herb perfect for cooking and landscaping.',
    price: 12.99,
    category: 'herbs',
    image: '/placeholder.svg',
    careLevel: 'easy',
    sunlight: 'high',
    waterNeeds: 'low',
    height: '2-4 ft',
    spread: '2-3 ft',
    growthRate: 'moderate',
    benefits: ['Culinary uses', 'Medicinal properties', 'Drought tolerant'],
    inStock: true,
    rating: 4.3,
    reviewCount: 89
  },
  {
    id: '4',
    name: 'Jade Plant',
    scientificName: 'Crassula ovata',
    description: 'Easy-care succulent with coin-shaped leaves.',
    price: 18.99,
    category: 'succulents',
    image: '/placeholder.svg',
    careLevel: 'easy',
    sunlight: 'high',
    waterNeeds: 'low',
    height: '2-3 ft',
    spread: '1-2 ft',
    growthRate: 'slow',
    benefits: ['Low maintenance', 'Long-lived', 'Good luck symbol'],
    inStock: true,
    rating: 4.4,
    reviewCount: 167
  },
  {
    id: '5',
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum wallisii',
    description: 'Beautiful flowering plant that thrives in low light.',
    price: 32.99,
    category: 'indoor',
    image: '/placeholder.svg',
    careLevel: 'easy',
    sunlight: 'low',
    waterNeeds: 'medium',
    height: '1-3 ft',
    spread: '1-2 ft',
    growthRate: 'moderate',
    benefits: ['Air purifying', 'Flowers indoors', 'Low light tolerant'],
    inStock: true,
    rating: 4.6,
    reviewCount: 203
  },
  {
    id: '6',
    name: 'Lavender',
    scientificName: 'Lavandula angustifolia',
    description: 'Aromatic purple flowers perfect for gardens.',
    price: 15.99,
    category: 'outdoor',
    image: '/placeholder.svg',
    careLevel: 'easy',
    sunlight: 'high',
    waterNeeds: 'low',
    height: '1-2 ft',
    spread: '1-2 ft',
    growthRate: 'moderate',
    benefits: ['Aromatic', 'Attracts pollinators', 'Medicinal uses'],
    inStock: true,
    rating: 4.8,
    reviewCount: 145
  },
  {
    id: '7',
    name: 'ZZ Plant',
    scientificName: 'Zamioculcas zamiifolia',
    description: 'Extremely drought-tolerant with glossy leaves.',
    price: 28.99,
    category: 'indoor',
    image: '/placeholder.svg',
    careLevel: 'easy',
    sunlight: 'low',
    waterNeeds: 'low',
    height: '2-3 ft',
    spread: '2-3 ft',
    growthRate: 'slow',
    benefits: ['Drought tolerant', 'Low maintenance', 'Air purifying'],
    inStock: true,
    rating: 4.5,
    reviewCount: 98
  },
  {
    id: '8',
    name: 'Basil',
    scientificName: 'Ocimum basilicum',
    description: 'Popular culinary herb with fresh, sweet flavor.',
    price: 10.99,
    category: 'herbs',
    image: '/placeholder.svg',
    careLevel: 'easy',
    sunlight: 'high',
    waterNeeds: 'medium',
    height: '1-2 ft',
    spread: '1-2 ft',
    growthRate: 'fast',
    benefits: ['Culinary staple', 'Easy to grow', 'Attracts bees'],
    inStock: true,
    rating: 4.2,
    reviewCount: 76
  },
  {
    id: '9',
    name: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    description: 'Fast-growing plant with spider-like plantlets.',
    price: 16.99,
    category: 'indoor',
    image: '/placeholder.svg',
    careLevel: 'easy',
    sunlight: 'medium',
    waterNeeds: 'medium',
    height: '1-2 ft',
    spread: '1-2 ft',
    growthRate: 'fast',
    benefits: ['Air purifying', 'Easy propagation', 'Pet friendly'],
    inStock: true,
    rating: 4.4,
    reviewCount: 189
  },
  {
    id: '10',
    name: 'Echeveria',
    scientificName: 'Echeveria elegans',
    description: 'Beautiful rosette-forming succulent.',
    price: 14.99,
    category: 'succulents',
    image: '/placeholder.svg',
    careLevel: 'easy',
    sunlight: 'high',
    waterNeeds: 'low',
    height: '3-6 in',
    spread: '3-6 in',
    growthRate: 'slow',
    benefits: ['Low maintenance', 'Beautiful rosettes', 'Easy propagation'],
    inStock: false,
    rating: 4.6,
    reviewCount: 92
  },
  {
    id: '11',
    name: 'Orchid',
    scientificName: 'Phalaenopsis spp.',
    description: 'Elegant flowering plant with long-lasting blooms.',
    price: 35.99,
    category: 'flowering',
    image: '/placeholder.svg',
    careLevel: 'moderate',
    sunlight: 'medium',
    waterNeeds: 'low',
    height: '1-2 ft',
    spread: '1-2 ft',
    growthRate: 'slow',
    benefits: ['Long-lasting flowers', 'Elegant appearance', 'Gift-worthy'],
    inStock: true,
    rating: 4.7,
    reviewCount: 234
  },
  {
    id: '12',
    name: 'Pothos',
    scientificName: 'Epipremnum aureum',
    description: 'Trailing vine with heart-shaped leaves.',
    price: 19.99,
    category: 'indoor',
    image: '/placeholder.svg',
    careLevel: 'easy',
    sunlight: 'low',
    waterNeeds: 'medium',
    height: '6-8 ft',
    spread: '3-4 ft',
    growthRate: 'fast',
    benefits: ['Air purifying', 'Easy care', 'Versatile placement'],
    inStock: true,
    rating: 4.5,
    reviewCount: 278
  }
];

export const getPlantsByCategory = (categoryId: string): Plant[] => {
  return plants.filter(plant => plant.category === categoryId);
};

export const getFeaturedPlants = (): Plant[] => {
  return plants.filter(plant => plant.inStock && plant.rating >= 4.5).slice(0, 6);
};

export const searchPlants = (query: string): Plant[] => {
  const lowercaseQuery = query.toLowerCase();
  return plants.filter(plant => 
    plant.name.toLowerCase().includes(lowercaseQuery) ||
    plant.scientificName.toLowerCase().includes(lowercaseQuery) ||
    plant.description.toLowerCase().includes(lowercaseQuery) ||
    plant.category.toLowerCase().includes(lowercaseQuery)
  );
};