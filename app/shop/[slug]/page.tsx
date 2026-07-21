import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { Section } from '@/components/common/section';
import { Reveal } from '@/components/common/reveal';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ProductVisual } from '@/components/shop/product-visual';
import { Price } from '@/components/shop/price';
import { BuyButton } from '@/components/shop/buy-button';
import { shopService } from '@/services/shop';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return shopService.getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = shopService.getProduct(slug);
  if (!product) return { title: 'Produkt nicht gefunden' };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = shopService.getProduct(slug);
  if (!product) notFound();

  const soldOut = product.stock === 0;

  return (
    <>
      <PageHeader eyebrow="Shop" title={product.name} description={product.shortDescription} />

      <Section>
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Zurück zum Shop
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Visual */}
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <ProductVisual
                category={product.category}
                className="aspect-square"
              />
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.1}>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {product.category}
                </Badge>
                {product.badge && (
                  <Badge
                    variant={product.badge === 'Premium' ? 'premium' : 'default'}
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>

              <h2 className="mt-4 text-3xl font-bold text-white">
                {product.name}
              </h2>
              <div className="mt-2 flex items-center gap-3">
                <Price
                  value={product.price}
                  currency={product.currency}
                  className="text-2xl"
                />
                <span className="text-sm text-text-secondary">
                  {product.stock === null
                    ? 'Auf Lager'
                    : soldOut
                      ? 'Ausverkauft'
                      : `${product.stock} verfügbar`}
                </span>
              </div>

              <p className="mt-6 leading-relaxed text-text-secondary">
                {product.description}
              </p>

              {/* Benefits */}
              <Card className="mt-8 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand">
                  Deine Vorteile
                </h3>
                <ul className="mt-4 space-y-3">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm text-white">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                        <Check className="size-3.5" />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Card>

              <div className="mt-8 max-w-xs">
                <BuyButton
                  slug={product.slug}
                  disabled={soldOut}
                  size="lg"
                  className="w-full"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
