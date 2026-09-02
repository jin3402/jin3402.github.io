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

## 통합이 필요했던 이유

원래 저장소는 역할이 갈라져 있었습니다.

| 브랜치 | 원래 역할 |
|--------|-----------|
| `main` | 백엔드 (회원, 학습방, WebSocket) |
| `AITraining` | 고1 수학 JSON + Chroma 검색 실험 |
| `front` | React/Vite 화면 |

각각은 동작했지만, 처음부터 끝까지 한 서비스로 실행하기는 어려웠습니다. 백엔드·AITraining·프런트를 하나의 실행 가능한 MVP로 합치고, 더미 화면을 실제 API에 연결하는 작업을 진행했습니다.

## 아키텍처

```text
Browser (React / Vite)
   ├── REST + JWT ──► FastAPI
   └── WebSocket + JWT ──► Room Chat

FastAPI ── Auth / Rooms / Tutor / Notes / Quizzes / Dashboard
   ├── MySQL
   ├── Redis Pub/Sub
   ├── Chroma / Lexical fallback
   └── OpenAI (실패 시 규칙 기반 답변)
```

`AI_PROVIDER=openai`이면 선택한 과목의 ChromaDB 검색 근거를 OpenAI에 전달합니다. API 키가 없거나 호출이 실패하면 규칙 기반 답변으로 대체합니다. RAG가 없으면 MySQL 어휘 검색으로 폴백합니다.

## 구현 범위

- 이메일 회원가입/로그인, Argon2 해싱, JWT 인증
- 학습방 생성, 6자리 초대 코드 참여, 인원 제한
- 과목별 학습방과 AI 세션, 답변 평가, 후속 질문
- 고1 수학 자료 10건 자동 DB 인덱싱
- 학습 종료 시 정리노트, RAG 기반 복습 퀴즈
- 홈 통계, 캘린더, 마이페이지 실데이터 연동
- JWT·학습방 권한 검사를 적용한 실시간 그룹 채팅
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
