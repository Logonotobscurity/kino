'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Routes that should be preloaded for faster navigation
const CRITICAL_ROUTES = [
  '/shop',
  '/checkout',
  '/contact',
  '/reservation',
  '/classes',
];

// Common bundles and assets that should be preloaded
const CRITICAL_ASSETS = [
  '/logo.png',
];

export function PerformanceOptimizations() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Only run optimizations if not in data saver mode
    if ('connection' in navigator && 
        navigator.connection && 
        (navigator.connection as any).saveData === true) {
      return;
    }
    
    // Preload critical routes except current path
    const routesToPreload = CRITICAL_ROUTES.filter(route => route !== pathname);
    
    // Preload next likely routes
    routesToPreload.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      link.as = 'document';
      document.head.appendChild(link);
    });
    
    // Preload critical assets
    CRITICAL_ASSETS.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = asset;
      link.as = asset.endsWith('.js') ? 'script' : 
                asset.endsWith('.css') ? 'style' : 
                asset.endsWith('.png') || asset.endsWith('.jpg') || asset.endsWith('.webp') ? 'image' : 
                'fetch';
      document.head.appendChild(link);
    });
    
    // Enable native lazy loading for images if supported
    if ('loading' in HTMLImageElement.prototype) {
      document.querySelectorAll('img:not([loading])').forEach(img => {
        img.setAttribute('loading', 'lazy');
      });
    }
    
    // Initialize Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
      const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLImageElement;
            if (target.dataset.src) {
              target.src = target.dataset.src;
              delete target.dataset.src;
            }
            lazyLoadObserver.unobserve(target);
          }
        });
      });
      
      // Observe all images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach(img => {
        lazyLoadObserver.observe(img);
      });
    }
  }, [pathname]);
  
  return null;
} 