import React from "react";
import { Link } from "react-router-dom";
import "./Fields.css";
import medicine from "./images/medicine.jpg";
import physics from "./images/physics.jpg";
import chemistry from "./images/chemistry.jpg";
import peaceImage from "./images/peace.jpg";
import literature from "./images/literature.jpg";
import economics from "./images/economics.jpg";

function Fields() {
  const categories = [
    { name: "medicine", src: medicine, large: true },
    { name: "peace", src: peaceImage, large: true },
    { name: "physics", src: physics, large: false, combined: true },
    { name: "literature", src: literature, large: false, combined: true },
    { name: "chemistry", src: chemistry, large: false, combined: true },
    { name: "economics", src: economics, large: false, combined: true },
  ];

  return (
    <div className="fields-container">
      <h2>Fields of Excellence</h2>
      <div className="fields-grid">
        {categories.map((cat) => (
          <Link
            to={`/category/${cat.name}`}
            key={cat.name}
            className={`field-card ${cat.large ? "large" : "small"} ${
              cat.combined ? "combined" : ""
            }`}
          >
            <div
              className="card-content"
              style={{ backgroundImage: `url(${cat.src})` }}
            >
              <span className="field-title">{cat.name.toUpperCase()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Fields;
