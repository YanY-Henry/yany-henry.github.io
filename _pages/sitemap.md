---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

All the main pages on this website. An [XML sitemap]({{ site.url }}/sitemap.xml) is also available.

<ul>
{% for link in site.data.navigation.main %}
  <li><a href="{{ site.url }}{{ site.baseurl }}{{ link.url }}">{{ link.title }}</a></li>
{% endfor %}
</ul>
