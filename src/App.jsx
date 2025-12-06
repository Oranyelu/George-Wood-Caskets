import { Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import {
  Home,
  Accessibility,
  AboutUs,
  AdminDashboard,
  Blog,
  BlogPost,
  BookOfLife,
  Cart,
  Checkout,
  Contacts,
  Cookies,
  Events,
  Giving,
  GetInvolved,
  HelpCenter,
  NotFoundPage,
  PrivacyPolicy,
  TermsAndConditions,
  RefundPolicy,
  ProductDetail,
  ProductsPage,
  ReportIssue,
  SafetyCenter,
  Services,
  Staff,
  Tracking,
  WeAreHiring,
  Xclusive,
  LoginPage,
  SignupPage
} from "./Pages";
import PrivateRoute from "./Components/PrivateRoute";
import FloatingContact from "./Components/FloatingContact";
import Bonds from "./Pages/Bonds";
import Charity from "./Pages/Charity";

export default function App() {
  return (
    <>
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
          <Route path="staff" element={<Staff />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
          <Route path="track-order" element={<Tracking />} />
          <Route path="hiring" element={<WeAreHiring />} />
          <Route path="xclusive" element={<Xclusive />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="bonds" element={<Bonds />} />
          <Route path="charity" element={<Charity />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <FloatingContact />
    </>
  );
}
