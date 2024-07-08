import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
} from "@nextui-org/react";
import React from "react";

interface Column {
  name: string;
  uid: string
}

interface TableWrapperProps {
  columns: Column[];
  rows: React.JSX.Element[];
}

export const TableWrapper = ({columns, rows}: TableWrapperProps) => {
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {rows}
        </TableBody>
      </Table>
    </div>
  );
};
