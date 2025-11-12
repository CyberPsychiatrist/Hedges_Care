import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';

const CartSidebar: React.FC = () => {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="text-center py-8">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-4">
            Add some beautiful plants to get started!
          </p>
          <Link to="/plant-store">
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              Browse Plants
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
          <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {itemCount} items
          </span>
        </div>
        <div className="text-2xl font-bold text-emerald-600">
          Ksh{total.toFixed(2)}
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.plant.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              {/* Plant Image */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">
                    {item.plant.category === 'succulents' ? '🌵' : 
                     item.plant.category === 'herbs' ? '🌿' :
                     item.plant.category === 'flowering' ? '🌸' :
                     item.plant.category === 'outdoor' ? '🌳' : '🪴'}
                  </span>
                </div>
              </div>

              {/* Plant Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {item.plant.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {item.plant.scientificName}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-emerald-600">
                    Ksh{(item.plant.price * item.quantity).toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => updateQuantity(item.plant.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => updateQuantity(item.plant.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                onClick={() => removeItem(item.plant.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-gray-200 space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={clearCart}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Cart
        </Button>
        <Link to="/plant-store" className="block">
          <Button variant="outline" className="w-full justify-start">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSidebar;