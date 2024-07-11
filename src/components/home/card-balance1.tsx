import { Card, CardBody } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { Community } from '../icons/community';
import { maxTotalPerMonth } from '@/config/config';

interface CardBalance1Props {
  monthlyTotal: number;
}

export const CardBalance1 = ({ monthlyTotal }: CardBalance1Props) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(Math.round((monthlyTotal / maxTotalPerMonth) * 100));
  }, [monthlyTotal]);

  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Total Expenses</span>
            <span className="text-white text-xs">Current Month</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">
            ${monthlyTotal}
          </span>
          <span className="text-white text-xs">
            {percentage}% of monthly total(${maxTotalPerMonth})
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="font-semibold text-success text-xs">{'↓'}</span>
              <span className="text-xs text-white">$0</span>
            </div>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{'↑'}</span>
              <span className="text-xs text-white">$0</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
