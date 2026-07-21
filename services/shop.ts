import { products } from '@/content/products';
import type { Product, ShopCategory } from '@/types';

// ────────────────────────────────────────────────────────────────
// Shop service
//
// Frontend-only for now. The `checkout` method is a placeholder for a
// future Tebex / custom backend integration — see SHOP_PROVIDER in
// .env.example. Product data lives in content/products.ts so it can be
// replaced by an API response without touching the UI.
// ────────────────────────────────────────────────────────────────

export interface CheckoutResult {
  ok: boolean;
  message: string;
}

export interface ShopService {
  getProducts(): Product[];
  getByCategory(category: ShopCategory): Product[];
  getProduct(slug: string): Product | undefined;
  getFeatured(): Product[];
  checkout(slug: string): Promise<CheckoutResult>;
}

export const shopService: ShopService = {
  getProducts() {
    return products;
  },

  getByCategory(category) {
    return products.filter((p) => p.category === category);
  },

  getProduct(slug) {
    return products.find((p) => p.slug === slug);
  },

  getFeatured() {
    return products.filter((p) => p.featured);
  },

  async checkout(slug) {
    // Placeholder — a real integration would create a Tebex basket here.
    await new Promise((resolve) => setTimeout(resolve, 600));
    const product = products.find((p) => p.slug === slug);
    if (!product) {
      return { ok: false, message: 'Produkt nicht gefunden.' };
    }
    return {
      ok: true,
      message: `Checkout für „${product.name}" ist bald verfügbar.`,
    };
  },
};
