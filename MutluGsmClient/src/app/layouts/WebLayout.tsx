import { Outlet } from "react-router";
import Header from "../../areas/web/components/Header";

export default function WebLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
