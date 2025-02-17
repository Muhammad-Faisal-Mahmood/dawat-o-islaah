import { Outlet } from "react-router-dom";
import Header from "../../components/AppComponents/Header";
import Footer from "../../components/AppComponents/Footer";
import HeaderBanner from "../../components/AppComponents/Banner/HeaderBanner";
import FooterBanner from "../../components/AppComponents/Banner/FooterBanner";

function Layout() {
  return (
    <div>
      <div className="fixed right-0 left-0 z-50">
        <HeaderBanner />
        <Header />
      </div>
      <Outlet />
      <Footer />
      <FooterBanner />
    </div>
  );
}

export default Layout;
