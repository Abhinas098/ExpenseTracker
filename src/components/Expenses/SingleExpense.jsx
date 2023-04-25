import React from "react";

const SingleExpense = (props) => {
  return (
    <div>
      <li>
        <i>
          {props.desc}-{props.amount}-{props.category}-
        </i>
        <button onClick={() => props.editHandler(props.id)} className="btn">
          Edit
        </button>
        <button onClick={() => props.deleteHandler(props.id)} className="btn">
          Delete
        </button>
      </li>
    </div>
  );
};

export default SingleExpense;
