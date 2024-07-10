'use client';

import type { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { Content } from '@/components/home/content';
import WithAuth from '@/app/with-auth';
import { useEffect } from 'react';
import { getTotalExpensesForCurrentMonth } from '@/redux/slices/expenses-reducer';

const Home: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTotalExpensesForCurrentMonth());
  }, []);

  return (
    <WithAuth>
      <Content />
    </WithAuth>
  );
};

export default Home;
