---
layout: post
title: "Safety-Map: safer routes and a one-tap SOS"
date: 2026-05-07 13:00:00 +0900
permalink: /en/posts/safety-map-project/
slug: safety-map-project
categories: [Project, Mobile]
tags: [Flutter, GoogleMaps, Security, DefensiveProgramming]
hidden: true
locale: en
pair: /posts/safety-map-project/
description: A cross-platform Flutter app for live location, nearby safe spots, and one-tap emergency calls.
---

> A cross-platform app that helps people move safely and call for help in one tap.

A team project. Safety-Map combines Google Maps live tracking with an emergency request flow.

## Features

### Live safety map
- `maps_flutter` and `geolocator` track the user in real time.
- Nearby safe spots (police, fire stations) are drawn on the map.

### One-tap SOS
- A single control starts the emergency path.
- `url_launcher` calls a saved contact or 112/119 and can send a location message.

### Local settings
- `shared_preferences` stores the emergency list and notification flags on device.

## Architecture notes

### Defensive programming
API keys live in a `.env` file that is not committed. `main.dart` wraps startup in `try-catch` so a missing env file does not crash the app.

### Named routes
Transitions are not hardcoded. Routes such as `/splash`, `/login`, and `/home` sit in one table.

### Material 3
A blue seed (`#2567E8`) keeps the brand consistent and readable.

## Stack
- **Framework:** Flutter (Dart)
- **Map & location:** Google Maps API, geolocator
- **Network & storage:** REST (`http`), shared_preferences
- **System & security:** flutter_dotenv, permission_handler

## Links
- [GitHub repository](https://github.com/jin3402/Safety-Map)
