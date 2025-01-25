import Image from 'next/image';
// @ts-ignore
import { unstable_ViewTransition as ViewTransition } from 'react';
import { Product } from '@/lib/products';

interface ProductImageProps {
  product: Product;
  priority?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  className?: string;
}

export function ProductImage({
  product,
  maxWidth = '100%',
  maxHeight = 'none',
  className = '',
}: ProductImageProps) {
  return (
    <div
      className={`relative mb-1 ${className}`}
      style={{
        width: '100%',
        maxWidth,
        maxHeight,
        aspectRatio: '1',
        overflow: 'hidden',
      }}
    >
      <ViewTransition name={product.id}>
        <Image
          // Without this style, image transitions break when going from home to product page
          // but work fine from product page to home. Root cause unclear
          style={{ viewTransitionName: product.id }}
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain transition-opacity duration-200 aspect-square"
          loading="eager"
          decoding="sync"
        />
      </ViewTransition>
    </div>
  );
}
