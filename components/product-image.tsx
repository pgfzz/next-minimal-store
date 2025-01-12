import Image from 'next/image';
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
      <Image
        src={product.image}
        alt={product.name}
        fill
        style={{ viewTransitionName: product.id }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain transition-opacity duration-200 aspect-square"
        loading="eager"
        decoding="sync"
      />
    </div>
  );
}
