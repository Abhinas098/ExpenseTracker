import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      <header className="header">
        <h3 className="expense">Well-Come to ExpenseTracker</h3>
        <h3 className="profile">
          Your profile is incomplete <Link to="Profile">Complete now</Link>
        </h3>
      </header>
    </>
  );
};

export default Home;
