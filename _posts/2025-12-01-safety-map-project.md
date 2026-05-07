---
title: "Safety-Map: 안전한 길찾기 및 안심 귀가 서비스 개발"
author: 이진형
date: 2026-05-09 10:00:00 +0900
categories: [Project, Mobile]
tags: [Flutter, GoogleMaps, Security, DefensiveProgramming]
---

> **"사용자의 안전한 이동을 보장하고, 위급 상황 시 즉각적인 대응을 돕는 크로스 플랫폼 애플리케이션"**

'Safety-Map'은 구글 맵 기반의 실시간 위치 추적과 긴급 구조 요청 기능을 통합하여, 사용자의 안전을 지켜주는 서비스입니다.

---

## ✨ Key Features (주요 기능)

### 📍 실시간 안전 지도 (Safety Map)
- `Maps_flutter`와 `geolocator`를 활용하여 사용자의 실시간 위치를 추적합니다.
- 주변의 안전 스팟(경찰서, 소방서 등)을 지도 상에 시각화하여 제공합니다.

### 🚨 원터치 긴급 호출 (Quick SOS)
- 위급 상황 시 단 한 번의 터치로 작동하도록 설계되었습니다.
- `url_launcher`를 통해 사전에 등록된 비상 연락처 및 112/119로 즉시 전화 연결 및 위치 메시지를 전송합니다.

### ⚙️ 사용자 맞춤 설정 (Custom Settings)
- `shared_preferences`를 활용해 개인별 비상 연락망과 앱 알림 설정을 기기 로컬에 안전하게 저장합니다.
