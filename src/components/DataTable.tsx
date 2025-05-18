"use client";

import { Sheet, Table, TableProps } from "@mui/joy";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import React from "react";

type Props<T> = {
  columns: ColumnDef<T, string | React.ReactNode>[];
  data: T[];
  tableProps?: TableProps;
  renderExpandedRow?: (row: T) => React.ReactNode;
  expandedRowIndex?: number | null;
};

export function DataTable<T>({
  columns,
  data,
  tableProps,
  renderExpandedRow,
  expandedRowIndex,
}: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Sheet variant="outlined" sx={{ mt: 3, px: 2, py: 4, borderRadius: "md" }}>
      <Table size="lg" stickyHeader {...tableProps}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ width: `${header.getSize()}px` }}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <React.Fragment key={row.id}>
              <tr>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>

              {expandedRowIndex === index && renderExpandedRow && (
                <tr>
                  <td colSpan={columns.length}>
                    {renderExpandedRow(row.original)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
