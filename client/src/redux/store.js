import { configureStore } from '@reduxjs/toolkit'
import expensesReducer from './reduxer'
import apiSlice from './apiSlice'

const store = configureStore({
  reducer: { expensesReducer, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store
