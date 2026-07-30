(() => {
  "use strict";

  if (window.__jcMathsSpecAppInitialised) return;
  window.__jcMathsSpecAppInitialised = true;

  const path = location.pathname.replace(/\\/g, "/").toLowerCase();
  const inSections = path.includes("/sections/");
  const isOverview = path.endsWith("/sections/overview.html");
  const isUnifying = path.endsWith("/sections/unifying.html");
  const isGeometry = path.endsWith("/sections/geometry-trigonometry.html");
  const sectionBase = inSections ? "" : "sections/";
  const header = document.querySelector(".site-header");
  const nav = header?.querySelector(".top-nav");
  const href = (file, hash = "") => `${sectionBase}${file}${hash ? `#${hash}` : ""}`;
if (isGeometry && !document.querySelector('script[data-geometry-visuals]')) {
    const script = document.createElement("script");
    script.dataset.geometryVisuals = "true";
    script.src = "../js/geometry-visuals.js?v=20260729-3";
    document.head.appendChild(script);
  }

  const schema = [
    { label: "Overview", file: "overview.html", hash: "introduction-01", children: [
      ["Introduction", "introduction-01"], ["Rationale", "rationale-01"], ["Aim", "aim-01"],
      ["Mathematical proficiency", "proficiency-conceptual"], ["Statements of Learning", "sol-overview"],
      ["Key Skills", "key-skills-overview"], ["Course structure", "course-structure"], ["The five strands", "course-unifying"],
      ["Progression", "progression-early"], ["Expectations for students", "expectations-01"]
    ]},
    { label: "Unifying", file: "unifying.html", hash: "unifying-overview", children: [
      ["U.1", "Recall & understand", "U1"], ["U.2", "Apply procedures", "U2"], ["U.3", "Recognise equality", "U3"],
      ["U.4", "Represent & compare", "U4"], ["U.5", "Connect within mathematics", "U5"], ["U.6", "Connect to the real world", "U6"],
      ["U.7", "Make sense & mathematise", "U7"], ["U.8", "Apply knowledge & solve", "U8"], ["U.9", "Interpret the solution", "U9"],
      ["U.10", "Evaluate possible solutions", "U10"], ["U.11", "Generate conjectures", "U11"], ["U.12", "Arguments & proofs", "U12"],
      ["U.13", "Communicate mathematics", "U13"]
    ]},
    { label: "Number", file: "number.html", hash: "number-overview", children: [
      { code: "N.1", label: "Numbers & operations", hash: "N1" }, { code: "N.2", label: "Equivalent representations", hash: "N2" },
      { code: "N.3", label: "Proportionality", hash: "N3" }, { code: "N.4", label: "Numerical patterns", hash: "N4" }, { code: "N.5", label: "Sets", hash: "N5" }
    ]},
    { label: "Geometry & Trigonometry", short: "Geometry & Trig", file: "geometry-trigonometry.html", hash: "geometry-overview", children: [
      { code: "GT.1", label: "Measure & time", hash: "GT1" }, { code: "GT.2", label: "2D shapes & 3D solids", hash: "GT2" },
      { code: "GT.3", label: "Geometry & proof", hash: "GT3" }, { code: "GT.4", label: "Trigonometry", hash: "GT4" },
      { code: "GT.5", label: "Coordinate geometry", hash: "GT5" }, { code: "GT.6", label: "Transformations & symmetry", hash: "GT6" }
    ]},
    { label: "Algebra & Functions", file: "algebra-functions.html", hash: "algebra-overview", children: [
      { code: "AF.1", label: "Patterns & relationships", hash: "AF1" }, { code: "AF.2", label: "Letters as variables", hash: "AF2" },
      { code: "AF.3", label: "Equivalent expressions", hash: "AF3" }, { code: "AF.4", label: "Equations & inequalities", hash: "AF4" },
      { code: "AF.5", label: "Quadratics from roots", hash: "AF5" }, { code: "AF.6", label: "Change the subject", hash: "AF6" }, { code: "AF.7", label: "Functions", hash: "AF7" }
    ]},
    { label: "Statistics & Probability", file: "statistics-probability.html", hash: "statistics-overview", children: [
      { code: "SP.1", label: "Experiments & counting", hash: "SP1" }, { code: "SP.2", label: "Probability", hash: "SP2" }, { code: "SP.3", label: "Statistical investigation", hash: "SP3" }
    ]},
    { label: "Assessment & Reporting", file: "assessment-reporting.html", hash: "assessment-overview" },
    { label: "Appendix A", file: "appendix-a.html" },
    { label: "Appendix B", file: "appendix-b.html", hash: "appendix-b-overview", children: [
      ["Geometry system", "appendix-b-system"],
      ["Terms & definitions", "appendix-b-terms"],
      ["Axioms 1–5", "appendix-b-axioms"],
      ["Theorems 1–6", "appendix-b-t1-6"],
      ["Theorems 7–12", "appendix-b-t7-12"],
      ["Theorems 13–18", "appendix-b-t13-18"],
      ["Circles · Theorems 19–21", "appendix-b-circles"],
      ["Constructions 1–7", "appendix-b-constructions-1"],
      ["Constructions 8–15", "appendix-b-constructions-2"],
      ["Constructions 16–22", "appendix-b-constructions-3"],
      ["Discovery → proof", "appendix-b-teaching"],
      ["Junior Cycle · Ordinary", "appendix-b-jcol"],
      ["Junior Cycle · Higher", "appendix-b-jchl"],
      ["Leaving Certificate continuation", "appendix-b-lc"]
    ] }
  ];

  const asNode = (item, parentFile) => Array.isArray(item)
    ? (item.length === 2 ? { label: item[0], hash: item[1], file: parentFile } : { code: item[0], label: item[1], hash: item[2], file: parentFile })
    : { ...item, file: item.file || parentFile };

  function menuMarkup(section) {
    const target = href(section.file, section.hash || "");
    const children = (section.children || []).map(item => asNode(item, section.file));
    if (!children.length) return `<a href="${target}">${section.short || section.label}</a>`;
    return `<details class="menu"><summary data-overview="${target}">${section.short || section.label}</summary><div class="menu-panel">
      <a class="menu-overview-link" href="${target}">${section.label}</a>
      ${children.map(child => `<a href="${href(child.file, child.hash || "")}">${child.code ? `<strong>${child.code}</strong> ` : ""}${child.label}</a>`).join("")}
    </div></details>`;
  }

  if (nav) {
    const homeTarget = inSections ? "../index.html" : "index.html";

    nav.setAttribute("aria-label", "Site table of contents");

    nav.innerHTML = `
      <div class="mobile-toc-title">Table of contents</div>
      <a class="mobile-home-link" href="${homeTarget}">Home</a>
      ${schema.map(menuMarkup).join("")}
    `;

    if (!inSections) {
      nav.querySelector(".mobile-home-link")
        ?.setAttribute("aria-current", "page");
    }

    const currentFile =
      path.split("/").filter(Boolean).pop() || "index.html";

    nav.querySelectorAll(":scope > details.menu")
      .forEach(details => {
        const summary =
          details.querySelector(
            ":scope > summary[data-overview]"
          );

        const targetFile =
          summary?.dataset.overview
            ?.split("#")[0]
            ?.split("/")
            ?.pop()
            ?.toLowerCase();

        if (targetFile === currentFile) {
          details.classList.add("current-section");
          summary.setAttribute(
            "aria-current",
            "page"
          );
        }
      });

    nav.querySelectorAll(
      ":scope > a:not(.mobile-home-link)"
    ).forEach(link => {
      const targetPath =
        new URL(link.href, location.href)
          .pathname
          .replace(/\\/g, "/")
          .toLowerCase();

      if (targetPath === path) {
        link.setAttribute(
          "aria-current",
          "page"
        );
      }
    });
  }

  /*
    Convert strand overview boxes into real links.
  */
  const currentSection = schema.find(section =>
    path.endsWith(`/sections/${section.file}`)
  );

  if (currentSection?.children?.length) {
    const childrenByCode = new Map(
      currentSection.children
        .map(item =>
          asNode(item, currentSection.file)
        )
        .filter(item =>
          item.code && item.hash
        )
        .map(item =>
          [item.code, item]
        )
    );

    document
      .querySelectorAll(".number-map > div")
      .forEach(box => {
        const code =
          box.querySelector("strong")
            ?.textContent
            .trim();

        const child = childrenByCode.get(code);

        if (!child) return;

        const link =
          document.createElement("a");

        link.className = "strand-map-link";
        link.href = href(
          child.file,
          child.hash
        );

        while (box.firstChild) {
          link.appendChild(box.firstChild);
        }

        box.replaceWith(link);
      });
  }

  document.querySelectorAll("a[href*='front-matter.html']").forEach(link => {
    link.href = link.href.replace("front-matter.html", "overview.html");
  });
  document.querySelectorAll(".slide-header span").forEach(label => {
    label.textContent = label.textContent.replace(/Front Matter/g, "Overview");
  });

  if (header && nav) {
    document.body.classList.add("mobile-nav-ready");
    if (!nav.id) nav.id = "site-navigation";
    let burger = header.querySelector(".mobile-menu-button");
    if (!burger) {
      burger = document.createElement("button");
      burger.type = "button";
      burger.className = "mobile-menu-button";
      burger.setAttribute("aria-label", "Open table of contents");
      burger.setAttribute("aria-controls", nav.id);
      burger.setAttribute("aria-expanded", "false");
      burger.innerHTML = "<span></span><span></span><span></span>";
      header.insertBefore(burger, header.firstChild);
    }
    let backdrop = document.querySelector(".mobile-menu-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "mobile-menu-backdrop";
      document.body.appendChild(backdrop);
    }
    const closeMobile = () => {
      document.body.classList.remove("mobile-menu-open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Open table of contents");
    };
    burger.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      const opening = !document.body.classList.contains("mobile-menu-open");
      document.body.classList.toggle("mobile-menu-open", opening);
      burger.setAttribute("aria-expanded", opening ? "true" : "false");

      burger.setAttribute(
        "aria-label",
        opening
          ? "Close table of contents"
          : "Open table of contents"
      );
    });
    backdrop.addEventListener("click", closeMobile);
    nav.addEventListener("click", event => {
      const summary = event.target.closest("summary");
      if (summary && window.innerWidth <= 820) {
        event.preventDefault();
        event.stopPropagation();
        const details = summary.parentElement;
        const opening = !details.open;
        nav.querySelectorAll(":scope > details[open]").forEach(other => {
          if (other !== details) other.removeAttribute("open");
        });
        details.open = opening;
        return;
      }
      if (event.target.closest("a")) closeMobile();
    });
  }

  const deck = document.querySelector("[data-slide-deck]");
  if (!deck) return;

  const slides = [...deck.querySelectorAll(":scope > .slide")];
  if (!slides.length) return;

  // Overview and Unifying use CSS's pre-initialisation fallback to show only
  // the first slide. Mark the deck ready so the normal hidden-state renderer
  // can reveal every subsequent slide during click, keyboard and dot navigation.
  deck.classList.add("deck-ready");

  let previous = deck.querySelector(":scope > .deck-controls .deck-prev");
  let next = deck.querySelector(":scope > .deck-controls .deck-next");
  const count = deck.querySelector(":scope > .deck-controls .deck-count");
  const dots = deck.querySelector(":scope > .deck-controls .deck-dots");
  const showAll = deck.querySelector(":scope > .deck-tools .show-all");
  const controls = deck.querySelector(":scope > .deck-controls");

  if (isOverview || isUnifying) {
    previous?.remove();
    next?.remove();
    previous = null;
    next = null;
  }

  if (controls && slides[0] && controls.nextElementSibling !== slides[0]) {
    deck.insertBefore(controls, slides[0]);
  }

  let current = slides.findIndex(slide => slide.id === location.hash.slice(1));
  if (current < 0) current = 0;
  let allVisible = false;
  let touchStart = null;
  let suppressClickUntil = 0;

  function render(updateHash = true) {
    deck.classList.toggle("show-all", allVisible);
    slides.forEach((slide, index) => {
      slide.hidden = !allVisible && index !== current;
      const number = slide.querySelector(".slide-number");
      if (number) number.textContent = `${index + 1} / ${slides.length}`;
    });
    if (count) count.textContent = `${current + 1} of ${slides.length}`;
    if (previous) previous.disabled = current === 0;
    if (next) next.disabled = current === slides.length - 1;
    if (showAll) showAll.textContent = allVisible ? "Slide view" : "Show all text";
    if (dots) dots.innerHTML = slides.map((_, index) => `<button type="button" class="deck-dot ${index === current ? "current" : ""}" data-slide-index="${index}" aria-label="Go to slide ${index + 1}"></button>`).join("");
    if (updateHash && !allVisible && slides[current]?.id && location.hash.slice(1) !== slides[current].id) {
      history.replaceState(null, "", `#${slides[current].id}`);
    }
  }

  function goTo(index) {
    if (!Number.isInteger(index) || index < 0 || index >= slides.length) return;
    current = index;
    allVisible = false;
    render(true);
    window.scrollTo(0, 0);
  }

  previous?.addEventListener("click", event => { event.preventDefault(); event.stopPropagation(); goTo(current - 1); });
  next?.addEventListener("click", event => { event.preventDefault(); event.stopPropagation(); goTo(current + 1); });
  showAll?.addEventListener("click", event => { event.preventDefault(); event.stopPropagation(); allVisible = !allVisible; render(true); });
  dots?.addEventListener("click", event => {
    const dot = event.target.closest(".deck-dot");
    if (!dot) return;
    event.preventDefault();
    event.stopPropagation();
    goTo(Number(dot.dataset.slideIndex));
  });

  window.addEventListener("hashchange", () => {
    const index = slides.findIndex(slide => slide.id === location.hash.slice(1));
    if (index >= 0 && index !== current) {
      current = index;
      allVisible = false;
      render(false);
    }
  });

  document.addEventListener("keydown", event => {
    if (allVisible || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === "ArrowRight" || event.key === "PageDown") { event.preventDefault(); goTo(current + 1); }
    else if (event.key === "ArrowLeft" || event.key === "PageUp") { event.preventDefault(); goTo(current - 1); }
  });

  const interactiveSelector = "a,button,input,textarea,select,option,label,summary,details,nav,mjx-container,.site-header,.deck-controls,.deck-tools,[role='button']";
  const isInteractive = target => target instanceof Element && !!target.closest(interactiveSelector);

  document.addEventListener("touchstart", event => {
    if (event.touches.length !== 1 || allVisible || isInteractive(event.target)) return;
    const slide = event.target.closest?.(".slide");
    if (!slide || slide.hidden || !deck.contains(slide)) return;
    const point = event.touches[0];
    touchStart = { x: point.clientX, y: point.clientY, time: performance.now() };
  }, { capture: true, passive: true });

  document.addEventListener("touchend", event => {
    if (!touchStart || event.changedTouches.length !== 1) return;
    const start = touchStart;
    touchStart = null;
    if (isInteractive(event.target)) return;
    const point = event.changedTouches[0];
    const dx = point.clientX - start.x;
    const dy = point.clientY - start.y;
    const elapsed = performance.now() - start.time;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.1 && elapsed < 1200) {
      event.preventDefault();
      suppressClickUntil = performance.now() + 600;
      dx < 0 ? goTo(current + 1) : goTo(current - 1);
      return;
    }
    if (Math.abs(dx) <= 18 && Math.abs(dy) <= 18 && elapsed <= 800 && !window.getSelection?.().toString().trim()) {
      event.preventDefault();
      suppressClickUntil = performance.now() + 600;
      point.clientX < window.innerWidth / 2 ? goTo(current - 1) : goTo(current + 1);
    }
  }, { capture: true, passive: false });

  document.addEventListener("click", event => {
    if (performance.now() < suppressClickUntil || allVisible || isInteractive(event.target)) return;
    const slide = event.target.closest?.(".slide");
    if (!slide || slide.hidden || !deck.contains(slide) || window.getSelection?.().toString().trim()) return;
    event.preventDefault();
    event.clientX < window.innerWidth / 2 ? goTo(current - 1) : goTo(current + 1);
  }, true);

  render(true);
})();

