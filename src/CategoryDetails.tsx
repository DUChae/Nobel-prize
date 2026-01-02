import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion"; // 이제 설치했으니 사용 가능합니다!
import "./CategoryDetails.css";

// 1. 사라졌던 타입(Prize 등) 정의 추가
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
        setLoading(true); // 이제 사용됨 (Unused 에러 해결)
        setError(null); // 이제 사용됨 (Unused 에러 해결)

        const response = await fetch(
          `https://api.nobelprize.org/v1/prize.json?category=${category}`
        );

        if (!response.ok)
          throw new Error(`HTTP ${response.status}: Failed to fetch`);

        const data: NobelResponse = await response.json();
        setWinners(data.prizes || []); // 이제 사용됨 (Unused 에러 해결)
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Network error";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, [category]);

  if (loading)
    return (
      <div className="loading-state">
        <div className="spinner"></div>
      </div>
    );
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <section className="category-details-wrapper">
      <header className="category-header">
        <span className="eyebrow">Nobel Prize Archive</span>
        <h1 className="category-title">
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : ""}
        </h1>
        <p className="category-description">
          연도별 위대한 발견과 평화를 향한 여정입니다.
        </p>
      </header>

      <div className="prize-grid">
        {winners.map((prize, index) => {
          const motivation = prize.laureates?.[0]?.motivation;

          return (
            // 2. motion 사용 (motion is defined but never used 에러 해결)
            <motion.article
              key={`${prize.year}-${index}`}
              className="prize-card-apple"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 5) * 0.1 }}
            >
              <div className="prize-year">{prize.year}</div>

              <div className="prize-content">
                <div className="laureates-section">
                  {/* 3. laureate 타입 정의 (any 형식 에러 해결) */}
                  {prize.laureates?.map((laureate: Laureate) => (
                    <h3 key={laureate.id} className="laureate-name-apple">
                      {laureate.firstname} {laureate.surname || ""}
                    </h3>
                  ))}
                </div>

                {motivation && (
                  <div className="motivation-box-apple">
                    <p className="motivation-text">
                      {motivation.replace(/"/g, "")}
                    </p>
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryDetails;
