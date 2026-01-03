import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./SearchBox.css";
import type { LaureateResult } from "./SearchResults";

interface SearchBoxProps {
  onSearch: (results: LaureateResult[]) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [prizeCategory, setPrizeCategory] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let apiUrl = `https://api.nobelprize.org/2.1/laureates?`;
      if (query) apiUrl += `name=${encodeURIComponent(query)}&`;
      if (year) apiUrl += `nobelPrizeYear=${year}&`;
      if (prizeCategory) apiUrl += `nobelPrizeCategory=${prizeCategory}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const filteredData: LaureateResult[] =
        data.laureates?.filter((laureate: LaureateResult) => {
          const fullName = laureate.fullName?.en || "";
          return fullName.toLowerCase().includes(query.toLowerCase());
        }) || [];

      onSearch(filteredData);
      navigate("/search-results");
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  return (
    <motion.div
      className="apple-search-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: -60 }} // 타이틀 쪽으로 끌어올림
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <form className="apple-search-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="field-unit">
            <span className="field-label">누구를 찾으시나요?</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="이름 입력"
            />
          </div>
          <div className="divider" />
          <div className="field-unit">
            <span className="field-label">언제인가요?</span>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="연도 (예: 2024)"
            />
          </div>
          <div className="divider" />
          <div className="field-unit">
            <span className="field-label">어떤 분야인가요?</span>
            <input
              type="text"
              value={prizeCategory}
              onChange={(e) => setPrizeCategory(e.target.value)}
              placeholder="분야 입력"
            />
          </div>
        </div>
        <button type="submit" className="search-button">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>검색</span>
        </button>
      </form>
    </motion.div>
  );
};

export default SearchBox;
