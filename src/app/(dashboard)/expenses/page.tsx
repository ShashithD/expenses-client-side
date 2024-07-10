'use client';

import WithAuth from '@/app/with-auth';
import { Expenses } from '@/components/expenses';

const ExpensesPage = () => {

  return (
    <WithAuth>
      <Expenses />
    </WithAuth>
  );
};

export default ExpensesPage;
