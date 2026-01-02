import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import SearchResults from "./SearchResults";
import CategoryDetails from "./CategoryDetails";
import type { LaureateResult } from "./SearchResults";
import "./App.css"; // CSS 연결 확인

const App = () => {
  const [searchResults, setSearchResults] = useState<LaureateResult[]>([]);

  return (
    <BrowserRouter>
      {/* 애플 스타일의 고정 상단바를 위해 main-wrapper 사용 */}
      <div className="app-viewport">
        <Nav />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home onSearch={setSearchResults} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/search-results"
              element={<SearchResults searchResults={searchResults} />}
            />
            <Route path="/category/:category" element={<CategoryDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
