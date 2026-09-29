---
layout: post
title: "Havruta AI Tutor: 질문과 설명으로 공부하는 AI 학습 서비스"
date: 2026-08-20 09:00:00 +0900
permalink: /posts/havruta-ai-tutor/
slug: havruta-ai-tutor
categories: [Project, Backend]
tags: [python, fastapi, react, rag, openai, railway]
pin: true
locale: ko
pair: /en/posts/havruta-ai-tutor/
description: 고등학생이 AI와 질문·설명·피드백을 반복하는 하브루타 튜터 MVP. 분리된 브랜치를 통합하고 RAG·인증·실시간 채팅까지 배포한 기록입니다.
---

고등학생이 AI에게 답을 받기만 하는 서비스가 아니라, **자기 언어로 설명하고 피드백을 받는** 하브루타 학습 웹앱입니다.

- **GitHub:** [20211400jiho/havruta-ai-tutor](https://github.com/20211400jiho/havruta-ai-tutor)
- **웹앱:** [공개 테스트](https://frontend-production-8c41.up.railway.app)
- **API / Swagger:** [docs](https://backend-production-98f3.up.railway.app/docs)
- **역할:** 팀 프로젝트 / 백엔드·AI·브랜치 통합·배포

## 학습 흐름

1. 학생이 학습 주제를 선택한다.
2. AI가 학습 자료에 근거한 첫 질문을 제시한다.
3. 학생이 자기 언어로 개념이나 풀이를 설명한다.
4. 시스템이 답변을 평가하고 강점과 개선점을 알려준다.
5. AI가 다음 사고를 유도하는 후속 질문을 제시한다.
6. 학습 종료 시 기록과 정리노트를 자동 생성한다.
7. 같은 학습 자료를 사용해 복습 퀴즈를 생성한다.

## 화면으로 본 학습 흐름

학생이 실제로 거치는 순서대로 네 화면을 놓았습니다. 홈에서 시작해 AI와 대화하고, 퀴즈로 복습하고, 친구와 토론합니다. 대화·퀴즈·토론 모두 학생이 고른 단원의 교육과정 자료를 근거로 동작합니다.

### 1. 홈: 이어서 할 학습

홈은 지난 학습에서 이어지도록 구성했습니다. `이어서 탐구하기`에는 마지막으로 공부하던 단원이 뜨고, 지난 대화와 질문이 저장되어 있어 `대화 이어가기`로 바로 돌아갈 수 있습니다. `이번 주 학습 발자국`은 학습을 마친 날을 표시하고, `최근에 마친 학습`은 세션 종료 때 만들어진 정리노트로 이어집니다.

![하브루타 홈 화면. 이어서 탐구하기 카드, 이번 주 학습 발자국, 최근에 마친 학습 목록](/assets/img/posts/havruta-home-v2.webp)
{: .shadow .rounded-10 }
_하던 학습으로 돌아가는 입구입니다. 끝낸 학습은 정리노트로 남습니다._
{: .fig-caption }

### 2. AI와 학습 대화: 설명하고, 되묻고

위 흐름의 2~5번이 일어나는 화면입니다. 학생이 자기 말로 설명하거나 질문하면, AI가 답한 뒤 다음 생각을 끌어내는 질문으로 되묻습니다. 대화는 학습 시작 때 고른 `교과목 · 학교급 · 학년 · 단원` 안에서만 자료를 검색합니다. 원래 `AITraining` 브랜치에 있던 자료는 고1 수학 JSON 하나뿐이었고, 통합하면서 학교급과 과목을 골라 들어갈 수 있게 넓혔습니다.

답변마다 `참고한 학습 자료 3개`를 펼치면 근거로 쓴 교육과정 자료를 볼 수 있습니다. 위쪽 `학습목표와 진행`은 이 단원의 학습목표 중 AI가 확인한 항목 수를 보여줍니다.

![하브루타 학습 대화 화면. 학생의 질문, AI의 설명과 되묻는 질문, 참고한 학습 자료 펼치기, 학습목표와 진행 패널](/assets/img/posts/havruta-study-dialogue.webp)
{: .shadow .rounded-10 }
_AI가 설명으로 끝내지 않고 다음 질문을 던집니다. 근거 자료는 답변마다 펼쳐 확인합니다._
{: .fig-caption }

### 3. 복습 퀴즈

공부한 단원의 학습 자료를 검색해 복습 퀴즈를 만듭니다(흐름 7번). 근거가 될 자료를 찾지 못하면 퀴즈를 만들지 않고 오류를 돌려줍니다. 자료 없이 그럴듯한 문제를 지어내지 않게 하려는 선택입니다.

![하브루타 복습 퀴즈 화면. 사회화와 자아 정체성 단원의 객관식 문항](/assets/img/posts/havruta-quiz.webp)
{: .shadow .rounded-10 }
_퀴즈도 대화와 같은 단원 자료에서 나옵니다._
{: .fig-caption }

### 4. 친구와 토론: 실시간 채팅과 AI 비교

혼자 하는 학습과 별도로, 같은 학습방의 친구들과 WebSocket으로 실시간 채팅을 합니다. 연결할 때 JWT와 학습방 권한을 확인합니다.

`AI로 토론 비교하기`는 서로 다른 두 명 이상이 의견을 남겼을 때만 분석을 시작합니다. 선택한 단원의 자료를 검색해 근거로 삼고, 참여자별 최근 의견의 공통점과 차이를 비교한 뒤 다음 토론 질문을 제시합니다. 단원 선택지 옆의 `자료 644개`는 그 단원에서 근거로 쓸 수 있는 자료 수입니다.

![하브루타 친구와 토론 화면. 공동 하브루타 AI 분석 패널과 두 학생의 실시간 채팅](/assets/img/posts/havruta-discussion.webp)
{: .shadow .rounded-10 }
_사람끼리의 대화는 WebSocket으로 주고받고, 비교·정리는 AI가 단원 자료를 근거로 합니다._
{: .fig-caption }

## 통합이 필요했던 이유

원래 저장소는 역할이 갈라져 있었습니다.

| 브랜치 | 원래 역할 |
|--------|-----------|
| `main` | 백엔드 (회원, 학습방, WebSocket) |
| `AITraining` | 고1 수학 JSON + Chroma 검색 실험 |
| `front` | React/Vite 화면 |

각각은 동작했지만, 처음부터 끝까지 한 서비스로 실행하기는 어려웠습니다. 백엔드·AITraining·프런트를 하나의 실행 가능한 MVP로 합치고, 더미 화면을 실제 API에 연결하는 작업을 진행했습니다.

## 아키텍처

`AI_PROVIDER=openai`이면 선택한 과목의 ChromaDB 검색 근거를 OpenAI에 전달합니다. API 키가 없거나 호출이 실패하면 규칙 기반 답변으로 대체합니다. RAG가 없으면 MySQL 어휘 검색으로 폴백합니다.

## 구현 범위

- 이메일 회원가입/로그인, Argon2 해싱, JWT 인증
- 학습방 생성, 6자리 초대 코드 참여, 인원 제한
- 과목별 학습방과 AI 세션, 답변 평가, 후속 질문
- 고1 수학 자료 10건 자동 DB 인덱싱
- 학습 종료 시 정리노트, RAG 기반 복습 퀴즈
- 홈 통계, 캘린더, 마이페이지 실데이터 연동
- JWT·학습방 권한 검사를 적용한 실시간 그룹 채팅
- 두 명 이상의 토론 의견을 단원 자료 근거로 비교하는 공동 하브루타 AI 분석
- Railway Docker 배포 (MySQL · Redis · Backend · Frontend)
- SQLite 단위/통합 테스트와 MySQL HTTP 스모크 테스트

## 기술 스택

- Backend: Python, FastAPI, SQLAlchemy, MySQL, Redis, JWT
- Frontend: React, Vite
- AI: OpenAI Responses API, ChromaDB, 선택적 Ollama
- Infra: Docker, Railway

## 이 프로젝트에서 배운 점

모델 호출 한 번으로 “AI 서비스”가 되지 않습니다. 인증, 권한, 학습 기록, 검색 근거, 실패 시 폴백, 배포 환경이 같이 있어야 학생이 실제로 공부할 수 있습니다.

브랜치를 합치는 일도 단순 merge가 아니었습니다. SQLite와 MySQL 모델을 정리하고, 프런트 더미를 API로 바꾸며, RAG 자료를 DB에 인덱싱해야 로컬부터 배포까지 같은 흐름이 됐습니다.
