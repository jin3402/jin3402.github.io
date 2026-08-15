---
layout: post
title: "Havruta AI Tutor: learning by explaining, not by collecting answers"
date: 2026-08-13 10:00:00 +0900
permalink: /en/posts/havruta-ai-tutor/
slug: havruta-ai-tutor
categories: [Project, Backend]
tags: [python, fastapi, react, rag, openai, railway]
hidden: true
locale: en
pair: /posts/havruta-ai-tutor/
description: A Havruta tutor MVP where students explain ideas to an AI. Branch merge, RAG, auth, realtime chat, and a cloud deploy.
---

This is not a service that only hands answers to high-school students. It is a Havruta web app where they **explain in their own words and get feedback**.

- **GitHub:** [20211400jiho/havruta-ai-tutor](https://github.com/20211400jiho/havruta-ai-tutor)
- **Web app:** [public demo](https://frontend-production-8c41.up.railway.app)
- **API / Swagger:** [docs](https://backend-production-98f3.up.railway.app/docs)
- **Role:** Team — backend, AI, branch integration, deploy

## Learning loop

1. The student picks a topic.
2. The AI asks a first question grounded in the study material.
3. The student explains the idea or solution in their own words.
4. The system scores the answer and names strengths and gaps.
5. The AI asks a follow-up that pushes the next thought.
6. On finish, a study record and summary note are generated.
7. The same material is used to build a review quiz.

## Why the repo had to be merged

The original repository was split by role.

| Branch | Original job |
|--------|-----------|
| `main` | Backend (users, rooms, WebSocket) |
| `AITraining` | Grade-10 math JSON + Chroma search experiments |
| `front` | React/Vite UI |

Each piece ran, but not as one service. I merged backend, AITraining, and frontend into a runnable MVP and pointed dummy screens at real APIs.

## Architecture

```text
Browser (React / Vite)
   ├── REST + JWT ──► FastAPI
   └── WebSocket + JWT ──► Room Chat

FastAPI ── Auth / Rooms / Tutor / Notes / Quizzes / Dashboard
   ├── MySQL
   ├── Redis Pub/Sub
   ├── Chroma / lexical fallback
   └── OpenAI (rule-based reply if the call fails)
```

When `AI_PROVIDER=openai`, Chroma hits for the selected subject are sent to OpenAI. If the key is missing or the call fails, a rule-based reply is used. If RAG is down, MySQL lexical search is the fallback.

## What shipped

- Email signup/login, Argon2 hashing, JWT
- Study rooms, 6-digit invite codes, seat limits
- Per-subject rooms, AI sessions, scoring, follow-up questions
- Auto-index of 10 grade-10 math documents
- Summary notes and RAG review quizzes on session end
- Home stats, calendar, and my-page wired to live data
- Realtime group chat with JWT and room checks
- Railway Docker deploy (MySQL, Redis, backend, frontend)
- SQLite unit/integration tests and MySQL HTTP smoke tests

## Stack

- Backend: Python, FastAPI, SQLAlchemy, MySQL, Redis, JWT
- Frontend: React, Vite
- AI: OpenAI Responses API, ChromaDB, optional Ollama
- Infra: Docker, Railway

## What I learned

One model call is not an “AI product.” Auth, permissions, study history, retrieval evidence, failure fallbacks, and a deploy environment have to exist before a student can actually study.

Merging branches was not a blind merge. SQLite and MySQL models had to line up, frontend mocks had to become APIs, and RAG documents had to be indexed so local and production followed the same path.
