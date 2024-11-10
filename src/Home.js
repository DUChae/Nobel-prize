import React from "react";
import Title from "./Title"; // Title 컴포넌트 임포트
import SearchBox from "./SearchBox";
import Fields from "./Fields";
import RecentLaureates from "./RecentLaureates"; // RecentLaureates 컴포넌트 추가

const Home = ({ onSearch }) => {
  return (
    <div>
      <Title /> {/* Title 컴포넌트 추가 */}
      <div className="home-content">
        <SearchBox onSearch={onSearch} /> {/* onSearch prop 전달 */}
        <Fields /> {/* Fields 컴포넌트 추가 */}
        <RecentLaureates /> {/* RecentLaureates 추가 */}
      </div>
    </div>
  );
};

export default Home;
