import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import RootLayout from "./pages/RootLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import Contact from "./components/Contact/Contact.jsx";
import ErrorPage from "./components/Error/Error.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import FaqsPage from "./pages/FaqsPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import registerAction from "./actions/authActions/registerAction.js";
import loginAction from "./actions/authActions/loginAction.js";
import { dashboardLoader } from "./loaders/dashboardLoader.js";
import DashboardPage from "./pages/DashboardPage.jsx";
import ForgotPassword from "./components/Authentication/ForgotPassword.jsx";
import VerifyCode from "./components/Authentication/VerifyCode.jsx";
import forgotPasswordAction from "./actions/authActions/forgotPasswordAction.js";
import verifyCodeAction from "./actions/authActions/verifyCodeAction.js";
import ResetPassword from "./components/Authentication/ResetPassword.jsx";
import resetPasswordAction from "./actions/authActions/resetPasswordAction.js";

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
        element: <ProductDetailPage />,
      },
      { path: "/cart", element: <CartPage /> },
      { path: "/faq", element: <FaqsPage /> },
      { path: "/login", element: <LoginPage />, action: loginAction },
      { path: "/register", element: <RegisterPage />, action: registerAction },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
        action: forgotPasswordAction,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
        loader: dashboardLoader,
      },
      {
        path: "/verify-code/:email",
        element: <VerifyCode />,
        action: verifyCodeAction,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
        action: resetPasswordAction,
      },
    ],
  },
]);

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
