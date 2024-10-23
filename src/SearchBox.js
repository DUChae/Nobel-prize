import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [prizeCategory, setPrizeCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 조건에 맞게 쿼리 스트링을 동적으로 구성
    let apiUrl = "https://api.nobelprize.org/2.1/laureates?";
    if (query) apiUrl += `name=${query}&`;
    if (year) apiUrl += `nobelPrizeYear=${year}&`;
    if (prizeCategory) apiUrl += `nobelPrizeCategory=${prizeCategory}&`;

    // URL 끝에 불필요한 "&"를 제거
    apiUrl = apiUrl.slice(0, -1);

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      onSearch(data.laureates || []); // 검색 결과 업데이트
      navigate("/search-results");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="이름 검색"
      />
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="수상 연도"
      />
      <input
        type="text"
        value={prizeCategory}
        onChange={(e) => setPrizeCategory(e.target.value)}
        placeholder="수상 종류"
      />
      <button type="submit">검색</button>
    </form>
  );
}

export default SearchBox;
