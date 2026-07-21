'use client';

import { CollectionEditor } from '@/components/admin/collection-editor';
import {
  CATEGORY_OPTIONS,
  CURRENCY_OPTIONS,
} from '@/components/admin/options';
import type { Field } from '@/components/admin/schema';
import type { Product } from '@/types';

const FIELDS: Field[] = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'slug', label: 'Slug (URL)', type: 'text', hint: 'z. B. rank-cloud' },
  { key: 'category', label: 'Kategorie', type: 'select', options: CATEGORY_OPTIONS },
  { key: 'currency', label: 'Währung', type: 'select', options: CURRENCY_OPTIONS },
  { key: 'price', label: 'Preis', type: 'number' },
  { key: 'stock', label: 'Bestand', type: 'nullable-number', hint: 'leer = unbegrenzt' },
  { key: 'shortDescription', label: 'Kurzbeschreibung', type: 'text', wide: true },
  { key: 'description', label: 'Beschreibung', type: 'textarea', wide: true },
  { key: 'benefits', label: 'Vorteile', type: 'lines', wide: true, hint: 'Ein Vorteil pro Zeile' },
  { key: 'badge', label: 'Badge (optional)', type: 'text', hint: 'z. B. Beliebt, -15%' },
  { key: 'featured', label: 'Hervorgehoben', type: 'boolean' },
];

function newProduct(): Product {
  return {
    slug: '',
    name: '',
    category: 'ranks',
    shortDescription: '',
    description: '',
    price: 0,
    currency: 'eur',
    stock: null,
    image: '',
    benefits: [],
    featured: false,
    badge: '',
  };
}

export default function AdminProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Shop-Produkte</h1>
      <p className="mb-8 mt-2 text-text-secondary">
        Verwalte alle Produkte des Shops.
      </p>
      <CollectionEditor<Product>
        resource="products"
        fields={FIELDS}
        newItem={newProduct}
        itemLabel={(p) => p.name}
        itemMeta={(p) =>
          `${p.category} · ${p.price} ${p.currency === 'eur' ? '€' : p.currency}`
        }
      />
    </div>
  );
}
