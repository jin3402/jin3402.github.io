---
layout: post
title: "ScreenSwap: a macOS menu bar app for moving windows between two displays"
date: 2026-08-31 09:00:00 +0900
permalink: /en/posts/screenswap/
slug: screenswap
categories: [Project, macOS]
tags: [swift, appkit, macos, accessibility, window-manager]
hidden: true
locale: en
pair: /posts/screenswap/
description: A macOS menu bar app that moves and arranges windows between a MacBook display and an external monitor from the keyboard. Overlapping windows physically fan apart, several can be picked and acted on at once, and every move can be undone.
---

> What Mission Control does — redrawing every window's live texture at a new position — is private API, off-limits to third-party apps. ScreenSwap takes the honest route instead: it moves the real windows through the Accessibility API, so what's on screen is always a live window, never a screenshot.

- **GitHub:** [jin3402/ScreenSwap](https://github.com/jin3402/ScreenSwap)
- **Platform:** macOS 14+ · Swift, AppKit, Accessibility API
- **Role:** Solo / design and development

Working across a MacBook display and an external monitor means losing track of which screen a window is on, and overlapping windows get hard to pick apart. Rectangle-style tools focus on arranging *the current* window; switchers like AltTab or Witch focus on picking *one* window to activate. ScreenSwap sits between the two — picking and acting on several windows across both displays at once.

## 1. One shortcut opens the overview

⌃⌥↑ opens a full-screen overlay. Arrow keys only move a focus cursor — nothing moves yet — and tapping Shift selects the focused window before you decide what to do with it (send, split, full-screen, quit). Separating *aiming* from *acting* was the key design call: an early version moved windows the instant you released Shift, and picking a window kept accidentally moving it.

![Calculator, Safari, and TextEdit windows piled on top of each other](/assets/img/posts/screenswap-before.png)
{: .shadow .rounded-10 }
_Calculator, Safari, and TextEdit overlapping — none of them is a clean click target._
{: .fig-caption }

Pressing ⌃⌥↑ physically fans the overlapping windows apart and numbers them, ready to act on immediately.

![The overlay open, all three windows spread apart with Calculator outlined in white](/assets/img/posts/screenswap-overlay.png)
{: .shadow .rounded-10 }
_Calculator (1) starts focused, marked by the white ring. The footer shows exactly what every key does right now._
{: .fig-caption }

## 2. Real windows, never a screenshot

Mission Control composites every window's live texture at a new position inside the window server — private API, unavailable to third-party apps. That leaves two honest options: capture windows as static images and lay them out (what Witch and AltTab do), or move the real windows through Accessibility. ScreenSwap does the latter. Opening the overlay genuinely moves overlapping windows apart, and however it closes — Esc, an action, clicking another app — they land back exactly where they were.

That has a real cost. Shrinking a window makes editors collapse sidebars and browsers reflow text; restoring the size brings the layout back, but something like scroll position isn't always guaranteed to return exactly. Past ten windows, fanning out takes a visible beat. In exchange, everything on screen is always a real window. If the app dies mid-session, the original positions are journaled to disk first, so the next launch can offer to restore them.

## 3. Acting on several windows at once

Each Shift tap adds the focused window to a running selection — the same feel as extending a range with Shift+arrow in a file list. Once something is selected:

- **⌘ + arrows** — send every selected window to the display in that direction
- **⌘2 / ⌘3 / ⌘4** — tile overlapping windows into an even 2-, 3-, or 4-way split on the spot (past four, extras stack on the last slot)
- **Enter / ⌫** — enter or exit full screen
- **⌘Q** — quit the apps behind the selection (a real quit request, so an unsaved document still gets its save sheet)
- **space** — swap every window between both displays; a group that was overlapping lands tiled on the other side instead of piling up again
- **⌘Z** — undo the last move

## Where it got stuck

| Issue | Cause | Fix |
|---|---|---|
| Arrow keys did nothing at all | macOS always sets a `.function` flag on arrow keys, and the "no other modifiers" check compared against the full flag set, rejecting every press | Mask down to just shift/control/option/command before comparing |
| The overlay never appeared on the secondary display | AppKit auto-shoves a window frame down so it can't cover the menu bar (`constrainFrameRect`), silently relocating the secondary panel every time | Override `constrainFrameRect` to pass the frame through unchanged |
| On two side-by-side monitors, the down arrow resolved to the wrong display | A few pixels of vertical centre offset (monitors of different heights) was enough to satisfy the directional check | Require the requested axis's displacement to dominate the perpendicular one |
| Swapping an app with several windows silently dropped some of them | Matching CG windows to Accessibility elements one at a time let several CG windows compete for the same AX element, leaving the rest unmatched | Rewrote matching as a one-time, per-process batch assignment |
| ⌘2/3/4 split didn't work on the secondary display | With nothing selected, "which display" was resolved from the aim cursor, which starts wherever the frontmost app was *before* the overlay opened | For a whole-display action, prefer whichever display the mouse is actually over |
| Tab-to-activate didn't visually raise some windows | Some apps (Electron-based ones especially) accept the `AXRaise` action without actually reordering their windows | Also set `AXMain` and `AXFocused` explicitly |

## Stack

- Swift, AppKit
- Accessibility API (`AXUIElement`) — reading the window list, moving windows, shifting focus
- Carbon Hot Key API — system-wide global shortcuts
- Localization (Korean/English), launch-at-login via `SMAppService`

## Closing thoughts

The part that took longest wasn't the code that moves windows — it was keeping AppKit's coordinate space and CoreGraphics's from ever getting mixed up. One has its origin at the bottom-left with y increasing upward; the other has its origin at the top-left with y increasing downward. Every bug in the table above eventually traced back to that: whether two monitors sit side by side or stacked, and whether a secondary display's origin happens to be negative.
