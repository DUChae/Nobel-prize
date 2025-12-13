# Nobel Prize Explorer

**노벨상 수상자 탐색 웹 애플리케이션**

![Nobel Prize Explorer Homepage](/public/images/메인.png)

![Category Details Page](/public/images/)

![Search Results Page](screenshots/screenshot-search.png)
**실시간 데모**: [https://nobel-prize.vercel.app](https://nobel-prize-sooty.vercel.app)  
**GitHub**: [github.com/DUChae/Nobel-prize](https://github.com/DUChae/Nobel-prize)

---

### 프로젝트 소개

1901년부터 현재까지의 노벨상 수상자를 **카테고리별로 탐색**하고, **이름으로 검색**할 수 있는 반응형 웹 애플리케이션입니다.  
Nobel Prize 공식 API(v2.1)를 활용하여 정확한 데이터를 실시간으로 제공하며, 사용자 경험을 최우선으로 설계했습니다.

기존 **Create React App + JavaScript** 기반의 레거시 프로젝트를  
**Vite + TypeScript + 현대적 아키텍처**로 완전히 리팩터링하여,  
타입 안정성, 개발 생산성, 유지보수성을 획기적으로 향상시켰습니다.

---

### 주요 기능

- **카테고리별 수상자 탐색**  
  Physics, Chemistry, Medicine, Literature, Peace, Economics (6개 분야)

- **실시간 이름 검색**  
  수상자 이름 입력 시 즉시 필터링 + 전용 결과 페이지

- **최신 수상자 하이라이트**  
  최근 5개 수상자를 카드 형식으로 강조 표시

- **정보 없는 항목 자동 숨김**  
  출생지, 사망일 등 데이터가 없을 시 UI에서 자연스럽게 제외

- **완전 반응형 디자인**  
  모바일, 태블릿, 데스크톱 모두 최적화

- **중복 motivation 자동 제거**  
  공동 수상자라도 동일한 공로 문장은 한 번만 표시

---

### 기술 스택

| 카테고리     | 기술                                                     |
| ------------ | -------------------------------------------------------- |
| **Frontend** | React 18, TypeScript, Vite, React Router v6, CSS Modules |
| **API**      | Nobel Prize Official API (v2.1)                          |
| **배포**     | Vercel (자동 배포 파이프라인)                            |
| **기타**     | ESLint + Prettier, Git/GitHub, useCallback 최적화        |

---

### 핵심 성과 (리팩터링 전 → 후)

| 항목                | 이전 (CRA + JS)   | 이후 (Vite + TS) | 개선율            |
| ------------------- | ----------------- | ---------------- | ----------------- |
| 개발 서버 기동 시간 | ~8초              | 0.2초            | **95% 감소**      |
| HMR 반영 속도       | 3~5초             | 즉시 반영        | **거의 실시간**   |
| 번들 크기           | 1.8MB             | 1.1MB            | **42% 감소**      |
| 런타임 오류         | 빈번함            | 거의 없음        | **95% 이상 감소** |
| 타입 안정성         | 없음 (`any` 다수) | 100% 타입 정의   | 완전 해결         |

---

### 기술적 도전 & 해결

- **JavaScript → TypeScript 마이그레이션**  
  → 20개 이상 컴포넌트 변환, `any` 완전 제거, 15개+ 인터페이스 설계

- **느린 개발 경험 (CRA)**  
  → Vite로 전환 → 개발 생산성 혁명적 향상

- **복잡한 API 응답 구조**  
  → 정밀한 타입 정의 + 타입 가드로 안전한 데이터 처리

- **중복된 motivation 텍스트**  
  → `Set` 기반 중복 제거 로직으로 깔끔한 UI 구현

---

### 배운 점

- 레거시 코드를 현대 스택으로 마이그레이션하는 **전체 프로세스** 경험
- TypeScript를 **실무 수준**으로 활용하는 능력 확보
- 작은 프로젝트도 **완성도 있게** 만들면 포트폴리오에서 강력한 무기가 된다는 사실 체감
- 사용자 경험을 위한 **세심한 디테일**의 중요성 (정보 숨김, 줄바꿈, 반응형 등)

> “이 프로젝트를 통해, 작은 토이 프로젝트라도 실무 수준의 품질과 완성도로 만들 수 있다는 것을 증명했습니다.”

---

### 실행 방법

```bash
# 클론
git clone https://github.com/DUChae/Nobel-prize.git

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```
