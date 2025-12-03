import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  course_id: string;
  course_title: string;
  course_slug: string;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (course: { id: string; title: string; slug: string; price: number }) => Promise<void>;
  removeFromCart: (courseId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  isInCart: (courseId: string) => boolean;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setItems([]);
    }
  }, [user]);

  const fetchCartItems = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (course: { id: string; title: string; slug: string; price: number }) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to cart",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          course_id: course.id,
          course_title: course.title,
          course_slug: course.slug,
          price: course.price,
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already in Cart",
            description: "This course is already in your cart",
          });
          return;
        }
        throw error;
      }

      await fetchCartItems();
      toast({
        title: "Added to Cart",
        description: `${course.title} has been added to your cart`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add course to cart",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (courseId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('course_id', courseId);

      if (error) throw error;

      await fetchCartItems();
      toast({
        title: "Removed from Cart",
        description: "Course removed from your cart",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const isInCart = (courseId: string) => {
    return items.some(item => item.course_id === courseId);
  };

  const totalItems = items.length;
  const subtotal = items.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <CartContext.Provider value={{
      items,
      loading,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
      totalItems,
      subtotal,
    }}>
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
