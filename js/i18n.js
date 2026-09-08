(function(){
  "use strict";
  window.Site = window.Site || {};
  Site.i18n = Site.i18n || {};

  Site.i18n.dict = {
      id: {
        nav_about: "Tentang", nav_location: "Lokasi", nav_skills: "Keahlian", nav_work: "Karya", nav_hobby: "Hobi", nav_contact: "Kontak", nav_home: "Beranda",
        hero_role: "Membangun produk digital, dari kerangka teknis hingga detail antarmuka.",
        hero_meta: "Software Developer & UI/UX Designer, Indonesia",
        hero_card_text: "Developer & desainer produk digital.",
        hero_card_more: "Kontak →",
        status_main: "Vibe coding",
        status_sub: "Masih role Engineering, bikin website pakai AI & tangan sendiri",
        nav_faq: "FAQ",
        faq_title: "Pertanyaan Umum",
        faq_1_q: "Siapa Alip/Alrect?",
        faq_1_a: "Alip/Alrect adalah developer yang fokus pada pengembangan aplikasi Android, website, UI/UX, dan berbagai project eksperimen teknologi, dan itu pun gw 🤭.",
        faq_2_q: "Bisa bikin aplikasi Android?",
        faq_2_a: "Bisa. Project Android dapat dibuat menggunakan Java/XML maupun teknologi Android lainnya sesuai kebutuhan project.",
        faq_3_q: "Bisa bikin website?",
        faq_3_a: "Bisa. Mulai dari website sederhana sampai website dengan fitur interaktif menggunakan HTML, CSS, JavaScript, dan backend/API.",
        faq_4_q: "Bisa menerima project atau jasa development?",
        faq_4_a: "Bisa. Untuk project tertentu, detail kebutuhan dan scope pekerjaan dapat dibicarakan terlebih dahulu.",
        faq_5_q: "Teknologi apa yang biasa digunakan?",
        faq_5_a: "Beberapa teknologi yang digunakan antara lain Java, XML, HTML, CSS, JavaScript, API, database, dan berbagai tools development lainnya.",
        about_title: "Tentang",
        about_lead: "Saya mengerjakan sisi teknis dan sisi visual sebuah produk secara bersamaan.",
        about_body: "Latar belakang saya ada di pengembangan web dan desain antarmuka. Saya lebih suka bekerja di titik temu keduanya, tempat keputusan desain harus masuk akal secara teknis, dan kode harus melayani pengalaman yang ingin dibangun. Sebagian besar waktu saya dihabiskan menyusun struktur aplikasi, merapikan alur pengguna, dan menguji ulang detail kecil sampai terasa pas.",
        fact_base_label: "Berbasis di", fact_base_value: "Indonesia",
        fact_focus_label: "Fokus", fact_focus_value: "Pengembangan web & desain produk",
        fact_avail_label: "Terbuka untuk", fact_avail_value: "Proyek lepas & kolaborasi",
        location_title: "Lokasi",
        location_body: "Alif bekerja dari Makassar, kota pesisir di ujung selatan Sulawesi. Waktu kerja mengikuti WITA (UTC+8), dan sebagian besar kolaborasi berjalan lewat panggilan video serta pesan singkat, jarak bukan penghalang untuk proyek jarak jauh.",
        location_city_label: "Kota", location_city_value: "Makassar, Sulawesi Selatan",
        location_tz_label: "Zona waktu", location_tz_value: "WITA (UTC+8)",
        location_collab_label: "Kolaborasi", location_collab_value: "Sepenuhnya remote",
        location_wave: "Sapa dulu, yuk 👋",
        skills_title: "Keahlian",
        skills_dev_title: "Pengembangan",
        skill_dev_1: "Dasar dari setiap antarmuka yang saya bangun.",
        skill_dev_2: "Untuk aplikasi dengan state dan interaksi yang kompleks.",
        skill_dev_3: "Menyambungkan antarmuka ke logika dan data di belakangnya.",
        skill_dev_4: "Kerja yang rapi, terlacak, dan bisa diulang.",
        skills_design_title: "Desain",
        skill_des_1: "Merancang antarmuka sampai jelas, sebelum menulis kode.",
        skill_des_2_name: "Design system", skill_des_2: "Komponen yang konsisten di seluruh produk.",
        skill_des_3_name: "Prototyping", skill_des_3: "Menguji alur pengguna sebelum menjadi kode sungguhan.",
        skill_des_4_name: "Motion & interaksi", skill_des_4: "Detail kecil yang membuat sebuah produk terasa hidup.",
        work_title: "Karya Terpilih",
        work_1_title: "Aplikasi Web Internal", work_1_desc: "Perancangan ulang alur kerja tim dan antarmuka dashboard, dari riset sampai implementasi.",
        work_2_title: "Sistem Desain Produk", work_2_desc: "Menyusun komponen dan pedoman antarmuka yang dipakai lintas tim produk.",
        work_3_title: "Situs Interaktif", work_3_desc: "Situs pemasaran dengan animasi ringan yang tetap cepat diakses di perangkat mobile.",
        work_note: "Tempat untuk tiga proyek, ganti dengan studi kasus asli, tautan, dan tangkapan layar Anda.",
        hobby_title: "Di Luar Kerjaan",
        hobby_1_title: "Main Game",
        hobby_1_desc: "Dari yang santai sampai yang bikin emosi, cara paling ampuh buat rehat abis mikir kode seharian.",
        hobby_2_title: "Jualan-Beli via WhatsApp",
        hobby_2_desc: "Nyambi dagang lewat chat, nego, closing, kirim, semua kelar tanpa keluar dari satu aplikasi.",
        hobby_3_title: "Ngulik Frontend",
        hobby_3_desc: "Eksperimen animasi, layout, sampai detail kecil biar sebuah website enak dipandang dan dipakai.",
        hobby_4_title: "Bikin APK Langsung dari HP",
        hobby_4_desc: "Pakai CodeAssist buat ngoding aplikasi Android tanpa nunggu buka laptop dulu.",
        hobby_5_title: "Ngoprek Terminal & Termux",
        hobby_5_desc: "Main perintah di CLI, ngerasain vibe Linux langsung dari HP Android lewat Termux.",
        hobby_6_title: "Dan Lainnya...",
        hobby_6_desc: "Selebihnya nyoba-nyoba hal baru yang bikin penasaran, gak melulu soal layar.",
        contact_kicker: "Ada proyek yang ingin didiskusikan?",
        contact_headline: "Mari membangun sesuatu.",
        contact_cta: "Chat lewat WhatsApp",
        contact_number_label: "Atau simpan nomornya:",
        contact_copy: "salin",
        footer_top: "Kembali ke atas",
        music_play: "Putar musik latar",
        music_pause: "Jeda musik latar",
        search_placeholder: "Cari section, skill, atau proyek...",
        search_hint: "Ketik lalu tekan Enter untuk mencari.",
        search_loading: "Mencari...",
        search_empty: "Tidak ada hasil ditemukan.",
        quote_text: "Waktu terus berjalan, sementara kita perlahan menjadi asing bagi hari-hari yang dulu terasa seperti rumah."
      },
      en: {
        nav_about: "About", nav_location: "Location", nav_skills: "Skills", nav_work: "Work", nav_hobby: "Hobbies", nav_contact: "Contact", nav_home: "Home",
        hero_role: "Building digital products, from the technical foundation to interface detail.",
        hero_meta: "Software Developer & UI/UX Designer, Indonesia",
        hero_card_text: "Developer & digital product designer.",
        hero_card_more: "Contact →",
        status_main: "Vibe coding",
        status_sub: "Still in an Engineering role, building sites with both AI and bare hands",
        nav_faq: "FAQ",
        faq_title: "Frequently Asked",
        faq_1_q: "Who is Alip/Alrect?",
        faq_1_a: "Alip/Alrect is a developer focused on Android app development, websites, UI/UX, and various tech experiments, and yeah, that's me 🤭.",
        faq_2_q: "Can you build Android apps?",
        faq_2_a: "Yes. Android projects can be built using Java/XML or other Android technologies, depending on what the project needs.",
        faq_3_q: "Can you build websites?",
        faq_3_a: "Yes. From simple sites to ones with interactive features, using HTML, CSS, JavaScript, and backend/API work.",
        faq_4_q: "Do you take on freelance or development work?",
        faq_4_a: "Yes. For specific projects, the requirements and scope can be discussed first.",
        faq_5_q: "What technologies do you usually work with?",
        faq_5_a: "Some of the tools used include Java, XML, HTML, CSS, JavaScript, APIs, databases, and various other dev tools.",
        about_title: "About",
        about_lead: "I work on the technical and visual side of a product at the same time.",
        about_body: "My background is in web development and interface design. I prefer working at the point where the two meet, where a design decision has to make technical sense, and code has to serve the experience it's meant to create. Most of my time goes into structuring an application, cleaning up user flows, and revisiting small details until they feel right.",
        fact_base_label: "Based in", fact_base_value: "Indonesia",
        fact_focus_label: "Focus", fact_focus_value: "Web development & product design",
        fact_avail_label: "Available for", fact_avail_value: "Freelance work & collaboration",
        location_title: "Location",
        location_body: "Alif works from Makassar, a coastal city at the southern tip of Sulawesi. Working hours follow WITA (UTC+8), and most collaboration happens over video calls and messaging, distance isn't a blocker for remote projects.",
        location_city_label: "City", location_city_value: "Makassar, South Sulawesi",
        location_tz_label: "Timezone", location_tz_value: "WITA (UTC+8)",
        location_collab_label: "Collaboration", location_collab_value: "Fully remote",
        location_wave: "Say hi first 👋",
        skills_title: "Skills",
        skills_dev_title: "Development",
        skill_dev_1: "The foundation of every interface I build.",
        skill_dev_2: "For applications with complex state and interaction.",
        skill_dev_3: "Connecting the interface to the logic and data behind it.",
        skill_dev_4: "Clean, tracked, repeatable work.",
        skills_design_title: "Design",
        skill_des_1: "Designing an interface until it's clear, before writing code.",
        skill_des_2_name: "Design systems", skill_des_2: "Consistent components across a product.",
        skill_des_3_name: "Prototyping", skill_des_3: "Testing a user flow before it becomes real code.",
        skill_des_4_name: "Motion & interaction", skill_des_4: "Small details that make a product feel alive.",
        work_title: "Selected Work",
        work_1_title: "Internal Web Application", work_1_desc: "Redesigned a team's workflow and dashboard interface, from research through implementation.",
        work_2_title: "Product Design System", work_2_desc: "Built the components and interface guidelines used across a product team.",
        work_3_title: "Interactive Website", work_3_desc: "A marketing site with light animation that still loads fast on mobile.",
        work_note: "Placeholder for three projects, swap in real case studies, links, and screenshots.",
        hobby_title: "Off the Clock",
        hobby_1_title: "Gaming",
        hobby_1_desc: "From chill sessions to rage-quit material, the best way to reset after a day of staring at code.",
        hobby_2_title: "Buying & Selling on WhatsApp",
        hobby_2_desc: "Running a small side hustle over chat, negotiating, closing, shipping, all in one app.",
        hobby_3_title: "Tinkering with Frontend",
        hobby_3_desc: "Messing with animation, layout, and the tiny details that make a site pleasant to use.",
        hobby_4_title: "Building APKs Straight from a Phone",
        hobby_4_desc: "Coding Android apps with CodeAssist, no laptop required.",
        hobby_5_title: "Terminal & Termux",
        hobby_5_desc: "Living in the CLI, bringing Linux vibes to an Android phone through Termux.",
        hobby_6_title: "And Everything Else...",
        hobby_6_desc: "Beyond that, just trying out whatever sparks curiosity, not always screen-related.",
        contact_kicker: "Have a project to discuss?",
        contact_headline: "Let's build something.",
        contact_cta: "Chat on WhatsApp",
        contact_number_label: "Or save the number:",
        contact_copy: "copy",
        footer_top: "Back to top",
        music_play: "Play background music",
        music_pause: "Pause background music",
        search_placeholder: "Search sections, skills, or projects...",
        search_hint: "Type then press Enter to search.",
        search_loading: "Searching...",
        search_empty: "No results found.",
        quote_text: "Time keeps moving, while we slowly become strangers to the days that once felt like home."
      }
    };
  Site.i18n.lang = "id";

    Site.i18n.applyLang = function(lang){
      Site.i18n.lang = lang;
      document.documentElement.lang = lang;
      var entries = Site.i18n.dict[lang];
      document.querySelectorAll("[data-i18n]").forEach(function(el){
        var key = el.getAttribute("data-i18n");
        if(entries[key] !== undefined){ el.textContent = entries[key]; }
      });
      document.querySelectorAll("[data-i18n-placeholder]").forEach(function(el){
        var key = el.getAttribute("data-i18n-placeholder");
        if(entries[key] !== undefined){ el.setAttribute("placeholder", entries[key]); }
      });
      document.getElementById("langId").classList.toggle("active", lang === "id");
      document.getElementById("langEn").classList.toggle("active", lang === "en");
      document.getElementById("langId").setAttribute("aria-pressed", lang === "id");
      document.getElementById("langEn").setAttribute("aria-pressed", lang === "en");

      var musicBtn = document.getElementById("musicToggle");
      if (musicBtn) {
        var playing = musicBtn.classList.contains("is-playing");
        musicBtn.setAttribute("aria-label", playing ? entries.music_pause : entries.music_play);
      }
    }

    document.getElementById("langId").addEventListener("click", function(){ Site.i18n.applyLang("id"); });
    document.getElementById("langEn").addEventListener("click", function(){ Site.i18n.applyLang("en"); });

})();
