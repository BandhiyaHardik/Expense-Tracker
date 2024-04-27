import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  transactions: [],
};

const expensesReducer = createSlice({
  name: 'expensesReducer',
  initialState,
  reducers: {
    addCategoriesToStore: (state, { payload }) => {
      state.categories = payload;
    },
    addTransactionsToStore: (state, { payload }) => {
      state.transactions = payload;
    },
    deleteTransaction: (state, { payload }) => {
      // Implement the logic to delete a transaction from state.transactions
      // You might want to filter the transactions array to exclude the deleted transaction
      state.transactions = state.transactions.filter((transaction) => transaction._id !== payload);
    },
  },
});

export default expensesReducer.reducer;
export const { addCategoriesToStore, addTransactionsToStore, deleteTransaction } = expensesReducer.actions;
