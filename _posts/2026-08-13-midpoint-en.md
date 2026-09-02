---
layout: post
title: "Midpoint Finder: picking a fair meetup inside a Toss mini-app"
date: 2026-08-18 09:00:00 +0900
permalink: /en/posts/midpoint-finder/
slug: midpoint-finder
categories: [Project, Frontend]
tags: [react, typescript, toss, webview, kakao-maps, ads]
hidden: true
locale: en
pair: /posts/midpoint-finder/
description: A Toss WebView mini-app that finds a midpoint from several origins and recommends nearby restaurants, cafes, and sights.
---

A Toss mini-app for the “where should we meet?” problem. Enter several origins, get a midpoint, then nearby restaurants, cafes, and sights.

- **GitHub:** [jin3402/midpoint-finder](https://github.com/jin3402/midpoint-finder)
- **Platform:** Apps in Toss WebView · TDS
- **Role:** Solo — product, engineering, and review

I shipped it as a mini-app so friends can open it inside Toss with no extra install. That meant TDS, WebView security, and console review (icon and app name) had to be correct.

## 1. Collecting origins

The first screen is a stack of origin cards. It starts at two people. `+ Add person` grows the list; `Delete` shrinks it. Placeholders such as `Gangnam Station, Seoul Station` accept keywords. A full street address is not required — Kakao place search resolves coordinates.

The sticky bottom banner is the Toss ads SDK. The search button has no interstitial. An ad in the middle of “compute the midpoint” would break the flow.

![Origin input screen](/assets/img/posts/midpoint-input.png)
{: .w-50 .shadow .rounded-10 }
_Empty input. Origins can be added or removed. Only the banner stays fixed at the bottom._
{: .fig-caption }

A filled example: `Gangnam-gu Office Station Line 7`, `Nowon Station Line 4`, `Eulwangni Beach`. Distant points turn the problem into “which neighborhood can we actually meet in,” not a raw average. Two or more characters trigger address autocomplete. Kakao `keywordSearch` is called with a 250ms debounce.

![Three distant origins filled in](/assets/img/posts/midpoint-filled.png)
{: .w-50 .shadow .rounded-10 }
_Southeast Seoul, northern Seoul, and an Incheon beach still go through the same flow._
{: .fig-caption }

`Find midpoint` geocodes each keyword and takes an arithmetic mean only when two or more points are valid. Failed lookups are dropped. Fewer than two points shows an error.

## 2. Map result and nearby picks

The Kakao map draws immediately. Toss WebView blocks `<iframe>`, so the JS SDK mounts into a `useRef` container. Blue, gray, and green pins (1, 2, 3) are origins; a purple `M` is the midpoint. Bounds fit all four points.

The purple card under the map is reverse-geocoding. The UI shows an **admin neighborhood**, such as `Sinwol 5-dong, Yangcheon-gu, Seoul`, because a neighborhood name is easier to share than raw coordinates. `Share` on the card sends that neighborhood plus a Naver Map link.

Recommendations use `Food` / `Cafe` / `Sights` tabs (Kakao codes FD6, CE7, AT4). Each query caps at 45 results, so the client widens the radius from 3 km to 20 km, de-dupes, and keeps up to 50 places by distance. `Showing 10 of 45` is the first page; `More` loads the rest.

![Map with origins, midpoint M, and a food list](/assets/img/posts/midpoint-result.png)
{: .w-50 .shadow .rounded-10 }
_Map, midpoint card, and category list on one screen. A kimbap shop 68 m away sits at the top of Food._
{: .fig-caption }

Tapping a row used to only drop a marker. It now asks **what to do with that place**.

## 3. Share or leave to a map app

A bottom sheet shows the place name and road address, then three actions:

- **Share** — name, address, and a Naver Map search link go to the system share sheet. A successful share or clipboard copy grants a promotion reward once per device.
- **Open in Kakao Map** — `place_url` when present, otherwise a name+address search.
- **Open in Naver Map** — `map.naver.com` search URL.

A full-screen ad runs only when leaving to a map app. `openURL` launches the device browser or map app, with a new-tab fallback.

![Place action sheet](/assets/img/posts/midpoint-actionsheet.png)
{: .w-50 .shadow .rounded-10 }
_The real next step after picking a recommendation. The interstitial runs only before a map app._
{: .fig-caption }

## Review and build blockers

| Issue | Cause | Fix |
|------|------|------|
| Brand icon rejected | Console icon ≠ `granite.config.ts` | Use the exact console image URL |
| Mini-app name rejected | `displayName` ≠ console name | Unify on `중간지점찾기` |
| Build command failed | `granite build` → `ait build` | Update `package.json`, rebuild `.ait` |
| Interstitial on search | Broke the compute UX | Move the ad to map-exit |
| Kakao 45-result cap | API page limit | Widen radius in steps and de-dupe |

## Stack

- React, TypeScript, Vite
- Apps in Toss Web Framework
- Kakao Maps JavaScript SDK (Places, Geocoder)
- Toss Design System
- TossAds Banner / FullScreen Ad, `grantPromotionReward`

## Close

The centroid math was the short part. The long part was **input → map → share / directions as one flow inside Toss**. The screens above are that result.
