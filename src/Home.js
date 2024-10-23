import React from "react";
import SearchBox from "./SearchBox";
const Home = ({ onSearch }) => {
  return (
    <div>
      <SearchBox onSearch={onSearch} /> {/* onSearch prop 전달 */}
    </div>
  );
};

export default Home;
