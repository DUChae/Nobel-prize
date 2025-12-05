// src/CategoryDetails.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CategoryDetails.css";

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
  const { category } = useParams<{ category: string }>();

  const [winners, setWinners] = useState<Prize[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) return <div className="loading">Loading winners...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!category) return <div>Invalid category.</div>;

  return (
    <section className="category-details">
      <h2>
        {category.charAt(0).toUpperCase() + category.slice(1)} Nobel Laureates
      </h2>

      {winners.length === 0 ? (
        <p>No winners found for this category.</p>
      ) : (
        <ul className="prize-list">
          {winners.map((prize, index) => {
            const motivation =
              prize.laureates && prize.laureates.length > 0
                ? prize.laureates[0].motivation
                : null;

            return (
              <li key={`${prize.year}-${index}`} className="prize-item">
                {/* 1. 연도 */}
                <h2>{prize.year}</h2>

                <h3 className="section-title">Laureates</h3>
                {/* 2. 이름 목록 */}
                {prize.laureates && prize.laureates.length > 0 ? (
                  <ul className="laureates-list">
                    {prize.laureates.map((laureate) => (
                      <li key={laureate.id} className="laureate-item">
                        <strong>
                          {laureate.firstname} {laureate.surname || ""}
                        </strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-laureates">
                    No laureates recorded for this prize.
                  </p>
                )}

                {motivation && (
                  <>
                    <h4 className="section-title">Motivation</h4>
                    <p className="motivation">
                      <em>{motivation}</em>
                    </p>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default CategoryDetails;
