import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { default as api } from '../redux/apiSlice';
import { addCategoriesToStore, addTransactionsToStore } from '../redux/reduxer';

const LableComponentJSX = ({ type, color , percent }) => (
  <div className='labels flex justify-between'>
    <div className='flex gap-2'>
      <div className='w-2 h-2 rounded py-3' style={{ backgroundColor: `${color}` }}></div>
      <h3 className='text-lg'>{type}</h3>
    </div>
    <h3 className='font-bold'>{percent}</h3>
  </div>
);

const Label = () => {
  const dispatch = useDispatch();
  const { transactions: transactionsFromStore } = useSelector(state => state.expensesReducer);

  const { data: categories } = api.useGetCategoriesQuery();
  const { data: transactions } = api.useGetTransactionsQuery();

  useEffect(() => {
    if (categories) {
      dispatch(addCategoriesToStore(categories));
    }
  }, [categories, dispatch]);

  useEffect(() => {
    if (transactions) {
      dispatch(addTransactionsToStore(transactions));
    }
  }, [transactions, dispatch]);

  // Calculate the total amount for each category
  const categoryTotals = {};
  transactionsFromStore.forEach(transaction => {
    const { categoryId, amount } = transaction;
    categoryTotals[categoryId] = (categoryTotals[categoryId] || 0) + amount;
  });

  // Calculate the percentage for each transaction and store it in a map
  const transactionPercentages = {};
  transactionsFromStore.forEach(transaction => {
    const { categoryId, amount } = transaction;
    const totalAmount = categoryTotals[categoryId];
    const percentage = totalAmount ? ((amount / totalAmount) * 100).toFixed(2) + '%' : '0%';
    transactionPercentages[transaction._id] = percentage;
  });

  return (
    <>
      {transactionsFromStore.map(label => (
        <LableComponentJSX
          key={Math.random()} // TODO: Apply proper key later
          type={label.type}
          percent={transactionPercentages[label._id] || '0%'} // Get the percentage from the map
        />
      ))}
    </>
  );
};

export default Label;
