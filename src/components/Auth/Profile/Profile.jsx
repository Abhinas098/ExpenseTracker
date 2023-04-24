import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import AuthContext from "../../../store/AuthContext";

const Profile = () => {
  const nameRef = useRef();
  const urlRef = useRef();
  const ctx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const url = urlRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC5RfB2zeAPwPIykibRKYnL7KdPnkq49Bw",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
          displayName: name,
          photoUrl: url,
          returnSecureToken: true,
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
      <header>
        <h3>
          <i>Winner never quite, Quiters never Win</i>
          <i style={{ float: "right" }}>
            Your profile is 65% complete <Link to="#">Complete now 100%</Link>
          </i>
        </h3>
      </header>
      <div className="detail">
        <form onSubmit={submitHandler} className="pro">
          <h2>Contact Details</h2>
          <label>Full Name:</label>
          <input type="text" ref={nameRef} />
          <label>Photo Url:</label>
          <input type="url" ref={urlRef} />
          <br />
          <button className="btn">Update</button>
        </form>
      </div>
    </>
  );
};

export default Profile;
