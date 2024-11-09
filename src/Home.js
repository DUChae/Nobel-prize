// Home.js
import React from "react";
import SearchBox from "./SearchBox";
import Fields from "./Fields";
import RecentLaureates from "./RecentLaureates"; // RecentLaureates 컴포넌트 추가

const Home = ({ onSearch }) => {
  return (
    <div>
      <SearchBox onSearch={onSearch} /> {/* onSearch prop 전달 */}
      <Fields /> {/* Fields 컴포넌트 추가 */}
      <RecentLaureates /> {/* RecentLaureates 추가 */}
    </div>
  );
};

export default Home;
