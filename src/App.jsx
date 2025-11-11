// src/App.jsx
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Layout,
  Accessibility,
  AboutUs,
  AdminDashboard,
  Blog,
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
  OrderTrackingPage,
  Privacy,
  ProductDetail,
  ProductsPage,
  ReportIssue,
  SafetyCenter,
  Services,
  Staff,
  TermsOfService,
  WeAreHiring,
  Xclusive,
} from "./Utils";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} /> {/* or your homepage */}
        <Route path="accessibility" element={<Accessibility />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="blog" element={<Blog />} />
        <Route path="book-of-life" element={<BookOfLife />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="events" element={<Events />} />
        <Route path="giving" element={<Giving />} />
        <Route path="get-involved" element={<GetInvolved />} />
        <Route path="help" element={<HelpCenter />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="report" element={<ReportIssue />} />
        <Route path="safety" element={<SafetyCenter />} />
        <Route path="services" element={<Services />} />
        <Route path="staff" element={<Staff />} />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="hiring" element={<WeAreHiring />} />
        <Route path="xclusive" element={<Xclusive />} />
        <Route path="product/:productId" element={<ProductDetail />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="track-order" element={<OrderTrackingPage />} />
        <Route path="order-tracking/:orderId" element={<OrderTrackingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
