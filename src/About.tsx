import "./About.css";
const About = () => {
  return (
    <section className="about-container">
      {/* 메인 제목 */}
      <h1>About the Nobel Prize Explorer</h1>

      {/* 노벨상 간단 역사 설명 */}
      <p className="about-text">
        The Nobel Prize는 다이너마이트를 발명한 알프레드 노벨의 1895년 유언에
        따라 설립된 세계에서 가장 권위 있는 상입니다. 물리학, 화학, 생리의학,
        문학, 평화 5개 부문은 1901년부터, 경제학상은 1969년부터 매년 수여되고
        있습니다.
      </p>

      {/* 우리 사이트 소개 (핵심!) */}
      <div className="about-project">
        <h2>이 사이트는 어떤 곳인가요?</h2>
        <p className="about-text">
          <strong>Nobel Prize Explorer</strong>는 공식 Nobel Prize API를 활용해
          1901년부터 현재까지 모든 수상자·수상 연도·수상 이유를 한눈에 검색하고
          탐색할 수 있는 웹사이트입니다.
        </p>

        <h3>주요 기능</h3>
        <ul className="feature-list">
          <li>연도별·분야별 수상자 빠르게 검색</li>
          <li>수상자 상세 정보 (국적, 소속, 수상 연설 등)</li>
          <li>인기 키워드로 보는 노벨상 트렌드 차트</li>
          <li>한국인 수상자 특집 페이지</li>
          <li>모바일에서도 편리한 반응형 디자인</li>
        </ul>

        <h3>왜 만들었나요?</h3>
        <p className="about-text">
          노벨상은 인류의 위대한 성취를 기념하는 상이지만, 공식 사이트는 정보가
          방대해서 처음 보는 사람이 찾기 어려운 경우가 많아요. 그래서 누구나
          쉽게 재미있게 노벨상을 탐색할 수 있도록 이 사이트를 만들게 되었습니다.
          학생, 교사, 연구자, 그리고 호기심 많은 모든 분께 유용한 자료가 되길
          바랍니다!
        </p>
      </div>

      {/* 출처 명시 (API 이용 시 필수!) */}
      <p className="about-source">
        데이터 출처: The Official Nobel Prize API[](https://api.nobelprize.org)
        <br />본 사이트는 학습 목적으로 제작되었으며, 노벨 재단과 무관합니다.
      </p>
    </section>
  );
};

export default About;
