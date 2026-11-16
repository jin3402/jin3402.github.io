---
icon: fas fa-info-circle
order: 4
locale: ko
pair: /en/about/
---

컴퓨터공학을 전공하며 **Flutter 앱**, **토스 미니앱**, **AI 학습 서비스**를 직접 기획하고 배포까지 해본 개발자입니다.  
플랫폼 제약(CORS, WebView 보안, 심사 정책)을 우회하지 않고, 제품 안에서 풀어내는 쪽을 선호합니다.

- GitHub: [jin3402](https://github.com/jin3402)
- Email: gng09125@naver.com

## 대표 프로젝트

### AX인재전쟁 × 삼일PwC: INF-001 전속계약·기안 승인 운영
가상 화장품 그룹의 데이터로 1주일 동안 혼자 만든 **AI 업무 운영 앱**.  
7/17까지 통보하지 않으면 28억 계약이 자동 갱신되는 상황에서, 서버가 현금을 다시 계산해 결재자를 정하고, CEO가 계약 3안 중 하나를 골라야 승인되게 만들었습니다. AI는 근거와 조건을 제안만 하고, 서버가 원본과 대조해 통과한 것만 씁니다. 자동 테스트 134개가 통과합니다.

- [배포 앱](https://aurora-campaign-approval-34ng.axhub.app)
- [GitHub](https://github.com/jin3402/aurora-campaign-approval)
- [개발 기록](/posts/samilpwc-campaign-approval/)

### 겜세일
스팀·에픽·콘솔 할인 게임을 한눈에 보여주는 **앱인토스 미니앱**이자 **할인 게임 검색 웹사이트**.  
WebView CORS 제약을 빌드 타임 스냅샷으로 풀고, 광고·프로모션·콘텐츠 필터까지 실서비스 수준으로 연동했습니다. TDS가 토스 밖 도메인을 막아 데이터 로직만 공유하고 웹 UI를 분리해 검색·역대 최저가 비교 사이트로 확장했습니다.

- [웹사이트](https://gamsale.vercel.app)
- [GitHub](https://github.com/jin3402/gamsale)
- [개발 기록](/posts/gamsale/)

### 중간지점찾기
여러 출발지의 중간 위치를 계산하고, 주변 맛집·카페·볼거리를 추천하는 **토스 미니앱**.  
카카오맵 직접 렌더링, 심사 반려 대응, 공유/지도 이동 UX까지 운영 가능한 제품으로 만들었습니다.

- [GitHub](https://github.com/jin3402/midpoint-finder)
- [개발 회고](/posts/midpoint-finder/)

### AI Travel
여행 성향 테스트 후 맞춤 여행지를 제안하는 **Flutter 팀 프로젝트**.  
위젯 모듈화와 방어적 UI로 모바일 화면을 구성했습니다.

- [GitHub](https://github.com/jin3402/ai_travel)
- [개발 기록](/posts/ai-travel/)

### Havruta AI Tutor
고등학생이 AI와 질문·설명·피드백을 반복하는 **하브루타 학습 웹앱**.  
FastAPI · React · RAG · Railway 배포까지 한 흐름으로 통합했습니다. 운영 서버에는 9개 과목 302,059건의 검색 자료가 올라가 있고, 자동 테스트 196개가 통과합니다. 검색 재정렬을 더했을 때 근거 확보율이 66.7%에서 75.0%로 오른 것을 비교 실험으로 확인했습니다.

- [GitHub](https://github.com/20211400jiho/havruta-ai-tutor)
- [공개 테스트](https://frontend-production-8c41.up.railway.app)
- [개발 기록](/posts/havruta-ai-tutor/)

## 기술 스택

- **Frontend:** TypeScript, React, Flutter, Vite, TDS
- **Backend / AI:** Python, FastAPI, MySQL, Redis, RAG(ChromaDB, BM25·RRF 재정렬), OpenAI
- **macOS Native:** Swift, AppKit, Accessibility API
- **Platform:** Apps in Toss (WebView), Vercel, GitHub Pages, Railway
