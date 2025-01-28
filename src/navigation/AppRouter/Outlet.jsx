import { Outlet } from "react-router-dom";
import Header from "../../components/AppComponents/Header";
import Footer from "../../components/AppComponents/Footer";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
