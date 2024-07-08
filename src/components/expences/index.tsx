'use client';

import { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
import Link from 'next/link';
import { DotsIcon } from '@/components/icons/expences/dots-icon';
import { InfoIcon } from '@/components/icons/expences/info-icon';
import { TrashIcon } from '@/components/icons/expences/trash-icon';
import { HouseIcon } from '@/components/icons/breadcrumb/house-icon';
import { PaymentsIcon } from '@/components/icons/breadcrumb/payments-icon';
import { SettingsIcon } from '@/components/icons/sidebar/settings-icon';
import { TableWrapper } from '@/components/table/table';
import { AddExpence } from './add-expence';
import { TableRow, TableCell, Tooltip, Chip } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { EditIcon } from '../icons/table/edit-icon';
import { EyeIcon } from '../icons/table/eye-icon';
import { DeleteIcon } from '../icons/table/delete-icon';
import { createExpense } from '@/redux/slices/expenses-reducer';
import { ExpenseFormType } from '@/helpers/types';
import Alert from '../Alert/alert';

interface Expense {
  _id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: string;
}

export const columns = [
  { name: 'Title', uid: 'title' },
  { name: 'Description', uid: 'role' },
  { name: 'Amount', uid: 'status' },
  { name: 'Date', uid: 'date' },
  { name: 'Type', uid: 'type' },
  { name: 'ACTIONS', uid: 'actions' },
];

export const Expences = () => {
  const [showAlert, setShowAlert] = useState(false);

  const { expenses, createPending, alert } = useSelector(
    (state: RootState) => state?.expenses
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleSaveExpense = (expense: ExpenseFormType) => {
    dispatch(createExpense(expense));
  };

  useEffect(() => {
    setShowAlert(alert.show);
  }, [alert]);

  const handleClose = () => {
    setShowAlert(false);
  };

  const tableRows = () => {
    return expenses?.map((expense: Expense, index: number) => {
      return (
        <TableRow key={index}>
          <TableCell>{expense.title}</TableCell>
          <TableCell>{expense.description}</TableCell>
          <TableCell>{expense.amount}</TableCell>
          <TableCell>{expense.date}</TableCell>
          <TableCell>
            <Chip size="sm" variant="flat" color={'success'}>
              <span className="capitalize text-xs">{expense.type}</span>
            </Chip>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-4 ">
              <div>
                <Tooltip content="Details">
                  <button
                    onClick={() => console.log('View expense', expense._id)}
                  >
                    <EyeIcon size={20} fill="#979797" />
                  </button>
                </Tooltip>
              </div>
              <div>
                <Tooltip content="Edit user" color="secondary">
                  <button
                    onClick={() => console.log('Edit expense', expense._id)}
                  >
                    <EditIcon size={20} fill="#979797" />
                  </button>
                </Tooltip>
              </div>
              <div>
                <Tooltip
                  content="Delete user"
                  color="danger"
                  onClick={() => console.log('Delete expense', expense._id)}
                >
                  <button>
                    <DeleteIcon size={20} fill="#FF0080" />
                  </button>
                </Tooltip>
              </div>
            </div>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={'/'}>
            <span>Home</span>
          </Link>
          <span> / </span>{' '}
        </li>

        <li className="flex gap-2">
          <PaymentsIcon />
          <span>Expences</span>
          <span> / </span>{' '}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Expences</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: 'w-full',
              mainWrapper: 'w-full',
            }}
            placeholder="Search expences"
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddExpence handleSaveExpense={handleSaveExpense} />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {showAlert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={handleClose}
          />
        )}
        <TableWrapper columns={columns} rows={tableRows()} />
      </div>
    </div>
  );
};
