# Nobel Prize Explorer

**노벨상 수상자 탐색 웹 애플리케이션 (SEO Optimized)**

![Nobel Prize Explorer Homepage](/public/images/메인.png)

![Category Details Page](/public/images/카테고리별_수상자.png)

![Search Results Page](/public/images/검색결과.png)

**실시간 데모**: [https://nobel-prize-sooty.vercel.app](https://nobel-prize-sooty.vercel.app)  
**GitHub**: [github.com/DUChae/Nobel-prize](https://github.com/DUChae/Nobel-prize)

---

### 프로젝트 소개

1901년부터 현재까지의 노벨상 수상자를 **카테고리별로 탐색**하고, **이름으로 검색**할 수 있는 반응형 웹 애플리케이션입니다.  
Nobel Prize 공식 API(v2.1)를 활용하여 정확한 데이터를 실시간으로 제공하며, **검색 엔진 최적화(SEO)를 통해 서비스의 발견 가능성(Discoverability)을 극대화**했습니다.

기존 **Create React App + JavaScript** 기반의 레거시 프로젝트를  
**Vite + TypeScript + 현대적 아키텍처**로 완전히 리팩터링하여,  
타입 안정성, 개발 생산성, 유지보수성을 획기적으로 향상시켰습니다.

---

### 주요 기능

- **카테고리별 수상자 탐색** Physics, Chemistry, Medicine, Literature, Peace, Economics (6개 분야)

- **실시간 이름 검색** 수상자 이름 입력 시 즉시 필터링 + 전용 결과 페이지

- **기술적 SEO 최적화 (New)** Google Search Console 등록, Sitemap.xml 생성, Meta 태그 설정을 통한 구글 검색 노출 강화

- **웹 공유 최적화 (OG Tag) (New)** Open Graph 설정을 통해 SNS 공유 시 사이트 미리보기(이미지, 설명) 최적화

- **최신 수상자 하이라이트** 최근 5개 수상자를 카드 형식으로 강조 표시

- **정보 없는 항목 자동 숨김** 출생지, 사망일 등 데이터가 없을 시 UI에서 자연스럽게 제외

- **완전 반응형 디자인** 모바일, 태블릿, 데스크톱 모두 최적화

- **중복 motivation 자동 제거** 공동 수상자라도 동일한 공로 문장은 한 번만 표시

---

### 기술 스택

| 카테고리 | 기술 |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, React Router v6, CSS Modules |
| **API** | Nobel Prize Official API (v2.1) |
| **배포 & SEO** | Vercel, **Google Search Console, Sitemap.xml, Meta Tags** |
| **기타** | ESLint + Prettier, Git/GitHub, useCallback 최적화 |

---

### 핵심 성과 (리팩터링 전 → 후)

| 항목 | 이전 (CRA + JS) | 이후 (Vite + TS) | 개선율 |
| :--- | :--- | :--- | :--- |
| 개발 서버 기동 시간 | ~8초 | 0.2초 | **95% 감소** |
| HMR 반영 속도 | 3~5초 | 즉시 반영 | **거의 실시간** |
| 번들 크기 | 1.8MB | 1.1MB | **42% 감소** |
| 런타임 오류 | 빈번함 | 거의 없음 | **95% 이상 감소** |
| **검색 엔진 노출** | **불가능** | **구글 색인 완료** | **신규 적용** |

---

### 기술적 도전 & 해결

- **JavaScript → TypeScript 마이그레이션** → 20개 이상 컴포넌트 변환, `any` 완전 제거, 15개+ 인터페이스 설계로 타입 안정성 확보

- **기술적 SEO(Search Engine Optimization) 구현** → 단순 배포를 넘어 실사용자 유입을 위해 **Sitemap.xml 구성 및 Google Search Console 색인 요청** 프로세스 수행

- **느린 개발 경험 (CRA) 탈출** → Vite로 전환하여 개발 생산성을 혁명적으로 향상시키고 최적화된 빌드 환경 구축

- **복잡한 API 응답 구조** → 정밀한 타입 정의 + 타입 가드로 데이터 누락 및 런타임 에러 방지

- **중복된 motivation 텍스트** → `Set` 기반 중복 제거 로직으로 데이터 시각화의 가독성 개선

---

### 배운 점

- 레거시 코드를 현대 스택으로 마이그레이션하는 **엔드 투 엔드(E2E) 프로세스** 경험
- **SEO의 중요성 체감**: 메타 데이터와 사이트맵 설정이 서비스의 '발견 가능성'에 미치는 실무적 영향 학습
- TypeScript를 **실무 수준**으로 활용하여 안정적인 프론트엔드 아키텍처를 설계하는 능력 확보
- 사용자 경험을 위한 **세심한 디테일**의 중요성 (정보 숨김, 줄바꿈 처리, 반응형 대응 등)

> “이 프로젝트를 통해 코드의 품질뿐만 아니라, SEO와 배포 이후의 운영 관점까지 고려하는 '제품 중심'의 개발자로 성장했습니다.”

---

### 실행 방법

```bash
# 클론
git clone [https://github.com/DUChae/Nobel-prize.git](https://github.com/DUChae/Nobel-prize.git)

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
