import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../types';
import { getAllMedicines } from '../services/medicineService';

const INITIAL_CART_KEY = 'mediflow_cart_items';

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Partial<CartItem>) => void;
  removeItem: (medicineId: string) => void;
  updateQuantity: (medicineId: string, delta: number) => void;
  clearCart: () => void;
  totalAmount: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(INITIAL_CART_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback initial mock cart items
    }
    const medicines = getAllMedicines();
    return medicines.slice(0, 3).map((m) => ({
      medicineId: m._id,
      medicineName: m.Title,
      vendorName: m.PharmacyName || m.City || 'Ethiopian Supplier',
      unitPrice: parseInt((m.Price || '500 ETB').replace(/[^0-9]/g, '')) || 500,
      quantity: 2,
      unit: m.Unit || 'Strip',
      imageUrl: m.ImageUrl,
      isColdChain: m.isColdChain || m.Title.toLowerCase().includes('insulin') || m.Title.toLowerCase().includes('vaccine'),
    }));
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(INITIAL_CART_KEY, JSON.stringify(cart));
    localStorage.setItem('mediflow_cart_count', cart.reduce((s, i) => s + i.quantity, 0).toString());
  }, [cart]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (item: Partial<CartItem>) => {
    if (!item.medicineId) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.medicineId === item.medicineId);
      if (existing) {
        return prev.map((i) =>
          i.medicineId === item.medicineId ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        );
      }
      const newItem: CartItem = {
        medicineId: item.medicineId,
        medicineName: item.medicineName || 'Essential Medicine',
        vendorName: item.vendorName || 'Ethiopian Medical Supplier',
        unitPrice: item.unitPrice || 500,
        quantity: item.quantity || 1,
        unit: item.unit || 'Pack',
        imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200',
        isColdChain: item.isColdChain,
      };
      return [...prev, newItem];
    });
    setIsOpen(true);
  };

  const removeItem = (medicineId: string) => {
    setCart((prev) => prev.filter((i) => i.medicineId !== medicineId));
  };

  const updateQuantity = (medicineId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.medicineId === medicineId ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalAmount,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
