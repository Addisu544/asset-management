import { useEffect, useState } from "react";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import { userService } from "../../services/userService";
console.log("reached above");

const MyPropertiesPage = () => {
  console.log("reached");

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
  ];

  return <DataTable rows={products} columns={columns} />;
};

export default MyPropertiesPage;
