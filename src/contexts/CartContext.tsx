import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Plant, CartItem, Cart } from '@/types/plant';

interface CartState extends Cart {
  addItem: (plant: Plant, quantity?: number) => void;
  removeItem: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (plantId: string) => boolean;
  getQuantity: (plantId: string) => number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { plant: Plant; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { plantId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  isInCart: () => false,
  getQuantity: () => 0,
};

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { plant, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.plant.id === plant.id);
      
      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { plant, quantity, addedAt: new Date() }];
      }
      
      const total = newItems.reduce((sum, item) => sum + item.plant.price * item.quantity, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: newItems, total, itemCount };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.plant.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + item.plant.price * item.quantity, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: newItems, total, itemCount };
    }
    
    case 'UPDATE_QUANTITY': {
      const { plantId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: plantId });
      }
      
      const newItems = state.items.map(item =>
        item.plant.id === plantId
          ? { ...item, quantity }
          : item
      );
      
      const total = newItems.reduce((sum, item) => sum + item.plant.price * item.quantity, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: newItems, total, itemCount };
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };
    
    default:
      return state;
  }
};

const CartContext = createContext<CartState>(initialState);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (plant: Plant, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { plant, quantity } });
  };

  const removeItem = (plantId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: plantId });
  };

  const updateQuantity = (plantId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { plantId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (plantId: string): boolean => {
    return state.items.some(item => item.plant.id === plantId);
  };

  const getQuantity = (plantId: string): number => {
    const item = state.items.find(item => item.plant.id === plantId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
      getQuantity,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartState => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};