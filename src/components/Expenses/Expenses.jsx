import React, { useState, useEffect, useCallback } from "react";
import SingleExpense from "./SingleExpense";
import { useDispatch } from "react-redux";
import { expenseAction } from "../../store/expense";
import { CSVLink } from "react-csv";
// import { CSVLink } from "react-csv";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const [csvData, setCsv] = useState("No Data");

  const initialState = () => {
    const value = "Food";
    return value;
  };
  const [category, setCategory] = useState(initialState);

  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const getExpenses = useCallback(() => {
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
        setCsv(arr);
        setExpenses(arr);
        localStorage.setItem("allExpense", JSON.stringify(arr));
        dispatch(expenseAction.addExpenses(expenses));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, email, expenses]);

  const expenseFormHandler = (e) => {
    e.preventDefault();
    if (isEdit === true) {
      //
      const data = {
        amount: amount,
        desc: desc,
        category: category,
      };
      dispatch(expenseAction.addAmount(amount));
      dispatch(expenseAction.addDesc(desc));
      dispatch(expenseAction.addCategory(category));
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

      dispatch(expenseAction.addAmount(amount));
      dispatch(expenseAction.addDesc(desc));
      dispatch(expenseAction.addCategory(category));

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
  }, [getExpenses]);

  let header = [
    {
      label: "Amount",
      key: "amount",
    },
    {
      label: "Description",
      key: "desc",
    },
    {
      label: "Category",
      key: "category",
    },
  ];
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
        <CSVLink data={csvData} headers={header} filename="likun.csv">
          Download Csv
        </CSVLink>
      </div>
    </>
  );
};

export default Expenses;
