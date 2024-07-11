'use client';

import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { Content } from '@/components/home/content';
import WithAuth from '@/app/with-auth';
import { useEffect } from 'react';
import { getTotalExpensesForCurrentMonth } from '@/redux/slices/expenses-reducer';
import Loader from '@/components/loader/Loader';

const Home: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state?.expenses);

  useEffect(() => {
    dispatch(getTotalExpensesForCurrentMonth());
  }, []);

  return (
    <WithAuth>
      {loading && <Loader />}
      <Content />
    </WithAuth>
  );
};

export default Home;
