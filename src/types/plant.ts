export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  price: number;
  category: string;
  image: string;
  careLevel: 'easy' | 'moderate' | 'difficult';
  sunlight: 'low' | 'medium' | 'high';
  waterNeeds: 'low' | 'medium' | 'high';
  height: string;
  spread: string;
  growthRate: 'slow' | 'moderate' | 'fast';
  benefits: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface PlantCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}