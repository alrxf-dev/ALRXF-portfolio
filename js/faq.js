(function(){
  "use strict";

    (function(){
      var items = document.querySelectorAll(".faq-item");
      items.forEach(function(item){
        var btn = item.querySelector(".faq-question");
        if (!btn) return;
        btn.addEventListener("click", function(){
          var isOpen = item.classList.contains("open");
          items.forEach(function(other){
            other.classList.remove("open");
            var otherBtn = other.querySelector(".faq-question");
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          });
          if (!isOpen){
            item.classList.add("open");
            btn.setAttribute("aria-expanded", "true");
          }
        });
      });
    })();

})();
