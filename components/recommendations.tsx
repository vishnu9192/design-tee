'use client';

import React, { useEffect, useState } from 'react';
import { Product, recommendationEngine } from '@/lib/recommendation-engine';
import { useAuth } from '@/contexts/auth-context';
import { useTracking } from '@/contexts/tracking-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';

interface RecommendationSectionProps {
  title: string;
  category?: 'tshirt' | 'shirt';
  productId?: string; // For similar products
  type: 'personalized' | 'trending' | 'similar';
  limit?: number;
}

export function RecommendationSection({ 
  title, 
  category, 
  productId, 
  type, 
  limit = 5 
}: RecommendationSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { trackView, trackLike, trackAddToCart } = useTracking();

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setLoading(true);
        let recommendations: Product[] = [];

        switch (type) {
          case 'personalized':
            if (user && category) {
              recommendations = recommendationEngine.getRecommendationsByCategory(user.id, category, limit);
            } else if (user) {
              recommendations = recommendationEngine.getHybridRecommendations(user.id, limit);
            } else {
              recommendations = recommendationEngine.getTrendingProducts(category, limit);
            }
            break;
          
          case 'trending':
            recommendations = recommendationEngine.getTrendingProducts(category, limit);
            break;
          
          case 'similar':
            if (productId) {
              recommendations = recommendationEngine.getSimilarProducts(productId, limit);
            }
            break;
        }

        setProducts(recommendations);
      } catch (error) {
        console.error('Failed to load recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [user, category, productId, type, limit]);

  const handleProductClick = (product: Product) => {
    trackView(product.id);
  };

  const handleLike = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    trackLike(product.id);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    trackAddToCart(product.id);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: limit }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="group cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleProductClick(product)}
          >
            <CardContent className="p-4">
              <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 right-2 space-y-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                    onClick={(e) => handleLike(product, e)}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm leading-tight line-clamp-2">
                  {product.name}
                </h4>
                
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">${product.price}</span>
                  <Badge variant="secondary" className="text-xs">
                    {product.category === 'tshirt' ? 'T-Shirt' : 'Shirt'}
                  </Badge>
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

interface PersonalizedRecommendationsProps {
  category?: 'tshirt' | 'shirt';
  limit?: number;
}

export function PersonalizedRecommendations({ category, limit = 5 }: PersonalizedRecommendationsProps) {
  const { user } = useAuth();
  const title = user 
    ? `Recommended for You${category ? ` - ${category === 'tshirt' ? 'T-Shirts' : 'Shirts'}` : ''}`
    : `Popular ${category === 'tshirt' ? 'T-Shirts' : category === 'shirt' ? 'Shirts' : 'Products'}`;

  return (
    <RecommendationSection
      title={title}
      category={category}
      type="personalized"
      limit={limit}
    />
  );
}

interface TrendingProductsProps {
  category?: 'tshirt' | 'shirt';
  limit?: number;
}

export function TrendingProducts({ category, limit = 5 }: TrendingProductsProps) {
  const title = `Trending ${category === 'tshirt' ? 'T-Shirts' : category === 'shirt' ? 'Shirts' : 'Products'}`;

  return (
    <RecommendationSection
      title={title}
      category={category}
      type="trending"
      limit={limit}
    />
  );
}

interface SimilarProductsProps {
  productId: string;
  limit?: number;
}

export function SimilarProducts({ productId, limit = 4 }: SimilarProductsProps) {
  return (
    <RecommendationSection
      title="You might also like"
      productId={productId}
      type="similar"
      limit={limit}
    />
  );
}