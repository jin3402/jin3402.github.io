(function () {
  var STORAGE_KEY = "site-lang";

  function currentLang() {
    return location.pathname === "/en" ||
      location.pathname === "/en/" ||
      location.pathname.indexOf("/en/") === 0
      ? "en"
      : "ko";
  }

  function toEnglish(path) {
    if (path === "/en" || path === "/en/" || path.indexOf("/en/") === 0) return path;
    if (path === "/" || path === "") return "/en/";
    if (path.indexOf("/about") === 0) return "/en/about/";
    if (path.indexOf("/posts/") === 0) return "/en" + path;
    return "/en/";
  }

  function toKorean(path) {
    if (path === "/en" || path === "/en/") return "/";
    if (path.indexOf("/en/about") === 0) return "/about/";
    if (path.indexOf("/en/posts/") === 0) return path.replace("/en", "");
    return "/";
  }

  function go(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    var next = lang === "en" ? toEnglish(location.pathname) : toKorean(location.pathname);
    if (next !== location.pathname) location.href = next;
  }

  function translateChrome(lang) {
    document.documentElement.lang = lang;

    var labels = {
      en: {
        "/": "Home",
        "/about/": "About",
        "/archives/": "Archives",
        "/categories/": "Categories",
        "/tags/": "Tags"
      },
      ko: {
        "/": "홈",
        "/about/": "About",
        "/archives/": "Archives",
        "/categories/": "Categories",
        "/tags/": "Tags"
      }
    };

    document.querySelectorAll("#sidebar a.nav-link, #sidebar a").forEach(function (link) {
      var href = link.getAttribute("href") || "";
      var key = href.replace(/index\.html$/, "");
      if (key.length > 1 && key.slice(-1) !== "/") key += "/";
      if (key === "") key = "/";

      if (lang === "en") {
        if (key === "/" || key === "/index.html") link.setAttribute("href", "/en/");
        if (key === "/about/") link.setAttribute("href", "/en/about/");
      }

      var map = labels[lang];
      var textKey = key === "/en/" ? "/" : key === "/en/about/" ? "/about/" : key;
      if (map[textKey] && link.querySelector("span")) {
        link.querySelector("span").textContent = map[textKey];
      } else if (map[textKey] && link.childNodes.length) {
        var last = link.childNodes[link.childNodes.length - 1];
        if (last && last.nodeType === 3) last.textContent = " " + map[textKey];
      }
    });

    var trending = document.getElementById("access-tags");
    if (trending) {
      var heading = trending.querySelector("h2, .panel-heading, .access-title");
      if (heading) heading.textContent = lang === "en" ? "Trending Tags" : heading.textContent;
    }
  }

  function mountToggle(lang) {
    if (document.getElementById("lang-switch")) return;

    var wrap = document.createElement("div");
    wrap.id = "lang-switch";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Language");

    function makeBtn(code, label) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = label;
      btn.setAttribute("aria-pressed", code === lang ? "true" : "false");
      if (code === lang) btn.className = "is-active";
      btn.addEventListener("click", function () {
        go(code);
      });
      return btn;
    }

    wrap.appendChild(makeBtn("ko", "한"));
    wrap.appendChild(makeBtn("en", "EN"));

    var topbar = document.getElementById("topbar") || document.getElementById("topbar-wrapper");
    var before =
      document.getElementById("mode-toggle") ||
      document.getElementById("search-trigger") ||
      document.getElementById("search-toggle");
    if (before && before.parentNode) {
      before.parentNode.insertBefore(wrap, before);
    } else if (topbar) {
      topbar.appendChild(wrap);
    } else {
      document.body.insertBefore(wrap, document.body.firstChild);
    }
  }

  function hideOtherLocaleLists(lang) {
    var selector = lang === "ko" ? 'a[href*="/en/posts/"]' : 'a[href^="/posts/"]';
    document.querySelectorAll(selector).forEach(function (link) {
      if (lang === "en" && link.getAttribute("href").indexOf("/en/posts/") === 0) return;
      var item = link.closest("article, li, .card-wrapper, .preview-img, .post");
      if (item) item.style.display = "none";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var lang = currentLang();
    mountToggle(lang);
    translateChrome(lang);
    hideOtherLocaleLists(lang);
  });
})();
