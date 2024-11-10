import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBox.css";

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [prizeCategory, setPrizeCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API URL 기본 경로
      let apiUrl = `https://api.nobelprize.org/2.1/laureates?`;

      // 이름이 있으면 이름 필터 추가
      if (query) apiUrl += `name=${query}&`;

      // 수상 연도가 있으면 연도 필터 추가
      if (year) apiUrl += `nobelPrizeYear=${year}&`;

      // 상의 종류가 있으면 상 종류 필터 추가
      if (prizeCategory) apiUrl += `nobelPrizeCategory=${prizeCategory}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      // API에서 받아온 데이터 중 이름이 query로 시작하는 항목만 필터링
      const filteredData = data.laureates.filter((laureate) =>
        laureate.fullName.en.toLowerCase().startsWith(query.toLowerCase())
      );

      console.log(filteredData); // 필터링된 데이터 확인

      // 검색 결과를 부모 컴포넌트로 전달
      onSearch(filteredData || []);
      navigate("/search-results");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="search-container">
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
    </div>
  );
}

export default SearchBox;
