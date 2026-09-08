(function(){
  "use strict";

    (function(){
      var musicBtn = document.getElementById("musicToggle");
      var audio = document.getElementById("bgAudio");
      if (!musicBtn || !audio) return;

      audio.volume = 0.55;

      musicBtn.addEventListener("click", function(){
        if (audio.paused) {
          audio.play().catch(function(){

          });
        } else {
          audio.pause();
        }
      });

      audio.addEventListener("play", function(){
        musicBtn.classList.add("is-playing");
        musicBtn.setAttribute("aria-pressed", "true");
        musicBtn.setAttribute("aria-label", Site.i18n.dict[Site.i18n.lang].music_pause);
      });
      audio.addEventListener("pause", function(){
        musicBtn.classList.remove("is-playing");
        musicBtn.setAttribute("aria-pressed", "false");
        musicBtn.setAttribute("aria-label", Site.i18n.dict[Site.i18n.lang].music_play);
      });
    })();

    var copyBtn = document.getElementById("copyNumber");
    copyBtn.addEventListener("click", function(){
      var number = "+6282192401340";
      var done = function(){
        var original = Site.i18n.dict[Site.i18n.lang].contact_copy;
        copyBtn.textContent = Site.i18n.lang === "id" ? "tersalin" : "copied";
        setTimeout(function(){ copyBtn.textContent = original; }, 1800);
      };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(number).then(done).catch(done);
      } else {
        done();
      }
    });

    document.getElementById("year").textContent = new Date().getFullYear();

})();
