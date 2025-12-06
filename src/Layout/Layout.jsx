import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${isHome ? '' : 'mt-[30px] md:mt-[50px]'}`}>
        <Outlet /> {/* This renders child routes */}
      </main>
      <Footer />
    </div>
  );
}

