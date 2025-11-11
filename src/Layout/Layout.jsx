import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-[100px]">
        <Outlet /> {/* This renders child routes */}
      </main>
      <Footer />
    </div>
  );
}

