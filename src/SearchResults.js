import React from "react";

function SearchResults({ searchResults }) {
  // searchResults가 undefined일 경우 빈 배열로 처리
  if (!searchResults || searchResults.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <div>
      <h2>검색 결과</h2>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            <h3>
              {result.firstname} {result.surname}
            </h3>
            <p>수상 연도: {result.nobelPrizes[0]?.awardYear}</p>
            <p>수상 종류: {result.nobelPrizes[0]?.category?.en}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
