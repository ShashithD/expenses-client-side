'use client';

import { useEffect } from 'react';
import { useRouter } from "next/navigation";

const WithAuth = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;

    useEffect(() => {
      if (!accessToken) {
        router.replace("/login");
      }
    }, [accessToken, router])

  return children;
};

export default WithAuth;
