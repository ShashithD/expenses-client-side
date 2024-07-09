'use client';

import { Statistics } from '@/components/statistics'
import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getChartData } from '@/redux/slices/expenses-reducer';

const statistics = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getChartData());
  }, []);

  return <Statistics />
}

export default statistics