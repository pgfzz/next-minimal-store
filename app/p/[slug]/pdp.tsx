'use client';

import { useEffect, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { notFound, redirect } from 'next/navigation';
import { getProductById } from '@/lib/products';
import { AddToCart } from '@/components/add-to-cart';
import { ProductImage } from '@/components/product-image';

export default function PDP({ slug }: { slug: string }) {
  const product = getProductById(slug);
  const router = useRouter();

  if (!product) {
    notFound();
  }

  const handleBack = () => {
    startTransition(() => {
      startTransition(() => router.push(document.referrer || '/'));
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleBack]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      handleBack();
    };

    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [handleBack]);

  return (
    <div className="flex flex-col min-h-screen">
      <main
        className="flex flex-col items-center justify-between pt-[20px]"
        style={{
          top: '0',
          height:
            'calc(100vh - 80px - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
          paddingTop: 'calc(20px + env(safe-area-inset-top))',
          paddingBottom: '0',
        }}
      >
        <div className="w-full max-w-2xl mx-auto flex-grow flex flex-col items-center justify-center aspect-square">
          <ProductImage
            product={product}
            maxWidth="100%"
            maxHeight="calc(100vh - 250px - env(safe-area-inset-top) - env(safe-area-inset-bottom))"
            className="w-full"
          />
        </div>

        <motion.div
          className="w-full max-w-md mx-auto mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <AddToCart product={product} />
        </motion.div>
      </main>
    </div>
  );
}
