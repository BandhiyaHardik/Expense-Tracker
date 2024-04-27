import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURL = `${window.location.origin}/api`

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: builder => ({
    // get categories
    getCategories: builder.query({
      query: () => '/categories', // builder.query() by default uses GET method
    }),

    // get transactions
    getTransactions: builder.query({
      query: () => '/transaction', // builder.query() by default uses GET method
    }),

    // add new transaction
    addTransaction: builder.mutation({
      query: userInputValues => ({
        url: '/transaction', // URL should not use template literals
        method: 'POST',
        body: userInputValues,
      }),
    }),
    // ...
    deleteTransaction: builder.mutation({
      query: transactionID => ({
        url: `/transaction/${transactionID}`, // Correctly interpolate the transactionID
        method: 'DELETE',
      }),
    }),
  }),
})


export default apiSlice
