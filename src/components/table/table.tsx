import React from 'react';
import { Table, TableBody, TableColumn, TableHeader } from '@nextui-org/react';

interface Column {
  name: string;
  uid: string;
  align?: "center" | "start" | "end" | undefined
}

interface TableWrapperProps {
  columns: Column[];
  rows: React.JSX.Element[];
}

export const TableWrapper = ({ columns, rows }: TableWrapperProps) => {
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === 'actions'}
              align={column.align || 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>{rows}</TableBody>
      </Table>
    </div>
  );
};
