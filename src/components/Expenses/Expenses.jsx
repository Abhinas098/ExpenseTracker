import React, { useState } from "react";
import SingleExpense from "./SingleExpense";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");
  const initialState = () => {
    const value = "Food";
    return value;
  };
  const [category, setCategory] = useState(initialState);
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const expenseFormHandler = (e) => {
    e.preventDefault();
    const data = {
      amount: amount,
      desc: desc,
      category: category,
    };
    setExpenses((prevExp) => {
      let newExpense = [...prevExp];
      newExpense.push(data);
      return newExpense;
    });
    setAmount(0);
    setDesc("");
    setCategory(initialState);
  };
  return (
    <>
      <div className="form">
        <form onSubmit={expenseFormHandler}>
          <div className="allInput">
            <div className="form-input">
              <h5>Enter Amount</h5>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <h5>ADD DESCRIPTION</h5>
              <input
                type="text"
                value={desc}
                placeholder="Enter description"
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
            <div>
              <h5>ADD CATEGORY</h5>
              <select
                className="input"
                id="category"
                onChange={categoryHandler}
              >
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
              </select>
            </div>
          </div>

          <div>
            <button className="btn">Add Expense</button>
          </div>
        </form>
      </div>

      <div className="form">
        {expenses.map((expense, index) => {
          return (
            <SingleExpense
              key={index}
              amount={expense.amount}
              desc={expense.desc}
              category={expense.category}
            />
          );
        })}
      </div>
    </>
  );
};

export default Expenses;
