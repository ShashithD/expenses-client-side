'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { CardBalance1 } from './card-balance1';
import Alert from '../Alert/alert';
import { alertPercentage, maxTotalPerMonth } from '@/config/config';
import { resetAlert } from '@/redux/slices/expenses-reducer';

export const Content = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const { monthlyTotal } = useSelector((state: RootState) => state?.expenses);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const currentPercentage = (monthlyTotal / maxTotalPerMonth) * 100;

    setShowAlert(currentPercentage > alertPercentage);
    setPercentage(currentPercentage);
  }, [monthlyTotal]);

  const handleCloseAlert = () => {
    dispatch(resetAlert());
  };

  return (
    <div className="h-full lg:px-6">
      <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 gap-6 flex flex-col w-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Expenses</h3>
            {showAlert && (
              <Alert
                type={'error'}
                message={`You have reached ${percentage}% of monlthy expense limit`}
                onClose={handleCloseAlert}
              />
            )}
            <Link href="/expenses">
              <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
                <CardBalance1 monthlyTotal={monthlyTotal} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
