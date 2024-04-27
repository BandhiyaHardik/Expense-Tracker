import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../redux/reduxer';
import { useSelector } from 'react-redux';


const TransactionsHistoryJSX = ({ transactions, onDelete , name , color }) => (
  <div className="flex flex-col py-6 gap-3">
    <h1 className="py-4 font-bold text-xl">History</h1>
    {transactions.map((transaction) => (
      <div
      key={transaction._id}
      className="item flex justify-between bg-gray-100 py-2 rounded-r" 
      style={{ borderRight: `8px solid ${transaction.color}` }}
    >
        
        <div className="flex flex-col w-full ml-4">
          <span className="block">{transaction.name}</span>
          <span className="block text-gray-600">Amount: {transaction.amount}</span>
        </div>
        <button
          onClick={() => onDelete(transaction._id)}
          className="px-3 bg-red-500 rounded-lg text-white"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
);

const List = () => {
  const dispatch = useDispatch();
  const transactionsFromStore = useSelector((state) => state.expensesReducer.transactions);

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  return <TransactionsHistoryJSX transactions={transactionsFromStore} onDelete={handleDelete} />;
};

export default List;
