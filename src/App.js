import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./components/Auth/LoginForm";
import RegistrationForm from "./components/Auth/RegistrationForm";
import Profile from "./components/Profile/Profile";
import Layout from "./components/Layout/layout";
import ForgetPasswordForm from "./components/Auth/ForgetPasswordForm";
import Expenses from "./components/Expenses/Expenses";
import { useSelector } from "react-redux";

function App() {
  const isLogin = useSelector((state) => state.auth.isLoggedin);
  console.log(isLogin);
  return (
    <>
      <Layout>
        <Switch>
          {!isLogin && (
            <Route path="/" exact>
              <Redirect to="login" />
            </Route>
          )}

          {!isLogin && (
            <Route path="/login">
              <LoginForm />
            </Route>
          )}

          {!isLogin && (
            <Route path="/register">
              <RegistrationForm />
            </Route>
          )}
          {!isLogin && (
            <Route path="/forget">
              <ForgetPasswordForm />
            </Route>
          )}
          {isLogin && (
            <Route path="/home">
              <Home />
            </Route>
          )}
          <Route path="/profile">
            {isLogin && <Profile />}
            {!isLogin && <Redirect to="/login" />}
          </Route>
          {isLogin && (
            <Route path="/expense">
              <Expenses />
            </Route>
          )}

          {!isLogin && (
            <Route path="*">
              <Redirect to="/login" />
            </Route>
          )}
          {isLogin && (
            <Route path="*">
              <Redirect to="/home" />
            </Route>
          )}
        </Switch>
      </Layout>
    </>
  );
}

export default App;
