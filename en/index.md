---
layout: page
title: Selected work
permalink: /en/
locale: en
pair: /
---

Notes on products I shipped — Toss mini-apps, a graduation AI tutor, and mobile apps.

{% assign en_posts = site.posts | where: "locale", "en" %}
<ul class="content">
{% for post in en_posts %}
  <li class="mb-4">
    <h3 class="mt-4 mb-1"><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p class="post-desc mb-1">{{ post.description }}</p>
    <p class="text-muted small mb-0">{{ post.date | date: "%b %-d, %Y" }}{% if post.categories.size > 0 %} · {{ post.categories | join: ", " }}{% endif %}</p>
  </li>
{% endfor %}
</ul>
