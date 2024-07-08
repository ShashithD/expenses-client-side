'use client';

import { useEffect } from 'react';
import { Expences } from '@/components/expences';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getExpenses } from '@/redux/slices/expenses-reducer';

const expences = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getExpenses());
  }, []);

  return <Expences />;
};

export default expences;
