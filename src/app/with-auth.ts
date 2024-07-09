'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const WithAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken =
      typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;

    if (!accessToken) {
      router.replace('/login');
    }
  }, [router]);

  return children;
};

export default WithAuth;
