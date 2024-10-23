import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import SearchResults from "./SearchResults";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results); // 검색 결과를 업데이트하는 로직 추가
  };

  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home onSearch={handleSearch} />} />{" "}
          {/* onSearch prop 추가 */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/search-results"
            element={<SearchResults searchResults={searchResults} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
