import { Paper, Typography } from "@mui/material";

interface Props {
  title: string;
  value: number;
  color?: "primary" | "success" | "warning" | "info";
}

const DashboardCard = ({ title, value, color = "primary" }: Props) => {
  return (
    <Paper sx={{ p: 3, textAlign: "center", minWidth: 150 }}>
      <Typography variant="subtitle1" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h4" color={color}>
        {value}
      </Typography>
    </Paper>
  );
};

export default DashboardCard;
