import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBox.css";
import type { LaureateResult } from "./SearchResults"; // 핵심!

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

      if (query) apiUrl += `name=${query}&`;
      if (year) apiUrl += `nobelPrizeYear=${year}&`;
      if (prizeCategory) apiUrl += `nobelPrizeCategory=${prizeCategory}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const filteredData: LaureateResult[] =
        data.laureates?.filter((laureate: LaureateResult) => {
          const fullName = laureate.fullName?.en || "";
          return fullName.toLowerCase().startsWith(query.toLowerCase());
        }) || [];

      onSearch(filteredData);
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
};

export default SearchBox;
