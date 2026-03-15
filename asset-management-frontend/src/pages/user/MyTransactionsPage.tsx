import { useEffect, useState } from "react";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import { userService } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

const MyTransactionsPage = () => {
  const { currentUser } = useAuth();

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    // const res = await userService.getMyTransactions(currentUser?.id);
    const res = await userService.getMyTransactions(
      Number(currentUser?.userId),
    );

    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },

    {
      field: "transactionType",
      headerName: "Type",
      width: 120,
      renderCell: (params: any) => <StatusBadge status={params.value} />,
    },

    { field: "productTagNo", headerName: "Tag", width: 120 },

    { field: "productBrand", headerName: "Brand", flex: 1 },

    { field: "groupName", headerName: "Group", flex: 1 },

    { field: "typeName", headerName: "Type", flex: 1 },

    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      renderCell: (params: any) => new Date(params.value).toLocaleString(),
    },
  ];

  return <DataTable rows={transactions} columns={columns} />;
};

export default MyTransactionsPage;
