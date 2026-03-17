// import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
// import StatusBadge from "../../components/common/StatusBadge";

// const EmployeeDetailsDialog = ({ open, onClose, employee }: any) => {
//   if (!employee) return null;

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth>
//       <DialogTitle>Employee Details</DialogTitle>

//       <DialogContent>
//         <Typography>Name: {employee.fullName}</Typography>

//         <Typography>Email: {employee.email}</Typography>

//         <Typography>
//           Status: <StatusBadge status={employee.status} />
//         </Typography>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EmployeeDetailsDialog;
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import StatusBadge from "../../components/common/StatusBadge";

interface Props {
  open: boolean;
  onClose: () => void;
  employee?: any;
}

const EmployeeDetailsDialog = ({ open, onClose, employee }: Props) => {
  if (!employee) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Employee Details</DialogTitle>

      <DialogContent dividers>
        <Typography gutterBottom>
          <strong>User ID:</strong> {employee.userId}
        </Typography>

        <Typography gutterBottom>
          <strong>Name:</strong> {employee.fullName}
        </Typography>

        <Typography gutterBottom>
          <strong>Email:</strong> {employee.email}
        </Typography>

        <Typography gutterBottom>
          <strong>Phone Number:</strong> {employee.phone}
        </Typography>

        <Typography gutterBottom>
          <strong>Title:</strong> {employee.title}
        </Typography>

        <Typography gutterBottom>
          <strong>Department:</strong> {employee.departmentName}
        </Typography>
        
        <Typography gutterBottom>
          <strong>Role:</strong> {employee.role}
        </Typography>

        <Typography gutterBottom>
          <strong>Level:</strong> {employee.level}
        </Typography>

        <Typography gutterBottom>
          <strong>Status:</strong> <StatusBadge status={employee.status} />
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeDetailsDialog;
