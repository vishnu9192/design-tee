'use client';

import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { useAuth } from './auth-context';
import { recommendationEngine, UserInteraction } from '@/lib/recommendation-engine';

interface TrackingContextType {
  trackView: (productId: string, duration?: number) => void;
  trackLike: (productId: string) => void;
  trackPurchase: (productId: string, rating?: number) => void;
  trackAddToCart: (productId: string) => void;
  trackAddToWishlist: (productId: string) => void;
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const recordInteraction = useCallback((
    productId: string,
    action: UserInteraction['action'],
    duration?: number,
    rating?: number
  ) => {
    if (!user) return;

    const interaction: UserInteraction = {
      userId: user.id,
      productId,
      action,
      timestamp: Date.now(),
      duration,
      rating
    };

    recommendationEngine.recordInteraction(interaction);
    
    // Store in localStorage for persistence
    const stored = localStorage.getItem('user_interactions') || '[]';
    const interactions = JSON.parse(stored);
    interactions.push(interaction);
    localStorage.setItem('user_interactions', JSON.stringify(interactions.slice(-1000))); // Keep last 1000
  }, [user]);

  const trackView = useCallback((productId: string, duration?: number) => {
    recordInteraction(productId, 'view', duration);
  }, [recordInteraction]);

  const trackLike = useCallback((productId: string) => {
    recordInteraction(productId, 'like');
  }, [recordInteraction]);

  const trackPurchase = useCallback((productId: string, rating?: number) => {
    recordInteraction(productId, 'purchase', undefined, rating);
  }, [recordInteraction]);

  const trackAddToCart = useCallback((productId: string) => {
    recordInteraction(productId, 'cart');
  }, [recordInteraction]);

  const trackAddToWishlist = useCallback((productId: string) => {
    recordInteraction(productId, 'wishlist');
  }, [recordInteraction]);

  // Load stored interactions on mount
  useEffect(() => {
    if (!user) return;

    const stored = localStorage.getItem('user_interactions');
    if (stored) {
      try {
        const interactions = JSON.parse(stored);
        interactions.forEach((interaction: UserInteraction) => {
          if (interaction.userId === user.id) {
            recommendationEngine.recordInteraction(interaction);
          }
        });
      } catch (error) {
        console.error('Failed to load stored interactions:', error);
      }
    }
  }, [user]);

  const value = {
    trackView,
    trackLike,
    trackPurchase,
    trackAddToCart,
    trackAddToWishlist
  };

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  );
}

export function useTracking() {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
}