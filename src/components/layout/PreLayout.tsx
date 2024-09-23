import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import TopBar from "../common/TopBar";

const PreLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <Box
        component="pre"
        sx={{
          flexGrow: 1,
          p: 1,
          width: `calc(100% - 14rem)`,
          minHeight: "100vh",
          backgroundColor: "#fffff"
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default PreLayout;