'use client';

import { useEffect, startTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { products } from '@/lib/products';
import { ProductImage } from '@/components/product-image';
import { throttle } from '@/lib/utils';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const sessionKey = 'scroll_/';
    const savedPosition = sessionStorage.getItem(sessionKey);
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
    }

    const handleScroll = throttle(() => {
      sessionStorage.setItem(sessionKey, window.scrollY.toString());
    }, 500);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow relative pt-12">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-x-5 gap-y-12 pb-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/p/${product.id}`}
              onClick={() =>
                startTransition(() => {
                  router.push(`/p/${product.id}`);
                })
              }
            >
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
