// _app.js

import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Your Clerk frontend API key (replace with your actual key)
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    const { pathname } = router;
    if (pathname !== '/' && !pageProps.isSignedIn) {
      router.push('/sign-in');
    }
  }, [router, pageProps.isSignedIn]);

  return (
    <ClerkProvider
      frontendApi={clerkFrontendApi}
      navigate={(to) => router.push(to)}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
