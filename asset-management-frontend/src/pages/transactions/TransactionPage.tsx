import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import IssueProductDialog from "./IssueProductDialog";
import ReturnProductDialog from "./ReturnProductDialog";
import { transactionService } from "../../services/transactionService";
import { useAuth } from "../../context/AuthContext";
import TransactionDetailsDialog from "./TransactionDetailsDialog";

const MyTransactionsPage = () => {
  const { currentUser } = useAuth();

  const [transactions, setTransactions] = useState([]);

  const [openIssue, setOpenIssue] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);

  const fetchTransactions = async () => {
    const res = await transactionService.getAll();
    setTransactions(res.data);
  };
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [openView, setOpenView] = useState(false);
  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleIssue = async (data: any) => {
    await transactionService.issueProduct(data);
    setOpenIssue(false);
    fetchTransactions();
  };

  const handleReturn = async (data: any) => {
    await transactionService.returnProduct(data);
    setOpenReturn(false);
    fetchTransactions();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },

    {
      field: "transactionType",
      headerName: "Type",
      width: 120,
      renderCell: (params: any) => <StatusBadge status={params.value} />,
    },

    { field: "employeeName", headerName: "Employee", flex: 1 },

    { field: "employeeUserId", headerName: "User ID", width: 120 },

    { field: "productTagNo", headerName: "Tag", width: 120 },

    { field: "productBrand", headerName: "Brand", flex: 1 },

    { field: "groupName", headerName: "Group", flex: 1 },

    { field: "typeName", headerName: "Type", flex: 1 },
    { field: "issuedBy", headerName: "issuedBy", flex: 1 },

    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params: any) => (
        <Button
          size="small"
          onClick={() => {
            setSelectedTransaction(params.row);
            setOpenView(true);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Box>
      {currentUser?.role === "AssetManager" && (
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => setOpenIssue(true)}
          >
            Issue Product
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenReturn(true)}
          >
            Return Product
          </Button>
        </Box>
      )}

      <DataTable rows={transactions} columns={columns} />

      <IssueProductDialog
        open={openIssue}
        onClose={() => setOpenIssue(false)}
        onSubmit={handleIssue}
      />

      <ReturnProductDialog
        open={openReturn}
        onClose={() => setOpenReturn(false)}
        onSubmit={handleReturn}
      />
      <TransactionDetailsDialog
        open={openView}
        onClose={() => setOpenView(false)}
        transaction={selectedTransaction}
      />
    </Box>
  );
};

export default MyTransactionsPage;
