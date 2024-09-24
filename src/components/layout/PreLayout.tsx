import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import SideBar from "../common/SideBar";
import TopBar from "../common/TopBar";

const PreLayout = () => {
  return (
    <Box>
      <TopBar />
      <Box className="flex">
        <SideBar />
        <Box className="content">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default PreLayout;
