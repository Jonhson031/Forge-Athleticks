import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import Contact from './components/Contact/Contact.jsx';
import ErrorPage from './components/Error/Error.jsx';
import AboutPage from './components/About/AboutPage.jsx';
import ProductPage from './components/Product/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/contact', element: <Contact /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/product/:id', element: <ProductPage /> },
      { path: '/cart', element: <CartPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
