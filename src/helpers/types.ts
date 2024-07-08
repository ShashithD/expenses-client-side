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

export type ExpenseType = 'Food' | 'Transport' | 'Utilities' | 'Healthcare';

export type ExpenseFormType = {
  title: string;
  description: string;
  amount: number;
  date: string | null;
  type: ExpenseType | null;
};
