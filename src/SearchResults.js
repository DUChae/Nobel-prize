import React from "react";

function SearchResults({ searchResults }) {
  if (!searchResults || searchResults.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <div>
      <h2>검색 결과</h2>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            {/* API 응답에서 이름 필드 확인 후 수정 */}
            <h3>
              {result.knownName?.en || result.fullName?.en || "이름 없음"}
            </h3>
            <p>수상 연도: {result.nobelPrizes[0]?.awardYear}</p>
            <p>수상 종류: {result.nobelPrizes[0]?.category?.en}</p>
            <p>출생 국가: {result.birth?.place?.country?.en || "정보 없음"}</p>
            <p>출생 도시: {result.birth?.place?.city?.en || "정보 없음"}</p>
            <p>사망 국가: {result.death?.place?.country?.en || "정보 없음"}</p>
            <p>사망 도시: {result.death?.place?.city?.en || "정보 없음"}</p>
            <p>출생일: {result.birth?.date || "정보 없음"}</p>
            <p>사망일: {result.death?.date || "정보 없음"}</p>
            <p>성별: {result.gender || "정보 없음"}</p>
            <p>소속: {result.affiliations?.[0]?.name?.en || "정보 없음"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
