import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router";
import Header from "../../areas/admin/components/Header";
import Sidebar from "../../areas/admin/components/Sidebar";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md altıysa true döner
  const [mobile, setMobile] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const handleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  useEffect(() => {
    setMobile(isMobile);
    setSideBarOpen(!isMobile);
  }, [isMobile]);

  return (
    <>
      <Header handleSideBar={handleSideBar} />
      {sideBarOpen && <Sidebar />}
      <Box
        onClick={mobile ? () => setSideBarOpen(false) : undefined}
        sx={{ minHeight: "100vh" }}
      >
        <Outlet />
      </Box>
    </>
  );
}
