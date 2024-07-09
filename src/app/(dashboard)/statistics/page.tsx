'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getChartData } from '@/redux/slices/expenses-reducer';
import { Statistics } from '@/components/statistics';

const StatisticsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getChartData());
  }, []);

  return <Statistics />;
};

export default StatisticsPage;
