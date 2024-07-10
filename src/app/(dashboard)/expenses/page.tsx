'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getExpenses } from '@/redux/slices/expenses-reducer';
import WithAuth from '@/app/with-auth';
import { Expenses } from '@/components/expenses';

const ExpensesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getExpenses());
  }, []);

  return (
    <WithAuth>
      <Expenses />
    </WithAuth>
  );
};

export default ExpensesPage;
