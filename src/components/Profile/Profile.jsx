import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useSelector } from "react-redux";

const Profile = () => {
  const nameRef = useRef();
  const urlRef = useRef();
  const token = useSelector((state) => state.auth.token);

  const [getName, setGetName] = useState("");
  const [getPhoto, setPhoto] = useState("");
  fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC5RfB2zeAPwPIykibRKYnL7KdPnkq49Bw",
    {
      method: "POST",
      body: JSON.stringify({ idToken: token }),
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
      setGetName(data.users[0].displayName);
      setPhoto(data.users[0].photoUrl);
    })
    .catch((err) => {
      console.log(err.message);
    });

  console.log(getName, getPhoto);
  const submitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const url = urlRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC5RfB2zeAPwPIykibRKYnL7KdPnkq49Bw",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
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
          <input type="text" ref={nameRef} defaultValue={getName} />
          <label>Photo Url:</label>
          <input type="url" ref={urlRef} defaultValue={getPhoto} />
          <br />
          <button className="btn">Update</button>
        </form>
      </div>
    </>
  );
};

export default Profile;
