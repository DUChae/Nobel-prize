import React, { useEffect, useState } from "react";
import "./RecentLaureates.css";

function RecentLaureates() {
  const [laureates, setLaureates] = useState([]);

  useEffect(() => {
    fetch("https://api.nobelprize.org/2.1/nobelPrizes?limit=5&sort=desc")
      .then((response) => response.json())
      .then((data) => {
        const filteredLaureates = data.nobelPrizes.map((prize) => ({
          category: prize.category.en,
          year: prize.awardYear,
          motivation: prize.laureates.map((laureate) =>
            laureate.motivation.en.length > 100
              ? `${laureate.motivation.en.slice(0, 100)}...`
              : laureate.motivation.en
          ),
          // 단체의 경우 orgName 필드에서 가져오도록 설정
          name: prize.laureates.map(
            (laureate) =>
              laureate.knownName?.en ||
              `${laureate.firstname || ""} ${laureate.surname || ""}`.trim() ||
              laureate.orgName?.en
          ),
        }));
        setLaureates(filteredLaureates);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="recent-laureates-container">
      <h2>Notable laureates' works</h2>
      <ul className="laureate-list">
        {laureates.map((laureate, index) => (
          <li key={index} className="laureate-card">
            <h3 className="laureate-name">{laureate.name.join(", ")}</h3>
            <p className="laureate-category">Category: {laureate.category}</p>
            <p className="laureate-year">Year: {laureate.year}</p>
            <p className="laureate-motivation">
              Motivation: {laureate.motivation.join(" | ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentLaureates;
