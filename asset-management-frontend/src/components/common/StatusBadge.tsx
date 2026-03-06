import { Chip } from "@mui/material";

interface Props {
  status: string;
}

const StatusBadge = ({ status }: Props) => {
  const getColor = () => {
    switch (status) {
      case "Free":
      case "Active":
        return "success";

      case "Taken":
        return "warning";

      case "Inactive":
        return "default";

      default:
        return "default";
    }
  };

  return <Chip label={status} color={getColor()} size="small" />;
};

export default StatusBadge;
