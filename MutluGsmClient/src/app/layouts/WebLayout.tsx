import { Outlet } from "react-router";
import Header from "../../areas/web/components/Header";
import Footer from "../../areas/web/components/Footer";

export default function WebLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
