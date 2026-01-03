import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./CategoryDetails.css";

// --- 타입 정의 ---
interface Laureate {
  id: string;
  firstname: string;
  surname?: string;
  motivation?: string;
}

// 상세 정보 전용 인터페이스 (any 에러 해결)
interface LaureateDetailData {
  born: string;
  bornCity?: string;
  bornCountry?: string;
  died: string;
  diedCity?: string;
  diedCountry?: string;
  gender: string;
  affiliations: Array<{ name: string; city: string; country: string }>;
}

interface Prize {
  year: string;
  category: string;
  laureates?: Laureate[];
}

interface NobelResponse {
  prizes: Prize[];
}

// --- 개별 수상자 항목 컴포넌트 ---
const LaureateItem = ({ laureate }: { laureate: Laureate }) => {
  const [details, setDetails] = useState<LaureateDetailData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "0000-00-00") return null;
    const [year, month, day] = dateString.split("-");
    if (month === "00" && day === "00") return `${year}년`;
    if (day === "00") return `${year}년 ${parseInt(month)}월`;
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
  };

  const toggleDetails = async () => {
    if (!isOpen && !details) {
      setLoadingDetails(true);
      try {
        const res = await fetch(
          `https://api.nobelprize.org/v1/laureate.json?id=${laureate.id}`
        );
        const data = await res.json();
        setDetails(data.laureates[0]);
      } catch {
        console.error("상세 정보 로드 실패");
      } finally {
        setLoadingDetails(false);
      }
    }
    setIsOpen(!isOpen);
  };

  const affiliation = details?.affiliations?.[0]?.name;
  const hasValidAffiliation =
    affiliation &&
    affiliation !== "no affiliation" &&
    affiliation !== "None" &&
    affiliation.trim() !== "";

  return (
    <div className="laureate-item-container">
      <h3 className="laureate-name-apple" onClick={toggleDetails}>
        {laureate.firstname} {laureate.surname || ""}
        <span className={`expand-icon ${isOpen ? "open" : ""}`}>+</span>
      </h3>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="laureate-bio-box"
          >
            {loadingDetails ? (
              <p className="loading-bio">상세 정보 로딩 중...</p>
            ) : details ? (
              <div className="bio-content">
                {formatDate(details.born) && (
                  <p>
                    📍 <strong>출생:</strong> {formatDate(details.born)}{" "}
                    {details.bornCity &&
                      `(${details.bornCity}, ${details.bornCountry})`}
                  </p>
                )}
                {details.died &&
                  details.died !== "0000-00-00" &&
                  formatDate(details.died) && (
                    <p>
                      ⚰️ <strong>서거:</strong> {formatDate(details.died)}{" "}
                      {details.diedCity &&
                        `(${details.diedCity}, ${details.diedCountry})`}
                    </p>
                  )}
                {hasValidAffiliation && (
                  <p>
                    🏛️ <strong>소속:</strong> {affiliation}
                  </p>
                )}
                {details.gender && (
                  <p>
                    👤 <strong>성별:</strong>{" "}
                    {details.gender === "male" ? "남성" : "여성"}
                  </p>
                )}
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 메인 컴포넌트 ---
const CategoryDetails = () => {
  const { category } = useParams<{ category: string }>();
  const [winners, setWinners] = useState<Prize[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [translations, setTranslations] = useState<Record<string, string>>({});

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
        if (!response.ok)
          throw new Error(`HTTP ${response.status}: Failed to fetch`);
        const data: NobelResponse = await response.json();
        setWinners(data.prizes || []);
        translateAllMotivations(data.prizes || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, [category]);

  const translateAllMotivations = async (prizes: Prize[]) => {
    const uniqueMotivations = Array.from(
      new Set(
        prizes.flatMap((p) =>
          p.laureates?.map((l) => l.motivation).filter(Boolean)
        )
      )
    ) as string[];

    for (const text of uniqueMotivations) {
      try {
        const res = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t&q=${encodeURIComponent(
            text
          )}`
        );
        const data = await res.json();
        setTranslations((prev) => ({ ...prev, [text]: data[0][0][0] }));
      } catch {
        // 번역 실패 시 조용히 넘어감
      }
    }
  };

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
          const rawMotivation = prize.laureates?.[0]?.motivation || "";
          const translatedMotivation = translations[rawMotivation];

          return (
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
                  {prize.laureates?.map((laureate: Laureate) => (
                    <LaureateItem key={laureate.id} laureate={laureate} />
                  ))}
                </div>

                {rawMotivation && (
                  <div className="motivation-box-apple">
                    <p className="motivation-text-kr">
                      {translatedMotivation ? (
                        translatedMotivation.replace(/"/g, "")
                      ) : (
                        <span className="translating">업적 번역 중...</span>
                      )}
                    </p>
                    <p className="motivation-text-en">
                      {rawMotivation.replace(/"/g, "")}
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
