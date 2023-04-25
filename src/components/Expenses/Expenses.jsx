import React, { useState, useEffect } from "react";
import SingleExpense from "./SingleExpense";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const initialState = () => {
    const value = "Food";
    return value;
  };
  const [category, setCategory] = useState(initialState);
  const email = localStorage.getItem("email");
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const getExpenses = () => {
    fetch(
      `https://expense-tracker-864ea-default-rtdb.firebaseio.com/${email}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res) {
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMsg = "Authotication Failed";
            if (data && data.error && data.error.message) {
              errorMsg = data.error.message;
            }
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        let arr = [];
        for (let key in data) {
          arr.push({
            id: key,
            desc: data[key].desc,
            amount: data[key].amount,
            category: data[key].category,
          });
        }
        setExpenses(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const expenseFormHandler = (e) => {
    e.preventDefault();
    if (isEdit === true) {
      //
      const data = {
        amount: amount,
        desc: desc,
        category: category,
      };
      fetch(
        `https://expense-tracker-864ea-default-rtdb.firebaseio.com/${email}/${expenseId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          console.log(res);
          getExpenses();
          setAmount(0);
          setDesc("");
          setCategory(initialState);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      const data = {
        amount: amount,
        desc: desc,
        category: category,
      };

      fetch(
        `https://expense-tracker-864ea-default-rtdb.firebaseio.com/${email}.json`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          console.log(res);
          setAmount(0);
          setDesc("");
          setCategory(initialState);
          getExpenses();
        })
        .catch((err) => {
          alert(err);
        });
    }

    setExpenses((prevExp) => {
      let newExpense = [...prevExp];
      newExpense.push(expenses);
      return newExpense;
    });
  };

  const editHandler = (id) => {
    let editExpense = expenses.filter((expense) => {
      return expense.id === id;
    });
    setEdit(true);
    setExpenseId(id);
    setAmount(editExpense[0].amount);
    setDesc(editExpense[0].desc);
    setCategory(editExpense[0].category);
    console.log(editExpense);
  };

  const deleteHandler = (id) => {
    fetch(
      `https://expense-tracker-864ea-default-rtdb.firebaseio.com/${email}/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        getExpenses();
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getExpenses();
    console.log(expenses);
  }, []);
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
                value={category}
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
              id={expense.id}
              key={index}
              amount={expense.amount}
              desc={expense.desc}
              category={expense.category}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
            />
          );
        })}
      </div>
    </>
  );
};

export default Expenses;
