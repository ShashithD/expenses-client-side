'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getChartData } from '@/redux/slices/expenses-reducer';
import { Statistics } from '@/components/statistics';
import Loader from '@/components/loader/Loader';
import WithAuth from '@/app/with-auth';

const StatisticsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { chartLoading } = useSelector((state: RootState) => state?.expenses);

  useEffect(() => {
    dispatch(getChartData());
  }, []);

  return (
    <WithAuth>
      {chartLoading && <Loader />}
      <Statistics />
    </WithAuth>
  );
};

export default StatisticsPage;
