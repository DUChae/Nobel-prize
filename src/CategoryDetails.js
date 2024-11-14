import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryDetails = () => {
  const { category } = useParams(); // Get the category from the URL
  const [winners, setWinners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) {
      setError("Category is not selected.");
      return;
    }

    // Fetch the winners based on the selected category
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
    <div>
      {error && <p>{error}</p>}
      {category && !error && (
        <>
          <h2>
            {category.charAt(0).toUpperCase() + category.slice(1)} Winners
          </h2>
          <ul>
            {winners.length > 0 ? (
              winners.map((prize, index) => (
                <li key={index}>
                  {prize.year}:{" "}
                  {prize.laureates && prize.laureates.length > 0 ? (
                    prize.laureates
                      .map(
                        (laureate) =>
                          `${laureate.firstname} ${laureate.surname}`
                      )
                      .join(", ")
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
