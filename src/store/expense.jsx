import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  amount: 0,
  description: "",
  category: "food",
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpenses(state, action) {
      state.expenses.push(action.payload);
    },
    addAmount(state, action) {
      state.amount = action.payload;
    },
    addDesc(state, action) {
      state.description = action.payload;
    },
    addCategory(state, action) {
      state.category = action.payload;
    },
  },
});
export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
