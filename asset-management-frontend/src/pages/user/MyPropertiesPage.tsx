import { useEffect, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import { userService } from "../../services/userService";
import ProductDetailsDialog from "../products/ProductDetailsDialog";
import VisibilityIcon from "@mui/icons-material/Visibility";

console.log("reached above");

const MyPropertiesPage = () => {
  console.log("reached");
  const [openDetails, setOpenDetails] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [products, setProducts] = useState([]);
  console.log("reached");

  const fetchProducts = async () => {
    const res = await userService.getMyProducts();
    console.log("reached");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    { field: "tagNo", headerName: "Tag", width: 140 },

    { field: "brand", headerName: "Brand", flex: 1 },

    { field: "groupName", headerName: "Group", flex: 1 },

    { field: "typeName", headerName: "Type", flex: 1 },

    { field: "serialNo", headerName: "Serial No", flex: 1 },

    { field: "cost", headerName: "Cost", width: 120 },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params: any) => <StatusBadge status={params.value} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 260,
      renderCell: (params: any) => {
        const row = params.row;

        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Tooltip title="View" arrow>
              <IconButton
                size="small"
                onClick={() => {
                  setSelected(row);
                  setOpenDetails(true);
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      {" "}
      <DataTable rows={products} columns={columns} />;
      <ProductDetailsDialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        product={selected}
      />
    </>
  );
};

export default MyPropertiesPage;
