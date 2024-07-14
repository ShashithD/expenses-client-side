'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
  TableRow,
  TableCell,
  Tooltip,
  Chip,
  DatePicker,
} from '@nextui-org/react';
import { parseDate } from '@internationalized/date';
import { HouseIcon } from '@/components/icons/breadcrumb/house-icon';
import { EditIcon } from '../icons/table/edit-icon';
import { DeleteIcon } from '../icons/table/delete-icon';
import { TableWrapper } from '@/components/table/table';
import { AddExpense } from './add-expense';
import { AppDispatch, RootState } from '@/redux/store';
import { Expense, ExpenseFormType } from '@/helpers/types';
import Alert from '../Alert/alert';
import { UpdateExpense } from './update-expense ';
import { formatDate } from '@/utils/utils';
import {
  createExpense,
  updateExpense,
  getExpenses,
  deleteExpense,
  resetAlert,
} from '@/redux/slices/expenses-reducer';

interface Column {
  name: string;
  uid: string;
  align?: 'center' | 'start' | 'end' | undefined;
}

export const columns: Column[] = [
  { name: 'Title', uid: 'title' },
  { name: 'Description', uid: 'role' },
  { name: 'Amount', uid: 'status', align: 'end' },
  { name: 'Date', uid: 'date', align: 'center' },
  { name: 'Type', uid: 'type' },
  { name: 'ACTIONS', uid: 'actions', align: 'center' },
];

function getFirstDayOfCurrentMonth() {
  const date = new Date();
  date.setDate(1);
  return date;
}

function getLastDayOfCurrentMonth() {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date;
}

export const Expenses = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [startDate, setStartDate] = useState(
    parseDate(getFirstDayOfCurrentMonth().toISOString().split('T')[0])
  );
  const [endDate, setEndDate] = useState(
    parseDate(getLastDayOfCurrentMonth().toISOString().split('T')[0])
  );

  const { expenses, alert } = useSelector(
    (state: RootState) => state?.expenses
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleGetExpenses = () => {
    dispatch(
      getExpenses({
        startDate: startDate.toString().split('T')[0],
        endDate: endDate.toString().split('T')[0],
      })
    );
  };

  useEffect(() => {
    handleGetExpenses();
  }, [startDate, endDate]);

  const handleSaveExpense = async (expense: ExpenseFormType) => {
    await dispatch(createExpense(expense));

    handleGetExpenses();
  };

  const handleClickEditExpense = (expense: Expense) => {
    setCurrentExpense(expense);
    setShowUpdateModal(true);
  };

  const handleEditExpense = async (expense: Expense) => {
    await dispatch(updateExpense(expense));

    handleGetExpenses();
  };

  const handleDeleteExpense = async (id: string) => {
    await dispatch(deleteExpense(id));

    handleGetExpenses();
  };

  useEffect(() => {
    setShowAlert(alert.show);
  }, [alert]);

  const handleCloseAlert = () => {
    dispatch(resetAlert());
  };

  const tableRows = () => {
    return expenses?.map((expense: Expense, index: number) => {
      return (
        <TableRow key={index}>
          <TableCell>{expense.title}</TableCell>
          <TableCell>{expense.description}</TableCell>
          <TableCell>${expense.amount}</TableCell>
          <TableCell>{formatDate(expense.date)}</TableCell>
          <TableCell>
            <Chip size="sm" variant="flat" color={'default'}>
              <span className="capitalize text-xs">{expense.type}</span>
            </Chip>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-4 ">
              <div>
                <Tooltip content="Edit expense" color="secondary">
                  <button onClick={() => handleClickEditExpense(expense)}>
                    <EditIcon size={20} fill="#979797" />
                  </button>
                </Tooltip>
              </div>
              <div>
                <Tooltip content="Delete expense" color="danger">
                  <button onClick={() => handleDeleteExpense(expense._id)}>
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
          <span>Expenses</span>
          <span> / </span>{' '}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Expenses List</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <DatePicker
            label="From date"
            className="max-w-[284px]"
            defaultValue={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <DatePicker
            label="To date"
            className="max-w-[284px]"
            defaultValue={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddExpense handleSaveExpense={handleSaveExpense} />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {showAlert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={handleCloseAlert}
          />
        )}
        <TableWrapper columns={columns} rows={tableRows()} />
        <UpdateExpense
          handleEditExpense={handleEditExpense}
          setShowUpdateModal={setShowUpdateModal}
          expense={currentExpense}
          isModalOpen={showUpdateModal}
        />
      </div>
    </div>
  );
};
