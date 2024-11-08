// CategoryResults.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CategoryResults() {
  const { category } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryResults = async () => {
      try {
        const response = await fetch(
          `https://api.nobelprize.org/v1/prize.json?category=${category}&sort=desc`
        );
        const data = await response.json();
        console.log(data); // 데이터 확인용
        setResults(data.prizes || []); // 응답 데이터에서 'prizes' 배열 설정
      } catch (error) {
        console.error("Error fetching category results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryResults();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (results.length === 0) {
    return <div>No results found for {category}</div>;
  }

  return (
    <div>
      <h2>{category.toUpperCase()} Nobel Prizes</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <h3>Year: {result.year}</h3>
            {result.laureates ? (
              result.laureates.map((laureate, idx) => (
                <div key={idx}>
                  <p>
                    Name: {laureate.firstname} {laureate.surname}
                  </p>
                  <p>
                    Motivation:{" "}
                    {laureate.motivation?.en || "No motivation provided"}
                  </p>
                </div>
              ))
            ) : (
              <p>No laureates found for this prize.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryResults;
