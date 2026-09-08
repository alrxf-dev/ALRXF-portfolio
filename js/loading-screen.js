(function(){
  "use strict";
  var screen = document.getElementById("loadingScreen");
  if(!screen) return;
  document.body.classList.add("is-loading");

  var MIN_TIME = 1400;
  var MAX_TIME = 3000;
  var shownAt = Date.now();
  var done = false;

  function hide(){
    if(done) return;
    done = true;
    var elapsed = Date.now() - shownAt;
    var wait = Math.max(0, MIN_TIME - elapsed);
    setTimeout(function(){
      screen.classList.add("is-hidden");
      document.body.classList.remove("is-loading");
      setTimeout(function(){ if(screen.parentNode) screen.parentNode.removeChild(screen); }, 550);
    }, wait);
  }

  if(document.readyState === "complete"){
    hide();
  } else {
    window.addEventListener("load", hide);
  }
  setTimeout(hide, MAX_TIME);
})();
