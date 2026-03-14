import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { productService } from "../../services/productService";
import ProductFormDialog from "./ProductFormDialog";
import ProductDetailsDialog from "./ProductDetailsDialog";
import { useAuth } from "../../context/AuthContext";

const ProductsPage = () => {
  const { currentUser } = useAuth();

  const [products, setProducts] = useState([]);

  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [selected, setSelected] = useState<any>(null);

  const fetchProducts = async () => {
    const res = await productService.getAll();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (data: any) => {
    await productService.create(data);
    setOpenForm(false);
    fetchProducts();
  };

  const handleUpdate = async (data: any) => {
    await productService.update(selected.id, data);
    setOpenForm(false);
    fetchProducts();
  };

  const handleDelete = async () => {
    await productService.delete(selected.id);
    setConfirmOpen(false);
    fetchProducts();
  };

  const columns = [
    { field: "tagNo", headerName: "Tag", width: 150 },

    { field: "brand", headerName: "Brand", flex: 1 },

    { field: "assetGroupName", headerName: "Group", flex: 1 },

    { field: "assetTypeName", headerName: "Type", flex: 1 },

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
          <Box>
            <Button
              size="small"
              onClick={() => {
                setSelected(row);
                setOpenDetails(true);
              }}
            >
              View
            </Button>

            {currentUser?.role === "AssetManager" && (
              <>
                <Button
                  size="small"
                  onClick={() => {
                    setSelected(row);
                    setOpenForm(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  color="error"
                  onClick={() => {
                    setSelected(row);
                    setConfirmOpen(true);
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      {currentUser?.role === "AssetManager" && (
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => setOpenForm(true)}
        >
          Create Product
        </Button>
      )}

      <DataTable rows={products} columns={columns} />

      <ProductFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={selected ? handleUpdate : handleCreate}
        product={selected}
      />

      <ProductDetailsDialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        product={selected}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Product"
        message="Are you sure?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default ProductsPage;
