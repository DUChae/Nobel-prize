import React from "react";
import { Link } from "react-router-dom";

function Fields() {
  const categories = [
    "medicine",
    "physics",
    "chemistry",
    "peace",
    "literature",
    "economics",
  ];

  return (
    <div>
      <h2>Select Nobel Prize Category</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat}>
            <Link to={`/category/${cat}`}>{cat.toUpperCase()}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Fields;
