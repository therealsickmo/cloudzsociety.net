'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ProductVisual } from '@/components/shop/product-visual';
import { Price } from '@/components/shop/price';
import { BuyButton } from '@/components/shop/buy-button';
import { slideUp } from '@/lib/animations';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const soldOut = product.stock === 0;

  return (
    <motion.div variants={slideUp}>
      <Card className="group flex h-full flex-col overflow-hidden p-3 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow">
        <div className="relative">
          <ProductVisual category={product.category} />
          {product.badge && (
            <Badge
              variant={product.badge === 'Premium' ? 'premium' : 'default'}
              className="absolute left-3 top-3"
            >
              {product.badge}
            </Badge>
          )}
          <Link
            href={`/shop/${product.slug}`}
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/60 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
            aria-label={`${product.name} Details`}
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="flex flex-1 flex-col p-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-white">
              <Link href={`/shop/${product.slug}`} className="hover:text-brand">
                {product.name}
              </Link>
            </h3>
          </div>
          <p className="mt-1 line-clamp-2 flex-1 text-sm text-text-secondary">
            {product.shortDescription}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <Price value={product.price} currency={product.currency} />
            <span className="text-xs text-text-secondary">
              {product.stock === null
                ? 'Auf Lager'
                : soldOut
                  ? 'Ausverkauft'
                  : `${product.stock} verfügbar`}
            </span>
          </div>

          <div className="mt-4">
            <BuyButton
              slug={product.slug}
              disabled={soldOut}
              size="sm"
              className="w-full"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
