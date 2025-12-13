import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import PrivateRoute from "./Components/PrivateRoute";
import FloatingContact from "./Components/FloatingContact";
import LoadingSpinner from "./Components/LoadingSpinner";

// Lazy imports
const Home = lazy(() => import("./Pages/Home"));
const Accessibility = lazy(() => import("./Pages/Accessibility"));
const AboutUs = lazy(() => import("./Pages/AboutUs"));
const AdminDashboard = lazy(() => import("./Pages/AdminDashboard"));
const Blog = lazy(() => import("./Pages/Blog"));
const BlogPost = lazy(() => import("./Pages/BlogPost"));
const BookOfLife = lazy(() => import("./Pages/BookOfLife"));
const BookService = lazy(() => import("./Pages/BookService"));
const Cart = lazy(() => import("./Pages/Cart"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const Contacts = lazy(() => import("./Pages/Contacts"));
const Cookies = lazy(() => import("./Pages/Cookies"));
const Events = lazy(() => import("./Pages/Events"));
const Giving = lazy(() => import("./Pages/Giving"));
const GetInvolved = lazy(() => import("./Pages/GetInvolved"));
const HelpCenter = lazy(() => import("./Pages/HelpCenter"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./Pages/TermsAndConditions"));
const RefundPolicy = lazy(() => import("./Pages/RefundPolicy"));
const ProductDetail = lazy(() => import("./Pages/ProductDetail"));
const ProductsPage = lazy(() => import("./Pages/ProductsPage"));
const ReportIssue = lazy(() => import("./Pages/ReportIssue"));
const SafetyCenter = lazy(() => import("./Pages/SafetyCenter"));
const Services = lazy(() => import("./Pages/Services"));
const Staff = lazy(() => import("./Pages/Staff"));
const Tracking = lazy(() => import("./Pages/Tracking"));
const Volunteer = lazy(() => import("./Pages/Volunteer"));
const WeAreHiring = lazy(() => import("./Pages/WeAreHiring"));
const Xclusive = lazy(() => import("./Pages/Xclusive"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const SignupPage = lazy(() => import("./Pages/SignupPage"));
const UserDashboard = lazy(() => import("./Pages/UserDashboard"));
const FavoritesPage = lazy(() => import("./Pages/FavoritesPage"));
const Bonds = lazy(() => import("./Pages/Bonds"));
const Charity = lazy(() => import("./Pages/Charity"));

export default function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="accessibility" element={<Accessibility />} />
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
            <Route path="checkout" element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            } />
            <Route path="contacts" element={<Contacts />} />
            <Route path="cookies" element={<Cookies />} />
            <Route path="events" element={<Events />} />
            <Route path="giving" element={<Giving />} />
            <Route path="get-involved" element={<GetInvolved />} />
            <Route path="help" element={<HelpCenter />} />
            <Route path="report" element={<ReportIssue />} />
            <Route path="safety" element={<SafetyCenter />} />
            <Route path="services" element={<Services />} />
            <Route path="book-service/:serviceId" element={<BookService />} />
            <Route path="staff" element={<Staff />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="track-order" element={<Tracking />} />
            <Route path="volunteer" element={<Volunteer />} />
            <Route path="hiring" element={<WeAreHiring />} />
            <Route path="xclusive" element={<Xclusive />} />
            <Route path="product/:productId" element={<ProductDetail />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="user/dashboard" element={<UserDashboard />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="bonds" element={<Bonds />} />
            <Route path="charity" element={<Charity />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <FloatingContact />
    </>
  );
}
