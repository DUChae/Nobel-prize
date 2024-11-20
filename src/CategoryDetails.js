import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CategoryDetails.css";

const CategoryDetails = () => {
  const { category } = useParams();
  const [winners, setWinners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) {
      setError("Category is not selected.");
      return;
    }

    const fetchWinners = async () => {
      try {
        const response = await fetch(
          `https://api.nobelprize.org/v1/prize.json?category=${category}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch winners");
        }
        const data = await response.json();
        setWinners(data.prizes);
      } catch (error) {
        console.error("Error fetching the winners:", error);
        setError("Failed to load winners. Please try again later.");
      }
    };

    fetchWinners();
  }, [category]);

  return (
    <div className="category-details">
      {error && <p className="error">{error}</p>}
      {category && !error && (
        <>
          <h2>
            {category.charAt(0).toUpperCase() + category.slice(1)} Winners
          </h2>
          <ul>
            {winners.length > 0 ? (
              winners.map((prize, index) => (
                <li key={index}>
                  <strong>{prize.year}:</strong>
                  {prize.laureates && prize.laureates.length > 0 ? (
                    <ul>
                      {prize.laureates.map((laureate) => (
                        <li key={laureate.id}>
                          <strong>Name:</strong>{" "}
                          {`${laureate.firstname} ${laureate.surname}`} <br />
                          <strong>Motivation:</strong>{" "}
                          {laureate.motivation || "No motivation available"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No laureates for this prize.</span>
                  )}
                </li>
              ))
            ) : (
              <p>No winners found for this category.</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default CategoryDetails;
