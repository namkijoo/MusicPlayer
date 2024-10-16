import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LeftBar from './components/Home/LeftBar';
import MusicSearh from './components/Search/MusicSearch';

const VITE_GOOGLE_CLIENTID = import.meta.env.VITE_GOOGLE_CLIENTID;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <LeftBar />,
      },
      {
        path: 'search',
        element: <MusicSearh />,
      },
    ],
  },
]);
const queryClient = new QueryClient();

function App() {
  return (
    <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENTID}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
