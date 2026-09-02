---
layout: post
title: "GemSale: curating console and PC deals inside a Toss mini-app"
date: 2026-08-19 09:00:00 +0900
permalink: /en/posts/gamsale/
slug: gamsale
categories: [Project, Frontend]
tags: [react, typescript, toss, webview, ads, promotion, cors]
hidden: true
locale: en
pair: /posts/gamsale/
description: A Toss WebView mini-app that shows Steam, Epic, and console game deals in one feed. CORS snapshots, filters, and the store-exit UX.
---

> CORS, snapshots, ads, promotions, and content filters — a deal-curation product finished under real mini-app constraints.

- **GitHub:** [jin3402/gamsale](https://github.com/jin3402/gamsale)
- **Platform:** Apps in Toss WebView · TDS
- **Role:** Solo — product, engineering, and launch
- **Users:** 300+ to date

Game discounts live on Steam, Epic, Xbox, PlayStation, and Nintendo. Putting them in one place is useful, but console store APIs often fail CORS inside the Toss WebView. TDS, ads, promotion review, and adult-content rules all have to be met. A plain `fetch` is not enough to ship.

## 1. Split platforms on one screen

The feed header is a chip row: `All / Steam / Epic / Xbox / PlayStation / Nintendo`. `All` is the default. Switching a chip keeps the same card layout and filters the store. The heart badge on the right is the wishlist count.

Each card uses key art. A red badge is the discount, a heart is the wishlist control, and the footer is platform, title, and sale/list price. PlayStation *Dead Space Digital Deluxe Edition* might show **-85%**, ₩115,985 → **₩17,386**, next to a Steam title such as *Yoku's Island Express*.

Steam and Epic call CheapShark live. Xbox, PlayStation, and Nintendo use a build-time snapshot, because those APIs fail CORS in production WebView. If `prebuild` fails, the previous snapshot stays so the screen is never empty.

A static top-of-feed is boring, so the highest-discount pool is **shuffled with a session seed**. The first paint loads about 150 deals. Steam/Epic pages are fetched only after the user reaches the end.

![GemSale feed with All tab and discounted cards](/assets/img/posts/gamsale-list.png)
{: .w-50 .shadow .rounded-10 }
_Platform chips, discount badge, and prices sit on one card. The heart is separate from the card tap so users can save a deal without opening the store._
{: .fig-caption }

## 2. Store or share after a tap

Tapping the card body opens a bottom sheet. The user sees discount, title, and platform again, then two actions:

- **Open in store** — jumps to the product or search URL. A full-screen ad runs only here. Ads used to fire on every platform tab change and broke browsing. They now appear only when someone is **about to spend**.
- **Share** — sends name, discount, price, and store link. Toss native share first, Web Share API as fallback.

The heart is not on the sheet. Wishlist writes to device-local storage and never triggers a store jump or an ad.

![Dead Space action sheet](/assets/img/posts/gamsale-actionsheet.png)
{: .w-50 .shadow .rounded-10 }
_Next action for a deal from the feed. The interstitial runs only before the store; share opens immediately._
{: .fig-caption }

## 3. Steam deals are live, and prices convert to KRW

The same screen narrowed to the `Steam` chip. Xbox, PlayStation, and Nintendo come from build-time snapshots, so those lists are frozen at deploy. Steam and Epic call CheapShark live, so the feed differs every time the app opens.

CheapShark returns prices in USD. The won figures on screen are that USD price multiplied by a USD→KRW rate from `open.er-api.com`, cached for an hour. If the rate call fails, `FALLBACK_USD_KRW_RATE` (1,350 by default) takes over, so a price never renders empty. That is how `Serious Sam Classic: The Second Encounter` lands at 1,223원 from 8,229원, a 85% cut.

Deduplication keys on the title string, so separately named products like `The First Encounter` and `The Second Encounter` both survive. That is why one series can show up twice in a row.

![GemSale Steam tab with Gorogoa and Serious Sam deals, and the action sheet for Serious Sam Classic: The First Encounter](/assets/img/posts/gamsale-steam-actionsheet.png)
{: .w-50 .shadow .rounded-10 }
_The feed narrowed to Steam, with the action sheet open. The won prices are CheapShark USD values converted at the fetched rate._
{: .fig-caption }

## Where data and ads attach

Nintendo titles are filtered for adult, sexual, and low-quality keywords at snapshot time and again at runtime. A name mismatch once failed review, so the console name and `brand.displayName` are both `겜세일`.

## Decisions

| Problem | Choice |
|------|------|
| Console-store CORS | Build-time snapshot + last-good fallback |
| Same games always on top | Shuffle the high-discount pool with a session seed |
| Ads on every tab change | Interstitial only when leaving to a store |
| Wanted an infinite list | Paginate Steam/Epic only after the first 150 |
| Adult Nintendo titles | Dual filter at snapshot and runtime |
| Mini-app name rejected | Match console name and `brand.displayName` |

## Stack

- Language / UI: TypeScript, React 18, Vite
- Platform: `@apps-in-toss/web-framework`
- Design system: `@toss/tds-mobile`
- Data: CheapShark, PlayStation GraphQL, Xbox Store Edge, Nintendo KR Store
- Ops: `prebuild` snapshots, `.ait` bundle

## Close

The lesson was not “call more APIs.” It was finishing a product **inside WebView limits, from the feed to the store**. The screens above are the shipped shape.
