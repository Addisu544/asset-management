import { Breadcrumbs, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const BreadcrumbsNav = () => {
  const location = useLocation();

  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumbs sx={{ mb: 2 }}>
      {paths.map((path, index) => (
        <Typography key={index}>{path.toUpperCase()}</Typography>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
