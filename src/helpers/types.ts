export type LoginFormType = {
  email: string;
  password: string;
};

export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ExpenseType =
  | 'Food'
  | 'Transport'
  | 'Utilities'
  | 'Subscriptions'
  | 'Entertainment'
  | 'Other';

export type ExpenseFormType = {
  title: string;
  description: string;
  amount: number;
  date: string;
  type: ExpenseType | null;
};

export interface Expense {
  _id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: ExpenseType | null;
}
