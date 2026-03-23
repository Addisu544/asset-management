import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import EmptyState from "./EmptyState";

const DataTable = ({ rows, columns, loading }: any) => {
  const [search, setSearch] = useState("");
  const statusValues: string[] = Array.from(
    new Set(
      (rows ?? [])
        .map((r: any) => r?.status)
        .filter(
          (v: any): v is string =>
            typeof v === "string" && v.trim().length > 0,
        ),
    ),
  );

  const [statusFilter, setStatusFilter] = useState("all");
  const hasStatusFilter = statusValues.length > 0;

  const filteredRows = (rows ?? []).filter((row: any) => {
    const matchesSearch = JSON.stringify(row)
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      !hasStatusFilter || statusFilter === "all" || row?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ sm: "center" }}
        sx={{ mb: 2 }}
      >
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: 220 }}
        />

        {hasStatusFilter && (
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              {statusValues.map((s: string) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
          slots={{
            noRowsOverlay: EmptyState,
          }}
          sx={{
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "action.hover",
              borderBottom: "1px solid",
              borderColor: "divider",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 800,
              color: "text.secondary",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid",
              borderColor: "divider",
            },
            "& .MuiDataGrid-row": {
              "&:hover": { bgcolor: "action.hover" },
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid",
              borderColor: "divider",
            },
          }}
        />
      </div>
    </Box>
  );
};

export default DataTable;
