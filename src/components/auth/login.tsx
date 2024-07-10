'use client';

import { useCallback, useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import Link from 'next/link';
import { signIn } from '@/redux/slices/auth-reducer';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@nextui-org/react';
import { LoginSchema } from '@/helpers/schemas';
import { LoginFormType } from '@/helpers/types';
import { AppDispatch, RootState } from '@/redux/store';
import Alert from '../Alert/alert';
import { resetAlert } from '@/redux/slices/expenses-reducer';

export const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [showAlert, setShowAlert] = useState(false);

  const { alert } = useSelector((state: RootState) => state?.auth);

  const initialValues: LoginFormType = {
    email: 'admin@acme.com',
    password: 'admin',
  };

  useEffect(() => {
    const accessToken =
      typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;

    if (accessToken) {
      router.replace('/');
    }
  }, [router]);

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      try {
        const actionResult = await dispatch(signIn(values));

        unwrapResult(actionResult);

        router.replace('/');
      } catch (error) {
        console.error('Signup failed:', error);
      }
    },
    [dispatch, router]
  );

  const handleCloseAlert = () => {
    dispatch(resetAlert());
  };

  useEffect(() => {
    setShowAlert(alert.show);
  }, [alert]);

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6">Login</div>
      {showAlert && (
        <div className="flex flex-col w-1/2 gap-4 mb-4">
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={handleCloseAlert}
          />
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
              <Input
                variant="bordered"
                label="Email"
                type="email"
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange('email')}
              />
              <Input
                variant="bordered"
                label="Password"
                type="password"
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange('password')}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
            >
              Login
            </Button>
          </>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm">
        Don&apos;t have an account ?{' '}
        <Link href="/register" className="font-bold">
          Register here
        </Link>
      </div>
    </>
  );
};
