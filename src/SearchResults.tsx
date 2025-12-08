import "./SearchResults.css";

export interface LaureateResult {
  knownName?: { en?: string };
  fullName?: { en?: string };
  nobelPrizes?: {
    awardYear?: string;
    category?: { en?: string };
  }[];
  birth?: {
    date?: string;
    place?: {
      country?: { en?: string };
      city?: { en?: string };
    };
  };
  death?: {
    date?: string;
    place?: {
      country?: { en?: string };
      city?: { en?: string };
    };
  };
  gender?: string;
  affiliations?: {
    name?: { en?: string };
  }[];
}

interface SearchResultsProps {
  searchResults: LaureateResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  if (!searchResults || searchResults.length === 0) {
    return <div className="no-results">검색 결과가 없습니다.</div>;
  }

  return (
    <div className="search-results">
      <h2>검색 결과 ({searchResults.length}명)</h2>
      <ul className="results-list">
        {searchResults.map((result, index) => {
          const name =
            result.knownName?.en || result.fullName?.en || "이름 없음";
          const prize = result.nobelPrizes?.[0];
          const birth = result.birth;
          const death = result.death;
          const affiliation = result.affiliations?.[0]?.name?.en;

          return (
            <li key={index} className="result-item">
              <h3 className="laureate-name">{name}</h3>

              {/* 수상 정보 */}
              {prize && (
                <div className="info-group">
                  {prize.awardYear && <p>수상 연도: {prize.awardYear}</p>}
                  {prize.category?.en && <p>수상 분야: {prize.category.en}</p>}
                </div>
              )}

              {/* 출생 정보 - 하나라도 있으면 표시 */}
              {birth &&
                (birth.date ||
                  birth.place?.country?.en ||
                  birth.place?.city?.en) && (
                  <div className="info-group">
                    {birth.date && <p>출생일: {birth.date}</p>}
                    {birth.place?.country?.en && (
                      <p>출생 국가: {birth.place.country.en}</p>
                    )}
                    {birth.place?.city?.en && (
                      <p>출생 도시: {birth.place.city.en}</p>
                    )}
                  </div>
                )}

              {/* 사망 정보 - 살아있으면 안 나옴, 죽었으면 표시 */}
              {death &&
                (death.date ||
                  death.place?.country?.en ||
                  death.place?.city?.en) && (
                  <div className="info-group">
                    {death.date && <p>사망일: {death.date}</p>}
                    {death.place?.country?.en && (
                      <p>사망 국가: {death.place.country.en}</p>
                    )}
                    {death.place?.city?.en && (
                      <p>사망 도시: {death.place.city.en}</p>
                    )}
                  </div>
                )}

              {/* 성별 */}
              {result.gender && result.gender !== "unknown" && (
                <p>성별: {result.gender === "male" ? "남성" : "여성"}</p>
              )}

              {/* 소속 */}
              {affiliation && <p>소속: {affiliation}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchResults;
