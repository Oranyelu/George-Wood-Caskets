import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./Layout";
import PrivateRoute from "./Components/PrivateRoute";
import FloatingContact from "./Components/FloatingContact";
import LoadingSpinner from "./Components/LoadingSpinner";
import { Toaster } from "react-hot-toast";

// Lazy imports
const Home = lazy(() => import("./Pages/Home"));
const AboutUs = lazy(() => import("./Pages/AboutUs"));
const AdminDashboard = lazy(() => import("./Pages/AdminDashboard"));
const Blog = lazy(() => import("./Pages/Blog"));
const BlogPost = lazy(() => import("./Pages/BlogPost"));
const BookOfLife = lazy(() => import("./Pages/BookOfLife"));
const BookService = lazy(() => import("./Pages/BookService"));
const Cart = lazy(() => import("./Pages/Cart"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const Contacts = lazy(() => import("./Pages/Contacts"));
const Events = lazy(() => import("./Pages/Events"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./Pages/TermsAndConditions"));
const RefundPolicy = lazy(() => import("./Pages/RefundPolicy"));
const ProductDetail = lazy(() => import("./Pages/ProductDetail"));
const ProductsPage = lazy(() => import("./Pages/ProductsPage"));
const Services = lazy(() => import("./Pages/Services"));
const Tracking = lazy(() => import("./Pages/Tracking"));
const Xclusive = lazy(() => import("./Pages/Xclusive"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const SignupPage = lazy(() => import("./Pages/SignupPage"));
const UserDashboard = lazy(() => import("./Pages/UserDashboard"));
const FavoritesPage = lazy(() => import("./Pages/FavoritesPage"));
const Bonds = lazy(() => import("./Pages/Bonds"));
const Charity = lazy(() => import("./Pages/Charity"));
const InfoPage = lazy(() => import("./Pages/InfoPage"));
const PrintCatalog = lazy(() => import("./Pages/PrintCatalog"));

export default function App() {
  // === Image Protection ===
  useEffect(() => {
    const handleContextMenu = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="admin/dashboard" element={
              <PrivateRoute adminOnly={true}>
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="book-of-life" element={<BookOfLife />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="events" element={<Events />} />
            <Route path="services" element={<Services />} />
            <Route path="book-service/:serviceId" element={<BookService />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="track-order" element={<Tracking />} />
            <Route path="xclusive" element={<Xclusive />} />
            <Route path="info/:pageId" element={<InfoPage />} />
            <Route path="product/:productId" element={<ProductDetail />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="user/dashboard" element={<UserDashboard />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="bonds" element={<Bonds />} />
            <Route path="charity" element={<Charity />} />

            {/* Legacy SEO and Sitemap redirection routes */}
            <Route path="accessibility" element={<Navigate to="/info/accessibility" replace />} />
            <Route path="cookies" element={<Navigate to="/info/cookies" replace />} />
            <Route path="help" element={<Navigate to="/info/help" replace />} />
            <Route path="report" element={<Navigate to="/info/report" replace />} />
            <Route path="safety" element={<Navigate to="/info/safety" replace />} />
            <Route path="hiring" element={<Navigate to="/info/hiring" replace />} />
            <Route path="get-involved" element={<Navigate to="/info/get-involved" replace />} />
            <Route path="terms" element={<Navigate to="/terms-and-conditions" replace />} />
            <Route path="privacy" element={<Navigate to="/privacy-policy" replace />} />
            <Route path="giving" element={<Navigate to="/charity" replace />} />
            <Route path="tracking" element={<Navigate to="/track-order" replace />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="print-catalog" element={<PrintCatalog />} />
        </Routes>
      </Suspense>
      <FloatingContact />
    </>
  );
}
