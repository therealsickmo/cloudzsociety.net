'use client';

import { useEffect, useState } from 'react';
import { minecraftService } from '@/services/minecraft';
import type { ServerStatus } from '@/types';

interface State {
  status: ServerStatus | null;
  loading: boolean;
  error: boolean;
}

/** Fetches the (currently mocked) Minecraft server status on mount. */
export function useServerStatus() {
  const [state, setState] = useState<State>({
    status: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let active = true;
    minecraftService
      .getServerStatus()
      .then((status) => {
        if (active) setState({ status, loading: false, error: false });
      })
      .catch(() => {
        if (active) setState({ status: null, loading: false, error: true });
      });
    return () => {
      active = false;
    };
  }, []);

  return state;
}
