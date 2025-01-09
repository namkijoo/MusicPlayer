import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import styled from 'styled-components';

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
        <Suspense fallback={<Loading>Loading...</Loading>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

const Loading = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export default App;
