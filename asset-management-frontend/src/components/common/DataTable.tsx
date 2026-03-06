import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import EmptyState from "./EmptyState";

const DataTable = ({ rows, columns, loading }: any) => {
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter((row: any) =>
    JSON.stringify(row).toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box>
      <TextField
        label="Search"
        size="small"
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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
        />
      </div>
    </Box>
  );
};

export default DataTable;
