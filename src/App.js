// App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import SearchResults from "./SearchResults";
import CategoryResults from "./CategoryResults";
import Nav from "./Nav";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home onSearch={setSearchResults} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/search-results"
          element={<SearchResults searchResults={searchResults} />}
        />
        <Route path="/category/:category" element={<CategoryResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
