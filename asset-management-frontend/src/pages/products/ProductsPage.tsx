import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { productService } from "../../services/productService";
import ProductFormDialog from "./ProductFormDialog";
import ProductDetailsDialog from "./ProductDetailsDialog";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "../../context/SnackbarContext";

const ProductsPage = () => {
  const { currentUser } = useAuth();
  const { showSuccess, showApiError } = useSnackbar();

  const [products, setProducts] = useState([]);

  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [selected, setSelected] = useState<any>(null);

  const fetchProducts = async () => {
    try {
      const res = await productService.getAll();
      setProducts(res.data);
    } catch (err) {
      showApiError(err, "Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (data: any) => {
    try {
      await productService.create(data);
      setOpenForm(false);
      showSuccess("Product created successfully");
      fetchProducts();
    } catch (err) {
      showApiError(err, "Failed to create product");
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      if (!selected) return;
      await productService.update(selected.id, data);
      setOpenForm(false);
      showSuccess("Product updated successfully");
      fetchProducts();
    } catch (err) {
      showApiError(err, "Failed to update product");
    }
  };

  const handleDelete = async () => {
    try {
      if (!selected) return;
      await productService.delete(selected.id);
      setConfirmOpen(false);
      showSuccess("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      showApiError(err, "Failed to delete product");
    }
  };

  const columns = [
    { field: "tagNo", headerName: "Tag", width: 150 },

    { field: "brand", headerName: "Brand", flex: 1 },

    { field: "groupName", headerName: "Group", flex: 1 },

    { field: "typeName", headerName: "Type", flex: 1 },

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
          onClick={() => {
            setSelected(null); //  RESET
            setOpenForm(true);
          }}
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
