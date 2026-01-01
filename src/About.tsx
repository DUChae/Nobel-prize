import "./About.css";

const About = () => {
  return (
    <section className="about-container">
      <h1>Nobel Prize Explorer</h1>

      <p className="about-text">
        The Nobel Prize는 다이너마이트를 발명한 알프레드 노벨의 1895년 유언에
        따라 설립된 세계에서 가장 권위 있는 상입니다. 물리학, 화학, 생리의학,
        문학, 평화 5개 부문은 1901년부터, 경제학상은 1969년부터 매년 수여되고
        있습니다.
      </p>

      <h2>이 사이트는 어떤 곳인가요?</h2>
      <p className="about-text">
        <strong>Nobel Prize Explorer</strong>는 공식 Nobel Prize API를 기반으로
        1901년부터 현재까지 모든 수상자, 수상 연도, 수상 이유를 직관적으로
        탐색할 수 있도록 설계된 인터랙티브 웹 서비스입니다.
      </p>

      <h3>주요 기능</h3>
      <ul className="feature-list">
        <li>연도별 · 분야별 수상자 빠른 검색</li>
        <li>수상자 상세 정보 (국적, 소속, 수상 연설 등)</li>
        <li>키워드 기반 노벨상 트렌드 시각화</li>
        <li>한국인 수상자 특집 페이지 제공</li>
        <li>모바일에 최적화된 반응형 UI</li>
      </ul>

      <h3>왜 만들었나요?</h3>
      <p className="about-text">
        노벨상은 인류의 위대한 성취를 기념하지만, 공식 사이트는 방대한 정보로
        인해 처음 방문하는 사용자에게는 다소 어렵게 느껴질 수 있습니다. Nobel
        Prize Explorer는 누구나 쉽게 탐색하고 즐길 수 있는 경험을 제공하는 것을
        목표로 제작되었습니다. 학생, 연구자, 교육자, 그리고 호기심 많은 모든
        분께 도움이 되길 바랍니다.
      </p>

      <p className="about-source">
        데이터 출처: The Official Nobel Prize API
        <br />본 사이트는 학습 목적으로 제작되었으며, 노벨 재단과 공식적으로
        연관되지 않았습니다.
      </p>
    </section>
  );
};

export default About;
