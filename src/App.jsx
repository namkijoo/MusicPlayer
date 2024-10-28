import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

const VITE_GOOGLE_CLIENTID = import.meta.env.VITE_GOOGLE_CLIENTID;

const Home = lazy(() => import('./pages/Home.'));
const Main = lazy(() => import('./components/Home/Main'));
const MusicSearch = lazy(() => import('./components/Search/MusicSearch'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: 'search',
        element: <MusicSearch />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENTID}>
      <QueryClientProvider client={queryClient}>
        {/* Suspense로 로딩 UI를 감싸 코드 스플리팅 적용 */}
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
