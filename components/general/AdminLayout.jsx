import { Box } from "@mui/material";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <main>{children}</main>
    </Box>
  );
};

export default AdminLayout;
