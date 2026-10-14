(function () {
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var drawer = document.getElementById("drawer");
  var toggle = document.querySelector(".nav-toggle");
  if (drawer && toggle) {
    var closeBtn = drawer.querySelector(".drawer__close");
    var open = function () {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
      if (closeBtn) closeBtn.focus();
    };
    var close = function () {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      toggle.focus();
    };
    toggle.addEventListener("click", open);
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]") || e.target.closest("a")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) close();
    });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (mq) {
      if (mq.matches && drawer.classList.contains("is-open")) close();
    });
  }

  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  var serviceParam = new URLSearchParams(window.location.search).get("service");
  var select = document.getElementById("service");
  if (serviceParam && select) {
    Array.prototype.forEach.call(select.options, function (opt) {
      if (opt.value === serviceParam) select.value = serviceParam;
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
