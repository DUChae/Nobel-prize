import { useEffect, useState } from "react";
import "./SearchResults.css";

export interface LaureateResult {
  id: string;
  knownName?: { en?: string };
  fullName?: { en?: string };
  gender?: string;
  birth?: {
    date?: string;
    place?: { country?: { en?: string }; city?: { en?: string } };
  };
  death?: {
    date?: string;
    place?: { country?: { en?: string }; city?: { en?: string } };
  };
  nobelPrizes?: {
    awardYear?: string;
    category?: { en?: string };
    motivation?: { en?: string };
    portion?: string;
    residences?: { city?: { en?: string }; country?: { en?: string } }[];
  }[];
  affiliations?: {
    name?: { en?: string };
    city?: { en?: string };
    country?: { en?: string };
  }[];
}

interface SearchResultsProps {
  searchResults: LaureateResult[];
}

const formatDate = (dateStr: string | undefined) => {
  if (!dateStr || dateStr === "0000-00-00") return null;
  const parts = dateStr.split("-");
  const year = parts[0];
  const month = parts[1] && parts[1] !== "00" ? `${parseInt(parts[1])}월 ` : "";
  const day = parts[2] && parts[2] !== "00" ? `${parseInt(parts[2])}일` : "";
  return `${year}년 ${month}${day}`.trim();
};

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  const [translatedMotivations, setTranslatedMotivations] = useState<
    Record<number, string>
  >({});

  const translateToKorean = async (text: string): Promise<string> => {
    if (!text) return "";
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t&q=${encodeURIComponent(
          text
        )}`
      );
      const data = await response.json();
      return data[0].map((item: unknown) => (item as unknown[])[0]).join("");
    } catch {
      return text;
    }
  };

  useEffect(() => {
    const translateAll = async () => {
      const newTranslations: Record<number, string> = {};
      await Promise.all(
        searchResults.map(async (result: LaureateResult, index: number) => {
          const engMotivation = result.nobelPrizes?.[0]?.motivation?.en;
          if (engMotivation)
            newTranslations[index] = await translateToKorean(engMotivation);
        })
      );
      setTranslatedMotivations(newTranslations);
    };
    if (searchResults.length > 0) translateAll();
  }, [searchResults]);

  if (!searchResults || searchResults.length === 0)
    return <div className="no-results">검색 결과가 없습니다.</div>;

  return (
    <div className="search-results-wrapper">
      <header className="results-header">
        <h2 className="results-count">
          Nobel Laureates <span>{searchResults.length}</span>
        </h2>
      </header>

      <div className="results-list">
        {searchResults.map((result: LaureateResult, index: number) => {
          const name =
            result.fullName?.en || result.knownName?.en || "Unnamed Laureate";
          const prize = result.nobelPrizes?.[0];
          const affiliation = result.affiliations?.[0];
          const residence = prize?.residences?.[0];

          return (
            <div key={index} className="result-card-archive">
              {/* 상단: 이름과 카테고리 (사진 대신 타이포그래피 강조) */}
              <div className="card-top-archive">
                <div className="prize-info">
                  <span className="archive-year">{prize?.awardYear}</span>
                  <span className="archive-category">
                    {prize?.category?.en}
                  </span>
                </div>
                <h3 className="archive-name">{name}</h3>
              </div>

              {/* 중단: 상세 정보 그리드 */}
              <div className="archive-details-grid">
                {formatDate(result.birth?.date) && (
                  <div className="archive-item">
                    <span className="label">Born</span>
                    <span className="val">
                      {formatDate(result.birth?.date)} (
                      {result.birth?.place?.country?.en})
                    </span>
                  </div>
                )}
                {formatDate(result.death?.date) && (
                  <div className="archive-item">
                    <span className="label">Died</span>
                    <span className="val">
                      {formatDate(result.death?.date)}
                    </span>
                  </div>
                )}
                {result.gender && (
                  <div className="archive-item">
                    <span className="label">Gender</span>
                    <span className="val">
                      {result.gender.charAt(0).toUpperCase() +
                        result.gender.slice(1)}
                    </span>
                  </div>
                )}
                {prize?.portion && (
                  <div className="archive-item">
                    <span className="label">Prize Share</span>
                    <span className="val">
                      {prize.portion === "1"
                        ? "Sole Winner"
                        : `Shared (${prize.portion})`}
                    </span>
                  </div>
                )}
                {residence && (
                  <div className="archive-item">
                    <span className="label">Residence</span>
                    <span className="val">
                      {residence.city?.en}, {residence.country?.en}
                    </span>
                  </div>
                )}
                {affiliation && (
                  <div className="archive-item full-row">
                    <span className="label">Affiliation at time of award</span>
                    <span className="val">
                      {affiliation.name?.en} ({affiliation.city?.en},{" "}
                      {affiliation.country?.en})
                    </span>
                  </div>
                )}
              </div>

              {/* 하단: 한국어 동기 */}
              {translatedMotivations[index] && (
                <div className="archive-motivation">
                  <span className="label">Motivation (KR)</span>
                  <p className="motivation-text">
                    "{translatedMotivations[index]}"
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
