export interface Product {
  id: string;
  name: string;
  category: 'tshirt' | 'shirt';
  price: number;
  color: string;
  size: string[];
  brand: string;
  style: string;
  image: string;
  tags: string[];
  rating: number;
  salesCount: number;
}

export interface UserInteraction {
  userId: string;
  productId: string;
  action: 'view' | 'like' | 'purchase' | 'cart' | 'wishlist';
  timestamp: number;
  duration?: number; // For view actions
  rating?: number; // For purchase actions
}

export interface UserPreferences {
  userId: string;
  favoriteColors: string[];
  preferredSizes: string[];
  favoriteBrands: string[];
  preferredStyles: string[];
  priceRange: { min: number; max: number };
  categoryPreference: { tshirt: number; shirt: number };
}

export class RecommendationEngine {
  private interactions: UserInteraction[] = [];
  private products: Product[] = [];
  private userPreferences: Map<string, UserPreferences> = new Map();

  constructor() {
    // Products will be loaded from database via API calls
    // No mock data in production
  }

  // Record user interaction
  recordInteraction(interaction: UserInteraction) {
    this.interactions.push(interaction);
    this.updateUserPreferences(interaction);
  }

  // Update user preferences based on interactions
  private updateUserPreferences(interaction: UserInteraction) {
    const product = this.products.find(p => p.id === interaction.productId);
    if (!product) return;

    let preferences = this.userPreferences.get(interaction.userId);
    if (!preferences) {
      preferences = {
        userId: interaction.userId,
        favoriteColors: [],
        preferredSizes: [],
        favoriteBrands: [],
        preferredStyles: [],
        priceRange: { min: 0, max: 1000 },
        categoryPreference: { tshirt: 0, shirt: 0 }
      };
    }

    // Update preferences based on interaction type
    const weight = this.getInteractionWeight(interaction.action);
    
    this.updateArrayPreference(preferences.favoriteColors, product.color);
    this.updateArrayPreference(preferences.favoriteBrands, product.brand);
    this.updateArrayPreference(preferences.preferredStyles, product.style);
    
    // Update category preference
    preferences.categoryPreference[product.category] += weight;

    this.userPreferences.set(interaction.userId, preferences);
  }

  private getInteractionWeight(action: string): number {
    const weights = {
      'view': 1,
      'like': 3,
      'cart': 5,
      'wishlist': 4,
      'purchase': 10
    };
    return weights[action as keyof typeof weights] || 1;
  }

  private updateArrayPreference(arr: string[], value: string) {
    const existing = arr.find(item => item === value);
    if (!existing) {
      arr.push(value);
    }
    // In a real implementation, you'd track frequencies/weights
  }

