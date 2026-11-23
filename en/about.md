---
layout: page
title: About
permalink: /en/about/
locale: en
pair: /about/
---

Computer engineering student who has planned, built, and shipped Flutter apps, Toss mini-apps, and an AI learning service. I prefer solving platform constraints (CORS, WebView security, review policy) inside the product rather than around it.

- GitHub: [jin3402](https://github.com/jin3402)
- Email: gng09125@naver.com

## Selected work

### AX Talent War × Samil PwC: contract and campaign approval workflow
A solo one-week **AI operations app** built on a fictional cosmetics group's data. A 2.8B KRW contract auto-renews unless someone acts by July 17; the server recomputes cash to route each draft to the right approver, and the CEO must pick one of three contract options to approve. AI only suggests evidence and terms, and the server keeps only citations that match the source. 134 automated tests pass. Placed in the **top 5%** of the competition.

- [Live app](https://aurora-campaign-approval-34ng.axhub.app)
- [GitHub](https://github.com/jin3402/aurora-campaign-approval)
- [Write-up](/en/posts/samilpwc-campaign-approval/)
- [Top 5% certificate](https://axacademy.ai/axwar/cert/kbHt7cBPUn3l5OlJEOZvkebT)

### Havruta AI Tutor
A Havruta-style learning web app where high-school students explain ideas to an AI and get follow-up questions. FastAPI, React, RAG, and a Railway deploy are wired as one flow. Production serves 302,059 retrieval documents across 9 subjects, and 196 automated tests pass. A comparison experiment showed reranking lifting the evidence hit rate from 66.7% to 75.0%.

- [GitHub](https://github.com/20211400jiho/havruta-ai-tutor)
- [Write-up](/en/posts/havruta-ai-tutor/)

### 겜세일
A Toss mini-app — and now a deal-search website — that puts Steam, Epic, and console game deals in one feed. Build-time snapshots absorb WebView CORS limits; ads, promotions, and content filters are wired for a real review. Because TDS blocks non-Toss domains, the website shares only the data layer and has its own UI with search and all-time-low comparison.

- [Website](https://gamsale.vercel.app)
- [GitHub](https://github.com/jin3402/gamsale)
- [Write-up](/en/posts/gamsale/)

### Midpoint Finder
A Toss mini-app that computes a fair meeting point from several origins and recommends nearby restaurants, cafes, and sights. Kakao Map is rendered directly, and the share / open-in-maps flow is built for real use.

- [GitHub](https://github.com/jin3402/midpoint-finder)
- [Write-up](/en/posts/midpoint-finder/)

### AI Travel
A Flutter team project that recommends destinations after a 7-step preference test. Screens are split into reusable widgets with defensive UI for failed image loads.

- [GitHub](https://github.com/jin3402/ai_travel)
- [Write-up](/en/posts/ai-travel/)

## Stack

- **Frontend:** TypeScript, React, Flutter, Vite, TDS
- **Backend / AI:** Python, FastAPI, MySQL, Redis, RAG, OpenAI
- **macOS Native:** Swift, AppKit, Accessibility API
- **Platform:** Apps in Toss (WebView), Vercel, GitHub Pages, Railway
