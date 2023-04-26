import React from "react";

const SingleExpense = (props) => {
  return (
    <div>
      <li>
        <i>
          {props.category}-{props.amount}-{props.desc}-
        </i>
        <button onClick={() => props.editHandler(props.id)} className="btn">
          Edit
        </button>
        <button onClick={() => props.deleteHandler(props.id)} className="btn">
          Delete
        </button>
        {props.amount > 100 && <button>Active Primium</button>}
      </li>
    </div>
  );
};

export default SingleExpense;
