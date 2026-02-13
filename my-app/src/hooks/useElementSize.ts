// src/hooks/useElementSize.ts
import { useState, useEffect, useRef } from 'react';
// import type { RefObject } from 'react';

export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null); // <- let TS infer the type
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      if (ref.current) {
        setSize({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    }

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return [ref, size] as const;
}
