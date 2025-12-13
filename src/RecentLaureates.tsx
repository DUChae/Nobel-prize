// src/RecentLaureates.tsx (타입스크립트 완벽 + ESLint 통과!)
import { useEffect, useState, useCallback } from "react";
import "./RecentLaureates.css";

// API 응답 타입 정의 (정확하게!)
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

// 화면에 보여줄 데이터 타입
interface LaureateInfo {
  category: string;
  year: string;
  names: string;
  motivation: string;
}

const RecentLaureates = () => {
  const [laureates, setLaureates] = useState<LaureateInfo[]>([]);

  // HTML 엔티티 정리 함수
  const cleanMotivation = (text: string): string => {
    return text
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .trim();
  };

  // 중복 제거 + | 연결 (useCallback으로 의존성 문제 해결!)
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
  ); // cleanMotivation은 안정적 함수라 의존성 없음

  // 이름 합치기
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
        const response = await fetch(
          "https://api.nobelprize.org/2.1/nobelPrizes?limit=5&sort=desc"
        );
        const data: ApiResponse = await response.json();

        const result: LaureateInfo[] = data.nobelPrizes.map((prize) => ({
          category: prize.category.en,
          year: prize.awardYear,
          names: formatNames(prize.laureates),
          motivation: getUniqueMotivations(prize.laureates),
        }));

        setLaureates(result);
      } catch (err) {
        console.error("Failed to fetch recent laureates:", err);
      }
    };

    fetchRecent();
  }, [formatNames, getUniqueMotivations]); // 이제 의존성 완벽!

  return (
    <div className="recent-laureates-container">
      <h2>최근 노벨상 수상자</h2>
      <div className="laureate-grid">
        {laureates.map((item, index) => (
          <div key={index} className="laureate-card">
            <div className="card-header">
              <h3 className="laureate-name">{item.names}</h3>
              <div className="info-tags">
                <span className="tag category">{item.category}</span>
                <span className="tag year">{item.year}</span>
              </div>
            </div>
            <div className="card-body">
              <p className="motivation">
                <strong>Motivation:</strong> {item.motivation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentLaureates;
