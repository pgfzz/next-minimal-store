'use client';

import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useTransitionRouter } from 'next-view-transitions';
import { MainMenu } from './main-menu';
import { Cart } from './cart';
import { useCart } from './cart-context';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useTransitionRouter();

  const { items } = useCart();

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const isHomePage = pathname === '/';

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav
      style={{ viewTransitionName: 'header' }}
      className="flex items-center justify-between py-0 px-5 fixed top-0 left-0 right-0 z-10 bg-white"
    >
      <div className="flex items-center">
        <MainMenu isBackVisible={!isHomePage} onBack={handleBack} />
      </div>
      <div className="flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-20 size-12 flex items-center justify-center"
          aria-label="Cart"
        >
          <svg
            className="size-6"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="6"
              y="8"
              width="12"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            ></rect>
            <path
              d="M9 7V7C9 5.34315 10.3431 4 12 4V4C13.6569 4 15 5.34315 15 7V7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
          </svg>
          <span className="ml-1 font-semibold">{totalQuantity}</span>
        </button>
        <Cart isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </nav>
  );
}
