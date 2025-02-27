import { Outlet } from "react-router-dom";
import Header from "../../components/AppComponents/Header";
import Footer from "../../components/AppComponents/Footer";
import HeaderBanner from "../../components/AppComponents/Banner/HeaderBanner";
import FooterBanner from "../../components/AppComponents/Banner/FooterBanner";
import Hero from "../../pages/home/Hero";

function Layout() {
  return (
    <div>
      <div className="fixed right-0 left-0 z-50">
        <HeaderBanner />
        <Header />
      </div>
      <Hero />
      <Outlet />
      <Footer />
      <FooterBanner />
    </div>
  );
}

export default Layout;
