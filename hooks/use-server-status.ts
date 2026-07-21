'use client';

import { useEffect, useState } from 'react';
import type { ServerStatus } from '@/types';

interface State {
  status: ServerStatus | null;
  loading: boolean;
  error: boolean;
}

/** Fetches the (currently mocked) server status from the status API. */
export function useServerStatus() {
  const [state, setState] = useState<State>({
    status: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let active = true;
    fetch('/api/status')
      .then((res) => res.json())
      .then((data: { status: ServerStatus }) => {
        if (active) {
          setState({ status: data.status, loading: false, error: false });
        }
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
