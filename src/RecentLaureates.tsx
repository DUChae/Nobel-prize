import { useEffect, useState, useCallback } from "react";
import "./RecentLaureates.css";

// 1. 카테고리 매핑 데이터를 컴포넌트 외부로 이동 (useEffect 의존성 오류 해결)
const CATEGORY_MAP: Record<string, string> = {
  Physics: "물리학상",
  Chemistry: "화학상",
  "Physiology or Medicine": "생리의학상",
  Literature: "문학상",
  Peace: "평화상",
  "Economic Sciences": "경제학상",
};

interface ApiLaureate {
  knownName?: { en: string };
  firstname?: string;
  surname?: string;
  orgName?: { en: string };
  motivation?: { en: string };
}

interface ApiPrize {
  category: { en: string };
  awardYear: string;
  laureates: ApiLaureate[];
}

interface ApiResponse {
  nobelPrizes: ApiPrize[];
}

interface LaureateInfo {
  category: string;
  year: string;
  names: string;
  motivation: string;
}

// 구글 번역 응답 형식을 위한 타입 정의 (any 제거)
type GoogleTranslateResponse = [[[string, string, ...unknown[]]], ...unknown[]];

const RecentLaureates = () => {
  const [laureates, setLaureates] = useState<LaureateInfo[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);

  const translateToKorean = async (text: string): Promise<string> => {
    if (!text) return "";
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t&q=${encodeURIComponent(
          text
        )}`
      );
      const data: GoogleTranslateResponse = await response.json();

      // 타입 가드와 함께 안전하게 추출
      return data[0].map((item) => item[0]).join("");
    } catch (error) {
      console.error("번역 실패:", error);
      return text;
    }
  };

  const cleanMotivation = (text: string): string => {
    return text
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .trim();
  };

  const getUniqueMotivations = useCallback(
    (laureates: ApiLaureate[]): string => {
      const motivations = laureates
        .map((l) =>
          l.motivation?.en ? cleanMotivation(l.motivation.en) : null
        )
        .filter((m): m is string => m !== null);
      return [...new Set(motivations)].join(" | ");
    },
    []
  );

  const formatNames = useCallback((laureates: ApiLaureate[]): string => {
    return laureates
      .map(
        (l) =>
          l.knownName?.en ||
          `${l.firstname || ""} ${l.surname || ""}`.trim() ||
          l.orgName?.en ||
          "Unknown"
      )
      .filter(Boolean)
      .join(", ");
  }, []);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        setIsTranslating(true);
        const response = await fetch(
          "https://api.nobelprize.org/2.1/nobelPrizes?limit=5&sort=desc"
        );
        const data: ApiResponse = await response.json();

        const result: LaureateInfo[] = await Promise.all(
          data.nobelPrizes.map(async (prize) => {
            const englishMotivation = getUniqueMotivations(prize.laureates);
            const koreanMotivation = await translateToKorean(englishMotivation);

            return {
              // 외부 상수를 사용하여 의존성 문제 해결
              category: CATEGORY_MAP[prize.category.en] || prize.category.en,
              year: prize.awardYear,
              names: formatNames(prize.laureates),
              motivation: koreanMotivation,
            };
          })
        );

        setLaureates(result);
      } catch (err) {
        console.error("Failed to fetch recent laureates:", err);
      } finally {
        setIsTranslating(false);
      }
    };

    fetchRecent();
  }, [formatNames, getUniqueMotivations]); // CATEGORY_MAP은 외부 상수이므로 넣지 않아도 됩니다.

  return (
    <div className="recent-laureates-wrapper">
      <header className="recent-header">
        <span className="eyebrow">The Nobel Prize</span>
        <h2 className="section-title">최근 수상자</h2>
        {isTranslating && (
          <p className="translating-text">한국어로 번역 중...</p>
        )}
      </header>

      <div className="laureate-masonry">
        {laureates.map((item, index) => (
          <div key={index} className="apple-laureate-card">
            <div className="card-top">
              <span className="card-year">{item.year}</span>
              <span className="card-dot">•</span>
              <span className="card-category">{item.category}</span>
            </div>

            <h3 className="card-names">{item.names}</h3>

            <div className="card-bottom">
              <p className="card-motivation">{item.motivation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentLaureates;
