// src/CategoryDetails.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CategoryDetails.css";

// API 응답 구조 정확히 정의
interface Laureate {
  id: string;
  firstname: string;
  surname?: string;
  motivation?: string;
}

interface Prize {
  year: string;
  category: string;
  laureates?: Laureate[];
}

interface NobelResponse {
  prizes: Prize[];
}

const CategoryDetails = () => {
  // URL 파라미터 타입 명시
  const { category } = useParams<{ category: string }>();

  // 상태 타입 정의
  const [winners, setWinners] = useState<Prize[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // category 없으면 조기 리턴
    if (!category) {
      setError("Category is not selected.");
      setLoading(false);
      return;
    }

    const fetchWinners = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.nobelprize.org/v1/prize.json?category=${category}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to fetch`);
        }

        const data: NobelResponse = await response.json();
        setWinners(data.prizes || []);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Network error";
        console.error("Fetch error:", err);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, [category]);

  // 로딩 상태
  if (loading) {
    return <div className="loading">Loading winners...</div>;
  }

  // 에러 상태
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // 카테고리 없음
  if (!category) {
    return <div>Invalid category.</div>;
  }

  return (
    <section className="category-details">
      <h2>
        {category.charAt(0).toUpperCase() + category.slice(1)} Nobel Laureates
      </h2>

      {winners.length === 0 ? (
        <p>No winners found for this category.</p>
      ) : (
        <ul className="prize-list">
          {winners.map((prize) => (
            // prize.year는 고유 → key로 사용
            <li key={prize.year} className="prize-item">
              <h3>{prize.year}</h3>
              {prize.laureates && prize.laureates.length > 0 ? (
                <ul className="laureates-list">
                  {prize.laureates.map((laureate) => (
                    <li key={laureate.id} className="laureate-item">
                      <div>
                        <strong>
                          {laureate.firstname} {laureate.surname || ""}
                        </strong>
                      </div>
                      {laureate.motivation && (
                        <p className="motivation">
                          <em>"{laureate.motivation}"</em>
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-laureates">
                  No laureates recorded for this prize.
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CategoryDetails;
