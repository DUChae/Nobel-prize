import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1 className="hero-title">Nobel Prize Explorer</h1>
        <p className="hero-subtitle">인류에 기여한 위대한 지성을 탐색하다</p>
      </section>

      <section className="about-container">
        <div className="content-block">
          <p className="about-text main-intro">
            The Nobel Prize는 다이너마이트를 발명한 알프레드 노벨의 1895년
            유언에 따라 설립된 세계에서 가장 권위 있는 상입니다. 1901년부터
            시작된 이 여정은 오늘날까지 인류의 가장 진보된 성취를 기록하고
            있습니다.
          </p>
        </div>

        <div className="content-grid">
          <div className="glass-card">
            <h2>이 사이트는 어떤 곳인가요?</h2>
            <p className="about-text">
              공식 Nobel Prize API를 기반으로 모든 수상자와 그들의 위대한 공로를
              직관적인 인터페이스로 제공하는 인터랙티브 아카이브입니다.
            </p>
          </div>

          <div className="glass-card">
            <h2>주요 기능</h2>
            <ul className="feature-list">
              <li>
                <span>01</span> 연도별 · 분야별 스마트 검색
              </li>
              <li>
                <span>02</span> 수상자 상세 프로필 및 데이터
              </li>
              <li>
                <span>03</span> 키워드 기반 트렌드 분석
              </li>
              <li>
                <span>04</span> 반응형 익스피리언스
              </li>
            </ul>
          </div>
        </div>

        <div className="content-block mission">
          <h2>우리의 목표</h2>
          <p className="about-text">
            방대한 정보를 누구나 쉽게 탐색할 수 있도록 단순화하는 것. 우리는
            지식의 문턱을 낮추고, 위대한 성취가 주는 영감을 더 많은 사람에게
            전달하고자 합니다.
          </p>
        </div>

        <footer className="about-footer">
          <p className="about-source">
            Data provided by <strong>The Official Nobel Prize API</strong>
            <span>본 사이트는 비상업적 학습 목적으로 제작되었습니다.</span>
          </p>
        </footer>
      </section>
    </div>
  );
};

export default About;
