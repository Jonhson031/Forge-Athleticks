import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import Contact from "./components/Contact/Contact.jsx";
import ErrorPage from "./components/Error/Error.jsx";
import AboutPage from "./components/About/AboutPage.jsx";
import ProductDetail from "./components/ProductDetail/ProductDetail.jsx";
import CartPage from "./pages/CartPage.jsx";
import FaqsPage from "./components/FAQs/FaqsPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <AboutPage /> },
      {
        path: "/products/:slug?",
        element: <ProductsPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      { path: "/cart", element: <CartPage /> },
      { path: "/faq", element: <FaqsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
