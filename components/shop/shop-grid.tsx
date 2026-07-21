'use client';

import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/shop/product-card';
import { staggerContainer } from '@/lib/animations';
import type { Product, ShopCategory } from '@/types';

const CATEGORIES: { value: ShopCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'ranks', label: 'Ränge' },
  { value: 'keys', label: 'Keys' },
  { value: 'coins', label: 'Coins' },
  { value: 'bundles', label: 'Bundles' },
  { value: 'cosmetics', label: 'Cosmetics' },
];

interface ShopGridProps {
  products: Product[];
}

export function ShopGrid({ products }: ShopGridProps) {
  return (
    <Tabs defaultValue="all">
      <div className="flex justify-center">
        <TabsList>
          {CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {CATEGORIES.map((cat) => {
        const list =
          cat.value === 'all'
            ? products
            : products.filter((p) => p.category === cat.value);
        return (
          <TabsContent key={cat.value} value={cat.value}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {list.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </motion.div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
