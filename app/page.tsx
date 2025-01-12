'use client';

import { Link } from 'next-view-transitions';
import { products } from '@/lib/products';
import { ProductImage } from '@/components/product-image';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow relative pt-12">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-x-5 gap-y-12 pb-8">
          {products.map((product) => (
            <Link key={product.id} href={`/p/${product.id}`}>
              <ProductImage product={product} />
              <p className="font-medium text-center font-mono uppercase">
                {product.id.split('-').slice(0, -1).join('-')}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
