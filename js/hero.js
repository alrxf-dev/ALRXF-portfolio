(function(){
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var particleNameEl = document.getElementById("particleName");
    if (reduceMotion) {
      particleNameEl.style.display = "none";
      document.getElementById("heroNameSr").classList.remove("visually-hidden");
    } else {
      new ParticleText(particleNameEl, { text: "Alif Rezky" });
    }

    var frameCount = 30;
    var canvas = document.getElementById("sequence");
    var ctx = canvas.getContext("2d");
    var heroPin = document.getElementById("heroPin");
    var heroCopy = document.getElementById("heroCopy");
    var images = [];
    var currentFrame = -1;

    function frameSrc(i){
      return "assets/frames/frame-" + String(i).padStart(2, "0") + ".jpg";
    }

    for (var i = 1; i <= frameCount; i++){
      var img = new Image();
      img.src = frameSrc(i);
      images.push(img);
    }

    function resizeCanvas(){
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
    }

    function drawFrame(index){
      var img = images[index];
      if(!img || !img.complete || img.naturalWidth === 0) return;
      var cw = canvas.width, ch = canvas.height;
      var iw = img.naturalWidth, ih = img.naturalHeight;
      var scale = Math.max(cw / iw, ch / ih);
      var dw = iw * scale, dh = ih * scale;
      var dx = (cw - dw) / 2, dy = (ch - dh) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
      currentFrame = index;
    }

    images[0].addEventListener("load", function(){
      resizeCanvas();
      drawFrame(0);
    });
    images[Math.floor(frameCount / 2)].addEventListener("load", function(){
      if(reduceMotion) drawFrame(Math.floor(frameCount / 2));
    });

    images.forEach(function(im, idx){
      im.addEventListener("load", function(){
        if(currentFrame === -1){
          resizeCanvas();
          drawFrame(idx);
        }
      });
      im.addEventListener("error", function(){
        console.warn("Frame gagal dimuat:", im.src);
      });
    });

    window.addEventListener("load", function(){
      resizeCanvas();
      if(currentFrame === -1){
        for(var k = 0; k < images.length; k++){
          if(images[k].complete && images[k].naturalWidth > 0){ drawFrame(k); break; }
        }
      } else {
        drawFrame(currentFrame);
      }
    });

    var ticking = false;
    function update(){
      ticking = false;
      var scrollableHeight = heroPin.offsetHeight - window.innerHeight;
      var rectTop = heroPin.getBoundingClientRect().top;
      var scrolled = Math.min(Math.max(-rectTop, 0), Math.max(scrollableHeight, 1));
      var progress = scrollableHeight > 0 ? scrolled / scrollableHeight : 0;
      var frameIndex = Math.min(frameCount - 1, Math.floor(progress * frameCount));
      if(frameIndex !== currentFrame){ drawFrame(frameIndex); }

      var fade = Math.min(progress / 0.25, 1);
      heroCopy.style.opacity = String(1 - fade);
      heroCopy.style.transform = "translateY(" + (fade * -26) + "px)";
    }

    function onScroll(){
      if(!ticking){ ticking = true; requestAnimationFrame(update); }
    }

    if(!reduceMotion){
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", function(){ resizeCanvas(); update(); });
      resizeCanvas();
      update();
    } else {
      resizeCanvas();
      window.addEventListener("resize", function(){
        resizeCanvas();
        drawFrame(currentFrame >= 0 ? currentFrame : Math.floor(frameCount / 2));
      });
    }

    (function(){
      var techLogos = [
        { name: "HTML", icon: "https://cdn.simpleicons.org/html5", url: "https://developer.mozilla.org/docs/Web/HTML" },
        { name: "CSS", icon: "https://cdn.simpleicons.org/css", url: "https://developer.mozilla.org/docs/Web/CSS" },
        { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript", url: "https://developer.mozilla.org/docs/Web/JavaScript" },
        { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript", url: "https://www.typescriptlang.org/" },
        { name: "React", icon: "https://cdn.simpleicons.org/react", url: "https://react.dev/" },
        { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff", url: "https://nextjs.org/" },
        { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss", url: "https://tailwindcss.com/" },
        { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs", url: "https://nodejs.org/" },
        { name: "Git", icon: "https://cdn.simpleicons.org/git", url: "https://git-scm.com/" },
        { name: "GitHub", icon: "https://cdn.simpleicons.org/github/ffffff", url: "https://github.com/" },
        { name: "Figma", icon: "https://cdn.simpleicons.org/figma", url: "https://figma.com/" },
        { name: "Docker", icon: "https://cdn.simpleicons.org/docker", url: "https://www.docker.com/" }
      ];

      var extraLogos = [
        { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql", url: "https://www.postgresql.org/" },
        { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb", url: "https://www.mongodb.com/" },
        { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/ffffff", url: "https://vercel.com/" },
        { name: "Vite", icon: "https://cdn.simpleicons.org/vite", url: "https://vite.dev/" },
        { name: "Sass", icon: "https://cdn.simpleicons.org/sass", url: "https://sass-lang.com/" },
        { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase", url: "https://supabase.com/" },
        { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase", url: "https://firebase.google.com/" },
        { name: "Linux", icon: "https://cdn.simpleicons.org/linux/ffffff", url: "https://www.linux.org/" }
      ];

      function buildTrack(track, logos){
        var list = document.createDocumentFragment();
        logos.forEach(function(item){
          var a = document.createElement("a");
          a.className = "hero-logo-item";
          a.href = item.url;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          var img = document.createElement("img");
          img.src = item.icon;
          img.alt = "";
          img.loading = "lazy";
          img.draggable = false;
          var span = document.createElement("span");
          span.textContent = item.name;
          a.appendChild(img);
          a.appendChild(span);
          list.appendChild(a);
        });
        track.appendChild(list);
      }

      function LogoRow(rowEl, trackEl, logos, speed){
        buildTrack(trackEl, logos);
        var singleWidth = 0;
        var offset = 0;
        var hovered = false;
        var lastTime = null;

        function measureAndFill(){
          singleWidth = trackEl.getBoundingClientRect().width;
          if (!singleWidth) return;
          var viewport = rowEl.clientWidth;
          var copies = Math.max(2, Math.ceil(viewport / singleWidth) + 1);
          for (var i = 1; i < copies; i++){ buildTrack(trackEl, logos); }
          singleWidth = trackEl.getBoundingClientRect().width / copies;
        }
        measureAndFill();

        rowEl.addEventListener("mouseenter", function(){ hovered = true; });
        rowEl.addEventListener("mouseleave", function(){ hovered = false; });

        if (reduceMotion) return;

        function tick(time){
          if (lastTime === null) lastTime = time;
          var delta = Math.min(time - lastTime, 50) / 1000;
          lastTime = time;
          if (!hovered && singleWidth > 0){
            offset += speed * delta;
            offset = ((offset % singleWidth) + singleWidth) % singleWidth;
            trackEl.style.transform = "translate3d(" + (-offset) + "px,0,0)";
          }
          requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }

      var row1 = document.getElementById("heroLoop1");
      var track1 = document.getElementById("heroLoopTrack1");
      var row2 = document.getElementById("heroLoop2");
      var track2 = document.getElementById("heroLoopTrack2");
      if (row1 && track1) new LogoRow(row1, track1, techLogos, 42);
      if (row2 && track2) new LogoRow(row2, track2, extraLogos, -34);
    })();

})();
