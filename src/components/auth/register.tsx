'use client';

import { useCallback, useState, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@nextui-org/react';
import { RegisterSchema } from '@/helpers/schemas';
import { RegisterFormType } from '@/helpers/types';
import { AppDispatch, RootState } from '@/redux/store';
import { signUp } from '@/redux/slices/auth-reducer';
import Alert from '../Alert/alert';
import { resetAlert } from '@/redux/slices/expenses-reducer';

export const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [showAlert, setShowAlert] = useState(false);

  const { alert } = useSelector((state: RootState) => state?.auth);

  const initialValues: RegisterFormType = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleRegister = useCallback(
    async (values: RegisterFormType) => {
      try {
        const actionResult = await dispatch(signUp(values));

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
      <div className="text-center text-[25px] font-bold mb-6">Register</div>
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
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
              <Input
                variant="bordered"
                label="Name"
                value={values.name}
                isInvalid={!!errors.name && !!touched.name}
                errorMessage={errors.name}
                onChange={handleChange('name')}
              />
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
              <Input
                variant="bordered"
                label="Confirm password"
                type="password"
                value={values.confirmPassword}
                isInvalid={
                  !!errors.confirmPassword && !!touched.confirmPassword
                }
                errorMessage={errors.confirmPassword}
                onChange={handleChange('confirmPassword')}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
            >
              Register
            </Button>
          </>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm">
        Already have an account ?{' '}
        <Link href="/login" className="font-bold">
          Login here
        </Link>
      </div>
    </>
  );
};
