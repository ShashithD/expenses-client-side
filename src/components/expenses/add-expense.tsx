import { Formik } from 'formik';
import * as yup from 'yup';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { ExpenseFormType } from '@/helpers/types';

export enum ExpenseType {
  Food = 'Food',
  Rent = 'Rent',
  Transport = 'Transport',
  Utilities = 'Utilities',
  Subscriptions = 'Subscriptions',
  Entertainment = 'Entertainment',
  Other = 'Other',
}

const ExpenseValidationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  type: yup
    .string()
    .oneOf(Object.values(ExpenseType), 'Invalid expense type')
    .required('Expense type is required'),
  amount: yup
    .number()
    .positive('Amount must be positive')
    .required('Amount is required'),
  date: yup.date().required('Date is required'),
});

interface AddExpenseProps {
  handleSaveExpense: (expense: ExpenseFormType) => void;
}

export const AddExpense = ({ handleSaveExpense }: AddExpenseProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const initialValues: ExpenseFormType = {
    title: '',
    description: '',
    type: null,
    amount: 0.00,
    date: '',
  };

  const handleFormSubmit = (values: ExpenseFormType) => {
    handleSaveExpense(values);
    onOpenChange();
  };

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Add Expenses
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add Expense
                </ModalHeader>
                <ModalBody>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={ExpenseValidationSchema}
                    onSubmit={handleFormSubmit}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                    }) => (
                      <>
                        <select
                          name="type"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          value={values.type || ''}
                          onChange={handleChange}
                        >
                          <option value="">Choose an expense type</option>
                          {Object.values(ExpenseType).map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {errors.type && (
                          <small className="input-feedback text-red-500">
                            {errors.type}
                          </small>
                        )}
                        <Input
                          label="Title"
                          name="title"
                          variant="bordered"
                          value={values.title}
                          onChange={handleChange('title')}
                          isInvalid={!!errors.title && !!touched.title}
                          errorMessage={errors.title}
                        />
                        <Input
                          label="Description"
                          name="description"
                          variant="bordered"
                          value={values.description}
                          onChange={handleChange('description')}
                          isInvalid={
                            !!errors.description && !!touched.description
                          }
                          errorMessage={errors.description}
                        />
                        <Input
                          type="date"
                          label="Date"
                          variant="bordered"
                          value={values.date || ''}
                          onChange={handleChange('date')}
                          isInvalid={!!errors.date && !!touched.date}
                          errorMessage={errors.date}
                        />
                        <Input
                          type="number"
                          name="amount"
                          label="Amount"
                          value={values.amount.toString()}
                          placeholder="0.00"
                          onChange={handleChange('amount')}
                          isInvalid={!!errors.amount && !!touched.amount}
                          errorMessage={errors.amount}
                          labelPlacement="outside"
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                $
                              </span>
                            </div>
                          }
                        />
                        <Button color="primary" onPress={() => handleSubmit()}>
                          Add Expense
                        </Button>
                        <Button color="danger" variant="flat" onClick={onClose}>
                          Close
                        </Button>
                      </>
                    )}
                  </Formik>
                </ModalBody>
                <ModalFooter></ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
