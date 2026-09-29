---
layout: post
title: "Havruta AI Tutor: learning by explaining, not by collecting answers"
date: 2026-08-20 09:00:00 +0900
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

## The flow, on screen

The four screens below follow the order a student actually goes through: start at home, talk with the AI, review with a quiz, then discuss with friends. Dialogue, quizzes, and discussion analysis are all grounded in the curriculum unit the student picked.

### 1. Home: pick up where you left off

Home is built around continuing. `이어서 탐구하기` shows the last unit in progress, with the previous conversation saved, so `대화 이어가기` jumps straight back in. `이번 주 학습 발자국` marks the days a session was finished, and `최근에 마친 학습` links to the summary note generated when each session ended.

![Havruta home screen with a continue-learning card, this week's study days, and recently finished sessions](/assets/img/posts/havruta-home-v2.webp)
{: .shadow .rounded-10 }
_The entry point back into unfinished study. Finished sessions stay as summary notes._
{: .fig-caption }

### 2. Studying with the AI: explain, then get asked back

Steps 2 through 5 happen here. The student explains or asks something in their own words; the AI answers and then asks a question that pushes the next thought. Retrieval is limited to the subject, school level, grade, and unit chosen at the start. The `AITraining` branch originally held nothing but grade-10 math JSON; letting students pick a level and subject was part of the merge.

Each reply has a collapsible `참고한 학습 자료 3개` panel showing the curriculum material it used. `학습목표와 진행` at the top shows how many of the unit's learning objectives the AI has marked as checked.

![Havruta study dialogue with a student question, the AI's explanation and follow-up question, source panels, and a learning-objectives panel](/assets/img/posts/havruta-study-dialogue.webp)
{: .shadow .rounded-10 }
_The AI does not stop at an explanation; it asks the next question. Sources can be expanded under every reply._
{: .fig-caption }

### 3. Review quiz

Review quizzes are built by searching the study material of the unit (step 7). If no grounding material is found, the quiz is not generated and an error is returned, so the app does not invent plausible-looking questions without a source.

![Havruta review quiz with multiple-choice questions on socialization and identity](/assets/img/posts/havruta-quiz.webp)
{: .shadow .rounded-10 }
_Quizzes come from the same unit material as the dialogue._
{: .fig-caption }

### 4. Discussing with friends: realtime chat and AI comparison

Separate from solo study, students in the same room chat in realtime over WebSocket. The connection checks the JWT and room membership.

`AI로 토론 비교하기` only runs once at least two different people have posted. It retrieves material from the selected unit as grounding, compares each participant's recent points for common ground and differences, and proposes the next discussion question. The `자료 644개` next to the unit is how many documents in that unit can be used as grounding.

![Havruta group discussion screen with the collaborative AI analysis panel and a realtime chat between two students](/assets/img/posts/havruta-discussion.webp)
{: .shadow .rounded-10 }
_People talk to each other over WebSocket; the AI compares and summarizes using the unit's material._
{: .fig-caption }

## Why the repo had to be merged

The original repository was split by role.

| Branch | Original job |
|--------|-----------|
| `main` | Backend (users, rooms, WebSocket) |
| `AITraining` | Grade-10 math JSON + Chroma search experiments |
| `front` | React/Vite UI |

Each piece ran, but not as one service. I merged backend, AITraining, and frontend into a runnable MVP and pointed dummy screens at real APIs.

## Architecture

When `AI_PROVIDER=openai`, Chroma hits for the selected subject are sent to OpenAI. If the key is missing or the call fails, a rule-based reply is used. If RAG is down, MySQL lexical search is the fallback.

## What shipped

- Email signup/login, Argon2 hashing, JWT
- Study rooms, 6-digit invite codes, seat limits
- Per-subject rooms, AI sessions, scoring, follow-up questions
- Auto-index of 10 grade-10 math documents
- Summary notes and RAG review quizzes on session end
- Home stats, calendar, and my-page wired to live data
- Realtime group chat with JWT and room checks
- Collaborative AI analysis that compares two or more students' points against unit material
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
