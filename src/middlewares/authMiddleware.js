'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthMiddleware = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('auth_token');
    
    if (!token) {
      router.push('/'); // Redirect to login if no token
    } else {
      router.push('/dashboard'); // Redirect to dashboard if authenticated
    }
  }, [router]);
};

export default AuthMiddleware;