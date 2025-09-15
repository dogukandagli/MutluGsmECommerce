import { Outlet } from "react-router";

export default function WebLayout() {
  return (
    <div>
      <h1>Web Layout</h1>
      <Outlet />
    </div>
  );
}
