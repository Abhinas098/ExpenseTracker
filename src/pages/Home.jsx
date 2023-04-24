import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import AuthContext from "../store/AuthContext";

const Home = () => {
  const ctx = useContext(AuthContext);

  const emailHandler = (e) => {
    e.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC5RfB2zeAPwPIykibRKYnL7KdPnkq49Bw",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: ctx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
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
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <header className="header">
        <h3 className="expense">Well-Come to ExpenseTracker</h3>
        <h3 className="profile">
          Your profile is incomplete <Link to="Profile">Complete now</Link>
        </h3>
        <br />
      </header>
      <div className="verify">
        <h2>Verify your email </h2>
        <button className="bt" onClick={emailHandler}>
          Verify E-mail
        </button>
      </div>
    </>
  );
};

export default Home;
