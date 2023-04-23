import React, { useRef, useState } from "react";
import "./RegistrationForm.css";
import { Link } from "react-router-dom";

function RegistrationForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [password, confirmPassword] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      confirmPassword(false);
    }
    console.log(enteredEmail, enteredPassword, enteredConfirmPassword);

    if (enteredPassword === enteredConfirmPassword) {
      setIsLoading(true);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5RfB2zeAPwPIykibRKYnL7KdPnkq49Bw",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        confirmPassword(true);
        confirmPassword("Sucessfull!");
        setIsLoading(false);
        if (res.ok) {
          console.log(res);
          //
        } else {
          res.json().then((data) => {
            let errorMsg = "Authotication Failed";
            if (data && data.error && data.error.message) {
              errorMsg = data.error.message;
            }
            confirmPassword(errorMsg);
          });
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Registration Form</h2>
      <div className="form-body">
        <div>
          <label className="form__label">Email </label>
          <input type="email" id="email" ref={emailRef} placeholder="Email" />
        </div>
        <div>
          <label className="form__label">Password </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="Password"
          />
        </div>
        <div>
          <label className="form__label">Confirm Password </label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
            placeholder="Confirm Password"
          />
          {!password && "Not Matched!"}
          {password}
        </div>
      </div>
      <div className="footer">
        <button type="submit" className="btn">
          Register
        </button>
        {isLoading && <p>Loading....</p>}
      </div>
      <p>
        Have an account? <Link to="/login">login</Link>
      </p>
    </form>
  );
}

export default RegistrationForm;
