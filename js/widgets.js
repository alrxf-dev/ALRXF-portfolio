(function(){
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (function(){
      var mac = document.getElementById("macbookMini");
      if (!mac) return;
      if (reduceMotion){
        mac.classList.add("in-view");
        return;
      }
      if (!("IntersectionObserver" in window)){
        mac.classList.add("in-view");
        return;
      }
      var macObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting){
            mac.classList.add("in-view");
            macObserver.disconnect();
          }
        });
      }, { threshold: 0.35 });
      macObserver.observe(mac);
    })();

    (function(){
      var hoursEl = document.getElementById("workHours");
      var minutesEl = document.getElementById("workMinutes");
      if (!hoursEl || !minutesEl) return;
      function updateClock(){
        var now = new Date();
        hoursEl.textContent = String(now.getHours()).padStart(2, "0");
        minutesEl.textContent = String(now.getMinutes()).padStart(2, "0");
      }
      updateClock();
      setInterval(updateClock, 1000);
    })();

    (function(){
      var container = document.getElementById("orbitShowcase");
      var stage = document.getElementById("orbitStage");
      var itemsWrap = document.getElementById("orbitItems");
      if (!container || !stage || !itemsWrap) return;

      var orbitImages = [
        "https://files.catbox.moe/y4voo3.jpg",
        "https://files.catbox.moe/e809ht.jpg",
        "https://files.catbox.moe/j1z7ud.jpg",
        "https://files.catbox.moe/j7pz5a.jpeg",
        "https://files.catbox.moe/n6nf7z.jpg",
        "https://files.catbox.moe/n33fw4.jpg"
      ];
      var radiusX = 340, radiusY = 80, duration = 30;

      function setScale(){
        var scale = container.clientWidth / 1400;
        stage.style.setProperty("--orbit-scale", Math.min(scale, 1));
      }
      setScale();
      if ("ResizeObserver" in window){
        new ResizeObserver(setScale).observe(container);
      } else {
        window.addEventListener("resize", setScale);
      }

      var elements = orbitImages.map(function(src){
        var el = document.createElement("div");
        el.className = "orbit-item";
        var img = document.createElement("img");
        img.className = "orbit-image";
        img.src = src;
        img.alt = "";
        img.draggable = false;
        img.loading = "lazy";
        img.addEventListener("error", function(){ el.style.display = "none"; });
        el.appendChild(img);
        itemsWrap.appendChild(el);
        return el;
      });

      if (reduceMotion){
        elements.forEach(function(el, i){
          var angle = (i / elements.length) * Math.PI * 2;
          var x = Math.cos(angle) * radiusX;
          var y = Math.sin(angle) * radiusY;
          el.style.transform = "translate(" + x + "px," + y + "px)";
        });
        return;
      }

      var paused = false;
      if ("IntersectionObserver" in window){
        var orbitObserver = new IntersectionObserver(function(entries){
          entries.forEach(function(entry){ paused = !entry.isIntersecting; });
        }, { threshold: 0.01 });
        orbitObserver.observe(container);
      }

      var start = performance.now();
      function animate(time){
        requestAnimationFrame(animate);
        if (paused) return;
        var progress = ((time - start) / 1000 / duration) % 1;
        elements.forEach(function(el, i){
          var angle = (progress + i / elements.length) * Math.PI * 2;
          var x = Math.cos(angle) * radiusX;
          var y = Math.sin(angle) * radiusY;
          el.style.transform = "translate(" + x + "px," + y + "px)";
        });
      }
      requestAnimationFrame(animate);
    })();

})();
