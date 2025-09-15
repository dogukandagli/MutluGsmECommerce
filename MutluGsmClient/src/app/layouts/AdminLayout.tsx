import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div>
      <h1>Admin Layout</h1>
      <Outlet />
    </div>
  );
}
