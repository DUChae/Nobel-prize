import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [prizeCategory, setPrizeCategory] = useState("");
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 사용

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.nobelprize.org/2.1/laureates?name=${query}&year=${year}&category=${prizeCategory}`
      );
      const data = await response.json();
      onSearch(data.laureates || []); // 검색 결과 업데이트
      navigate("/search-results"); // 검색 결과 페이지로 이동
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
