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
            <h3>
              {/* 수상자의 이름을 표시 */}
              {result.firstname} {result.surname}
            </h3>
            <p>수상 연도: {result.nobelPrizes[0]?.awardYear}</p>
            {/* 카테고리를 객체에서 영어 필드로 가져옴 */}
            <p>수상 종류: {result.nobelPrizes[0]?.category?.en}</p>
            {/* 이미지가 있는 경우 이미지 표시 */}
            {result.fileName && (
              <img
                src={`https://www.nobelprize.org/images/${result.fileName}`}
                alt={`${result.firstname} ${result.surname}`}
                style={{ width: "150px", height: "200px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
