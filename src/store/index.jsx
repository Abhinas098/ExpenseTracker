import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import expenseReducer from "./expense";

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer },
});

export default store;
