(function(){
  "use strict";

    (function(){
      var toggleBtn = document.getElementById("searchToggle");
      var overlay = document.getElementById("searchOverlay");
      var closeBtn = document.getElementById("searchClose");
      var input = document.getElementById("searchInput");
      var hint = document.getElementById("searchHint");
      var loading = document.getElementById("searchLoading");
      var resultsEl = document.getElementById("searchResults");
      if (!toggleBtn || !overlay || !input) return;

      function buildIndex(){
        var d = Site.i18n.dict[Site.i18n.lang];
        return [
          { title: "Alif Rezky", desc: d.hero_meta, target: "#top" },
          { title: d.about_title, desc: d.about_lead, target: "#about" },
          { title: d.location_title, desc: d.location_body, target: "#location" },
          { title: "HTML, CSS & JavaScript", desc: d.skill_dev_1, target: "#skills" },
          { title: "React", desc: d.skill_dev_2, target: "#skills" },
          { title: "Node.js", desc: d.skill_dev_3, target: "#skills" },
          { title: "Git & GitHub", desc: d.skill_dev_4, target: "#skills" },
          { title: "UI Design (Figma)", desc: d.skill_des_1, target: "#skills" },
          { title: d.skill_des_2_name, desc: d.skill_des_2, target: "#skills" },
          { title: d.skill_des_3_name, desc: d.skill_des_3, target: "#skills" },
          { title: d.skill_des_4_name, desc: d.skill_des_4, target: "#skills" },
          { title: d.work_1_title, desc: d.work_1_desc, target: "#work" },
          { title: d.work_2_title, desc: d.work_2_desc, target: "#work" },
          { title: d.work_3_title, desc: d.work_3_desc, target: "#work" },
          { title: d.hobby_1_title, desc: d.hobby_1_desc, target: "#hobby" },
          { title: d.hobby_2_title, desc: d.hobby_2_desc, target: "#hobby" },
          { title: d.hobby_3_title, desc: d.hobby_3_desc, target: "#hobby" },
          { title: d.hobby_4_title, desc: d.hobby_4_desc, target: "#hobby" },
          { title: d.hobby_5_title, desc: d.hobby_5_desc, target: "#hobby" },
          { title: d.faq_1_q, desc: d.faq_1_a, target: "#faq" },
          { title: d.faq_2_q, desc: d.faq_2_a, target: "#faq" },
          { title: d.faq_3_q, desc: d.faq_3_a, target: "#faq" },
          { title: d.faq_4_q, desc: d.faq_4_a, target: "#faq" },
          { title: d.faq_5_q, desc: d.faq_5_a, target: "#faq" },
          { title: d.contact_headline, desc: d.contact_kicker, target: "#contact" },
          { title: "GitHub", desc: "github.com/alrxf-dev", target: "#contact" },
          { title: "Telegram", desc: "@XploterAlrect", target: "#contact" },
          { title: "WhatsApp", desc: "+62 821-9240-1340", target: "#contact" }
        ];
      }

      function openOverlay(){
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("search-no-scroll");
        setTimeout(function(){ input.focus(); }, 50);
      }
      function closeOverlay(){
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("search-no-scroll");
        input.value = "";
        hint.hidden = false;
        loading.hidden = true;
        resultsEl.hidden = true;
        Site.security.clearNode(resultsEl);
      }

      toggleBtn.addEventListener("click", openOverlay);
      closeBtn.addEventListener("click", closeOverlay);
      overlay.addEventListener("click", function(e){
        if (e.target === overlay) closeOverlay();
      });
      document.addEventListener("keydown", function(e){
        if (e.key === "Escape" && overlay.classList.contains("is-open")) closeOverlay();
      });

      function renderResults(query){
        var items = buildIndex();
        var q = query.trim().toLowerCase();
        var matches = items.filter(function(item){
          return (item.title + " " + item.desc).toLowerCase().indexOf(q) !== -1;
        });

        Site.security.clearNode(resultsEl);
        if (matches.length === 0){
          var empty = document.createElement("p");
          empty.className = "search-empty";
          empty.textContent = Site.i18n.dict[Site.i18n.lang].search_empty;
          resultsEl.appendChild(empty);
        } else {
          matches.forEach(function(item){
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.href = item.target;
            var t = document.createElement("span");
            t.className = "r-title";
            t.textContent = item.title;
            var desc = document.createElement("span");
            desc.className = "r-desc";
            desc.textContent = item.desc;
            a.appendChild(t);
            a.appendChild(desc);
            a.addEventListener("click", function(){ closeOverlay(); });
            li.appendChild(a);
            resultsEl.appendChild(li);
          });
        }
        resultsEl.hidden = false;
      }

      function runSearch(){
        var query = input.value.trim();
        if (!query) return;
        hint.hidden = true;
        resultsEl.hidden = true;
        Site.security.clearNode(resultsEl);
        loading.hidden = false;

        var delay = 1000 + Math.random() * 2000;
        setTimeout(function(){
          loading.hidden = true;
          renderResults(query);
        }, delay);
      }

      input.addEventListener("keydown", function(e){
        if (e.key === "Enter"){
          e.preventDefault();
          runSearch();
        }
      });
    })();

})();
