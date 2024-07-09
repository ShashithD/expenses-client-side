'use client';

import { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
import Link from 'next/link';
import { HouseIcon } from '@/components/icons/breadcrumb/house-icon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getExpenses } from '@/redux/slices/expenses-reducer';
import PieChart from './chart';

export const Statistics = () => {
  const [showAlert, setShowAlert] = useState(false);

  const { alert } = useSelector((state: RootState) => state?.expenses);

  useEffect(() => {
    setShowAlert(alert.show);
  }, [alert]);

  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={'/'}>
            <span>Home</span>
          </Link>
          <span> / </span>{' '}
        </li>

        <li className="flex gap-2">
          <span>statistics</span>
          <span> / </span>{' '}
        </li>
        <li className="flex gap-2">
          <span>chart</span>
        </li>
      </ul>

      <div className="flex justify-between flex-wrap gap-4 items-center">
        <PieChart />
      </div>
      <div className="max-w-[95rem] mx-auto w-full"></div>
    </div>
  );
};
