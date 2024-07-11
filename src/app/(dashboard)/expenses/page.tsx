'use client';

import WithAuth from '@/app/with-auth';
import { Expenses } from '@/components/expenses';
import Loader from '@/components/loader/Loader';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const ExpensesPage = () => {
  const { expensesLoading } = useSelector(
    (state: RootState) => state?.expenses
  );

  return (
    <WithAuth>
      {expensesLoading && <Loader />}
      <Expenses />
    </WithAuth>
  );
};

export default ExpensesPage;
