import { Box, Sheet, Skeleton, Table } from "@mui/joy";

export const DataTableSkeleton = () => {
  return (
    <Sheet variant="outlined" sx={{ mt: 3, px: 2, py: 4, borderRadius: "md" }}>
      <Table size="lg" stickyHeader>
        <thead>
          <tr>
            <th>Token</th>
            <th>Amount</th>
            <th style={{ width: 48 }}></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, idx) => (
            <tr key={idx}>
              <td>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="text" width={120} />
                </Box>
              </td>
              <td>
                <Skeleton variant="text" width={80} />
              </td>
              <td>
                <Skeleton variant="rectangular" width={32} height={24} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};