  // Content-based filtering
  getContentBasedRecommendations(userId: string, limit: number = 5): Product[] {
    const preferences = this.userPreferences.get(userId);
    if (!preferences) return this.getFallbackRecommendations(limit);

    const scores = this.products.map(product => ({
      product,
      score: this.calculateContentScore(product, preferences)
    }));

    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product);
  }

  private calculateContentScore(product: Product, preferences: UserPreferences): number {
    let score = 0;

    // Color preference
    if (preferences.favoriteColors.includes(product.color)) score += 3;
    
    // Brand preference
    if (preferences.favoriteBrands.includes(product.brand)) score += 2;
    
    // Style preference
    if (preferences.preferredStyles.includes(product.style)) score += 2;
    
    // Category preference
    score += preferences.categoryPreference[product.category] * 0.1;
    
    // Rating weight
    score += product.rating * 0.5;
    
    // Popularity weight
    score += Math.log(product.salesCount + 1) * 0.2;

    return score;
  }

  // Collaborative filtering (simplified)
  getCollaborativeRecommendations(userId: string, limit: number = 5): Product[] {
    const userInteractions = this.interactions.filter(i => i.userId === userId);
    const userProductIds = new Set(userInteractions.map(i => i.productId));

    // Find similar users
    const otherUsers = new Set(this.interactions.map(i => i.userId));
    otherUsers.delete(userId);

    const similarities = Array.from(otherUsers).map(otherUserId => ({
      userId: otherUserId,
      similarity: this.calculateUserSimilarity(userId, otherUserId)
    }));

    const topSimilarUsers = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10);

    // Get recommendations from similar users
    const recommendations = new Map<string, number>();

    topSimilarUsers.forEach(({ userId: similarUserId, similarity }) => {
      const similarUserInteractions = this.interactions.filter(
        i => i.userId === similarUserId && !userProductIds.has(i.productId)
      );

      similarUserInteractions.forEach(interaction => {
        const weight = this.getInteractionWeight(interaction.action) * similarity;
        const currentScore = recommendations.get(interaction.productId) || 0;
        recommendations.set(interaction.productId, currentScore + weight);
      });
    });

    const topProductIds = Array.from(recommendations.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([productId]) => productId);

    return topProductIds
      .map(id => this.products.find(p => p.id === id))
      .filter(Boolean) as Product[];
  }

  private calculateUserSimilarity(userId1: string, userId2: string): number {
    const user1Interactions = this.interactions.filter(i => i.userId === userId1);
    const user2Interactions = this.interactions.filter(i => i.userId === userId2);

    const user1Products = new Set(user1Interactions.map(i => i.productId));
    const user2Products = new Set(user2Interactions.map(i => i.productId));

    const intersection = new Set([...user1Products].filter(x => user2Products.has(x)));
    const union = new Set([...user1Products, ...user2Products]);

    if (union.size === 0) return 0;
    return intersection.size / union.size; // Jaccard similarity
  }

  // Hybrid recommendations combining content and collaborative
  getHybridRecommendations(userId: string, limit: number = 10): Product[] {
    const contentRecs = this.getContentBasedRecommendations(userId, limit);
    const collaborativeRecs = this.getCollaborativeRecommendations(userId, limit);

    const combined = new Map<string, { product: Product; score: number }>();

    // Weight content-based recommendations
    contentRecs.forEach((product, index) => {
      const score = (limit - index) * 0.6; // Content weight: 60%
      combined.set(product.id, { product, score });
    });

    // Add collaborative recommendations
    collaborativeRecs.forEach((product, index) => {
      const score = (limit - index) * 0.4; // Collaborative weight: 40%
      const existing = combined.get(product.id);
      if (existing) {
        existing.score += score;
      } else {
        combined.set(product.id, { product, score });
      }
    });

    return Array.from(combined.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product);
  }

  // Fallback recommendations for new users
  private getFallbackRecommendations(limit: number): Product[] {
    return this.products
      .sort((a, b) => (b.rating * b.salesCount) - (a.rating * a.salesCount))
      .slice(0, limit);
  }

  // Get recommendations by category
  getRecommendationsByCategory(userId: string, category: 'tshirt' | 'shirt', limit: number = 5): Product[] {
    const allRecommendations = this.getHybridRecommendations(userId, limit * 2);
    return allRecommendations
      .filter(product => product.category === category)
      .slice(0, limit);
  }

  // Get trending products
  getTrendingProducts(category?: 'tshirt' | 'shirt', limit: number = 5): Product[] {
    let products = this.products;
    if (category) {
      products = products.filter(p => p.category === category);
    }

    return products
      .sort((a, b) => b.salesCount - a.salesCount)
      .slice(0, limit);
  }

  // Get similar products
  getSimilarProducts(productId: string, limit: number = 4): Product[] {
    const product = this.products.find(p => p.id === productId);
    if (!product) return [];

    const similarities = this.products
      .filter(p => p.id !== productId)
      .map(p => ({
        product: p,
        similarity: this.calculateProductSimilarity(product, p)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);

    return similarities.map(item => item.product);
  }

  private calculateProductSimilarity(product1: Product, product2: Product): number {
    let similarity = 0;

    // Category match
    if (product1.category === product2.category) similarity += 3;
    
    // Color match
    if (product1.color === product2.color) similarity += 2;
    
    // Brand match
    if (product1.brand === product2.brand) similarity += 2;
    
    // Style match
    if (product1.style === product2.style) similarity += 2;
    
    // Price similarity
    const priceDiff = Math.abs(product1.price - product2.price);
    const priceRatio = 1 - (priceDiff / Math.max(product1.price, product2.price));
    similarity += priceRatio * 1;

    // Tag overlap
    const commonTags = product1.tags.filter(tag => product2.tags.includes(tag));
    similarity += commonTags.length * 0.5;

    return similarity;
  }
}

// Export singleton instance
export const recommendationEngine = new RecommendationEngine();