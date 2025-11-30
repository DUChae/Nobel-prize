import { useEffect, useState } from "react";
import "./RecentLaureates.css";

// 내가 사용하는 정보만 골라 만든 타입
interface LaureateInfo {
  category: string;
  year: string;
  motivation: string[];
  name: string[];
}

interface ApiLaureate {
  knownName?: { en: string };
  firstname?: string;
  surname?: string;
  motivation: { en: string };
  orgName?: { en: string };
}

interface ApiPrize {
  category: { en: string };
  awardYear: string;
  laureates: ApiLaureate[];
}

interface ApiResponse {
  nobelPrizes: ApiPrize[];
}

const RecentLaureates = () => {
  const [laureates, setLaureates] = useState<LaureateInfo[]>([]);

  useEffect(() => {
    fetch("https://api.nobelprize.org/2.1/nobelPrizes?limit=5&sort=desc")
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        const filteredLaureates: LaureateInfo[] = data.nobelPrizes.map(
          (prize) => ({
            category: prize.category.en,
            year: prize.awardYear,
            motivation: prize.laureates.map((laureate) =>
              laureate.motivation.en.length > 100
                ? `${laureate.motivation.en.slice(0, 100)}...`
                : laureate.motivation.en
            ),
            name: prize.laureates.map(
              (laureate) =>
                laureate.knownName?.en ||
                `${laureate.firstname || ""} ${
                  laureate.surname || ""
                }`.trim() ||
                laureate.orgName?.en ||
                "Unknown"
            ),
          })
        );

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
};

export default RecentLaureates;
