(function(){
  "use strict";

  window.Site = window.Site || {};

  var ENTITY_MAP = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
  };

  function escapeHTML(input){
    var str = String(input == null ? "" : input);
    return str.replace(/[&<>"'\/]/g, function(ch){ return ENTITY_MAP[ch]; });
  }

  function isSafeUrl(url){
    try {
      var parsed = new URL(String(url), window.location.href);
      return parsed.protocol === "https:" || parsed.protocol === "http:" || parsed.protocol === "mailto:";
    } catch (err) {
      return false;
    }
  }

  function safeGetById(id){
    var el = document.getElementById(id);
    if (el && el instanceof HTMLElement && el.id === id) {
      return el;
    }
    return null;
  }

  function setText(el, value){
    if (!el || !(el instanceof HTMLElement)) return;
    el.textContent = String(value == null ? "" : value);
  }

  function clearNode(el){
    if (!el || !(el instanceof HTMLElement)) return;
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function hardenExternalLinks(root){
    var scope = root && root.querySelectorAll ? root : document;
    var links = scope.querySelectorAll('a[target="_blank"]');
    links.forEach(function(a){
      var rel = (a.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
      if (rel.indexOf("noopener") === -1) rel.push("noopener");
      if (rel.indexOf("noreferrer") === -1) rel.push("noreferrer");
      a.setAttribute("rel", rel.join(" "));
      if (!isSafeUrl(a.href)) {
        a.removeAttribute("href");
      }
    });
  }

  Site.security = {
    escapeHTML: escapeHTML,
    isSafeUrl: isSafeUrl,
    safeGetById: safeGetById,
    setText: setText,
    clearNode: clearNode,
    hardenExternalLinks: hardenExternalLinks
  };

  if (Object.freeze) {
    Object.freeze(Site.security);
  }

  document.addEventListener("DOMContentLoaded", function(){
    hardenExternalLinks(document);
  });
})();
