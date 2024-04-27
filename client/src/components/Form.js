import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import apiSlice from '../redux/apiSlice'; // Import the apiSlice
import { addTransactionsToStore } from '../redux/reduxer'; // Import the action to add transactions to the store
import List from './List';
import { useSelector } from 'react-redux';

export default function Form() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  // Retrieve transactions from the Redux store
  const transactionsFromStore = useSelector((state) => state.expensesReducer.transactions);

  // Create a mutation for adding transactions
  const [addTransaction] = apiSlice.useAddTransactionMutation();

  const onSubmit = async (data) => {
    if (!data) return;

    // Add the new transaction
    const response = await addTransaction(data).unwrap();

    // Reset the form
    reset();

    // Update the transactions in the Redux store with the new data
    dispatch(addTransactionsToStore([...transactionsFromStore, response]));
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input type="text" {...register('name')} placeholder='Salary, House Rent, SIP' className='form-input' />
          </div>
          <select className='form-input' {...register('type')}>
            <option value="Investment" defaultValue>Investment</option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input type="text" {...register('amount')} placeholder='Amount' className='form-input' />
          </div>
          <div className="submit-btn">
            <button className='border py-2 text-white bg-indigo-500 w-full'>Make Transaction</button>
          </div>
        </div>
      </form>
      <List />
    </div>
  );
}
