import React, { useEffect, useState } from "react";

function RecentLaureates() {
  const [laureates, setLaureates] = useState([]);

  useEffect(() => {
    // 최신 수상자 API 호출
    fetch("https://api.nobelprize.org/2.1/nobelPrizes?limit=5&sort=desc")
      .then((response) => response.json())
      .then((data) => {
        // 필요한 데이터만 필터링하여 설정
        const filteredLaureates = data.nobelPrizes.map((prize) => ({
          category: prize.category.en,
          year: prize.awardYear,
          motivation: prize.laureates.map((laureate) => laureate.motivation.en),
          name: prize.laureates.map((laureate) => laureate.knownName?.en),
        }));
        setLaureates(filteredLaureates);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Recent Laureates</h2>
      <ul>
        {laureates.map((laureate, index) => (
          <li key={index}>
            <h3>{laureate.name}</h3>
            <p>Category: {laureate.category}</p>
            <p>Year: {laureate.year}</p>
            <p>Motivation: {laureate.motivation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentLaureates;
