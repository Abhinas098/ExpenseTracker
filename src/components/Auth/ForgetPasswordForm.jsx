import React, { useRef } from "react";
import { Link } from "react-router-dom";

const ForgetPasswordForm = () => {
  const emailRef = useRef();

  const sendLink = (e) => {
    e.preventDefault();
    const registeredMail = emailRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC5RfB2zeAPwPIykibRKYnL7KdPnkq49Bw",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: registeredMail,
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
      <form onSubmit={sendLink} className="form">
        <h2>Forgot Password</h2>
        <i>Enter your registered email to reset your password.</i>
        <div className="form-body">
          <input type="email" id="email" placeholder="Enter Registered Email" ref={emailRef} />
        </div>
        <button type="submit" className="btn">
          Send link
        </button>
        <p>
          Already a user? <Link to="/login">login</Link>
        </p>
      </form>
    </>
  );
};

export default ForgetPasswordForm;
