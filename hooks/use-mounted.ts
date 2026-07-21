'use client';

import { useEffect, useState } from 'react';

/** True after the component has mounted — useful to guard hydration. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
