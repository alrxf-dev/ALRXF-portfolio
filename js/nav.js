(function(){
  "use strict";

    var nav = document.getElementById("siteNav");
    var navLinks = document.getElementById("navLinks");
    var navToggle = document.getElementById("navToggle");

    function onNavScroll(){
      nav.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    window.addEventListener("scroll", onNavScroll, { passive: true });
    onNavScroll();

    navToggle.addEventListener("click", function(){
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open);
    });
    navLinks.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    var dock = document.getElementById("dock");
    var dockItems = Array.prototype.slice.call(document.querySelectorAll(".dock-item"));
    var DOCK_BASE = 48, DOCK_MAX = 66, DOCK_DISTANCE = 190;

    dock.addEventListener("pointermove", function(e){
      var mouseX = e.clientX;
      dockItems.forEach(function(item){
        var rect = item.getBoundingClientRect();
        var center = rect.left + rect.width / 2;
        var distance = Math.abs(mouseX - center);
        var factor = 1 - distance / DOCK_DISTANCE;
        factor = Math.max(0, Math.min(1, factor));
        factor = (Math.cos((1 - factor) * Math.PI) + 1) / 2;
        var size = DOCK_BASE + (DOCK_MAX - DOCK_BASE) * factor;
        item.style.width = size + "px";
        item.style.height = size + "px";
        item.style.transform = "translateY(" + (-factor * 4) + "px)";
      });
      dock.style.height = "96px";
    });

    dock.addEventListener("pointerleave", function(){
      dockItems.forEach(function(item){
        item.style.width = "";
        item.style.height = "";
        item.style.transform = "";
      });
      dock.style.height = "68px";
    });

    var dockSectionIds = ["heroPin", "about", "location", "skills", "work", "hobby", "faq", "contact"];
    var dockSections = dockSectionIds.map(function(id){ return document.getElementById(id); }).filter(Boolean);

    if ("IntersectionObserver" in window && dockSections.length) {
      var dockObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          dockItems.forEach(function(item){
            var href = item.getAttribute("href").replace("#", "");
            var isMatch = (id === "heroPin" && href === "top") || href === id;
            item.classList.toggle("active", isMatch);
          });
        });
      }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

      dockSections.forEach(function(el){ dockObserver.observe(el); });
    }

    var magnetic = document.querySelector(".magnetic");
    if(magnetic && window.matchMedia("(hover: hover)").matches){
      magnetic.style.transition = "transform .25s cubic-bezier(.2,.8,.2,1), color .35s ease";
      magnetic.addEventListener("mousemove", function(e){
        var rect = magnetic.getBoundingClientRect();
        var x = (e.clientX - rect.left - rect.width / 2) * 0.28;
        var y = (e.clientY - rect.top - rect.height / 2) * 0.45;
        magnetic.style.transform = "translate(" + x + "px," + y + "px)";
      });
      magnetic.addEventListener("mouseleave", function(){
        magnetic.style.transform = "translate(0,0)";
      });
    }

})();
