'use client';

import { useEffect } from 'react';
import { Expenses } from '@/components/expenses';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getExpenses } from '@/redux/slices/expenses-reducer';
import WithAuth from '@/app/with-auth';

const ExpensesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getExpenses());
  }, []);

  console.log('accessToken')

  return <WithAuth><Expenses /></WithAuth>;
};

export default ExpensesPage;
