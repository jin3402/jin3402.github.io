---
layout: post
title: "AI Travel: picking a destination with a preference test in Flutter"
date: 2026-08-17 09:00:00 +0900
permalink: /en/posts/ai-travel/
slug: ai-travel
categories: [Project, Frontend]
tags: [flutter, dart, uiux, mobile]
hidden: true
locale: en
pair: /posts/ai-travel/
description: A Flutter team project that recommends destinations after a 7-step preference test. Widget modularization and defensive UI.
---

## Overview

A team project. **AI_TRAVEL** reduces planning overload by reading user preferences and suggesting a matching trip. I built the mobile UI in Flutter and shaped the overall app structure.

---

## What I built

### 1. Preference test and personalized UI
A 7-step, MBTI-style test captures taste.
- **State:** each tap updates state and moves to the next step without a jarring reset.
- **Dynamic render:** the destination screen changes from the stored preference profile.


![Travel preference test, question 1 of 7, progress at 0%](/assets/img/posts/aitravel-test.png)
{: .w-50 .shadow .rounded-10 }
_The `1 / 7` counter and the progress bar move together. Tapping an option advances immediately._
{: .fig-caption }

A finished test collapses the answers into a four-axis code such as `JRSC` — planning (J) or spontaneity (P), value (R) or luxury (L), solo (S) or group (G), plus activity, culture, or rest (A/C/R) — with a percentage on each axis.

That code is the input to the recommendation screen. In the Kyoto result below, every reason traces back to an axis: temples good for an unhurried solo visit is S, cheap admission and a sensible plan on public transit is R and J, and well-preserved heritage is C. The same city comes back with different reasons and different sights for a different profile.

![The JRSC preference result screen next to the Kyoto, Japan recommendation it produced](/assets/img/posts/aitravel-result.png)
{: .shadow .rounded-10 }
_Result on the left, the recommendation built from it on the right._
{: .fig-caption }

### 2. A dashboard with visual hierarchy
Mobile screens are small, so hierarchy mattered more than packing every fact.
- **Horizontal ListView:** destinations can be scanned in a sideways strip.
- **Stack overlay:** text and flag icons sit on a background image so density stays high without losing the first read.


![AI Travel home screen with a destination prompt, a favorites carousel, a recommended-destination carousel, and a bottom tab bar](/assets/img/posts/aitravel-home.png)
{: .w-50 .shadow .rounded-10 }
_The favorites row and the "how about these?" row are the sideways strips, each with arrows. City names and flags sit over the background image._
{: .fig-caption }

The bottom tab bar keeps an emergency call and the FX calculator one tap away. That is where the next section's viewer hangs.

### 3. Practical info cards
FX rates and emergency contacts sit in card UI for use on the ground. Buttons are large and type is high-contrast for urgent reads.

---

## Design choices

### Widget modularization
UI is split by job so the tree stays maintainable.
- Repeated pieces such as `AppBar` and `DestinationCard` live in their own classes or builders.
- New screens reuse those modules instead of copying layout code.

### Defensive UI
Mobile networks fail.
- **Image errors:** `errorBuilder` shows a clean placeholder instead of a broken layout.
- **Data shape:** mock data uses the same structure as a future API so screens can be verified before the backend lands.

---

## Close

The useful part was not making a pretty screen. It was delivering convenience in a form that still holds when the network does not. Flutter’s widget system was the tool for that architecture.

<br>

- **Repository:** [GitHub: ai_travel](https://github.com/jin3402/ai_travel)
