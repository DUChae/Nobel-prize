import Title from "./Title";
import SearchBox from "./SearchBox";
import Fields from "./Fields";
import RecentLaureates from "./RecentLaureates";
import type { LaureateResult } from "./SearchResults";
interface HomeProps {
  onSearch: (results: LaureateResult[]) => void;
}

const Home = ({ onSearch }: HomeProps) => {
  return (
    <div>
      <Title />
      <div className="home-content">
        <SearchBox onSearch={onSearch} />
        <Fields />
        <RecentLaureates />
      </div>
    </div>
  );
};

export default Home;
