/**
 * ==========================================================================
 * TYPEFACE DESIGN SEMINAR PRESENTATION - JAVASCRIPT ENGINE
 * Vanilla JS • Interactive Exhibitions • Full Keyboard & HUD Navigation
 * ==========================================================================
 */

(function () {
  'use strict';

  // Total presentation slides count
  const TOTAL_SLIDES = 14;
  let currentSlideIndex = 1;

  // DOM Elements - Navigation & HUD
  const presentationContainer = document.getElementById('presentation-container');
  const slides = document.querySelectorAll('.slide');
  const hudSlideTitle = document.getElementById('hud-slide-title');
  const progressFill = document.getElementById('progress-fill');
  const counterCurrent = document.getElementById('counter-current');
  const counterTotal = document.getElementById('counter-total');
  const slideDotsIndicator = document.getElementById('slide-dots-indicator');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const btnToggleTheme = document.getElementById('btn-toggle-theme');
  const themeBtnText = document.getElementById('theme-btn-text');
  const iconSun = btnToggleTheme ? btnToggleTheme.querySelector('.icon-sun') : null;
  const iconMoon = btnToggleTheme ? btnToggleTheme.querySelector('.icon-moon') : null;
  const btnToggleProjector = document.getElementById('btn-toggle-projector');
  const projectorBtnText = document.getElementById('projector-btn-text');

  // Modals & Drawers
  const btnToggleNotes = document.getElementById('btn-toggle-notes');
  const btnCloseNotes = document.getElementById('btn-close-notes');
  const presenterNotesDrawer = document.getElementById('presenter-notes-drawer');
  const pndSlideTitle = document.getElementById('pnd-slide-title');
  const pndSpeechBox = document.getElementById('pnd-speech-box');
  const pndTermsBox = document.getElementById('pnd-terms-box');

  const btnToggleGrid = document.getElementById('btn-toggle-grid');
  const btnCloseGrid = document.getElementById('btn-close-grid');
  const slideOverviewModal = document.getElementById('slide-overview-modal');
  const somBackdrop = document.getElementById('som-backdrop');
  const somGrid = document.getElementById('som-grid');

  const btnToggleHelp = document.getElementById('btn-toggle-help');
  const btnCloseHelp = document.getElementById('btn-close-help');
  const shortcutsModal = document.getElementById('shortcuts-modal');
  const helpBackdrop = document.getElementById('help-backdrop');

  const btnStartPresentation = document.getElementById('btn-start-presentation');
  const btnRestartDeck = document.getElementById('btn-restart-deck');
  const btnOpenOverviewSummary = document.getElementById('btn-open-overview-summary');

  /* ==========================================================================
     PRESENTER NOTES & METADATA DATABASE (Directly from Source Material)
     ========================================================================== */
  const slideMetadata = [
    {
      index: 1,
      title: "Title Screen",
      tagline: "Seminar Presentation Introduction",
      speech: "Welcome, faculty members and peers. Today we explore Module 4: Typeface Design. We will examine what a typeface is, the anatomical fundamentals of strokes, contrast, and stress, explore the 5 historic classifications from 1617 Garamond to 1957 Helvetica, and analyze the systematic family of type styles across both weight and width.",
      terms: ["Typeface Design", "Module 4", "Historic Classification", "Type Styles"]
    },
    {
      index: 2,
      title: "What is a Typeface?",
      tagline: "Definition & Design System",
      speech: "A typeface is the name given to the specific letterform design system of an alphabet. As emphasized in our source, type is one of the most universal abstract systems of design that visually communicates daily. Shapes of type reflect history and culture, driven by technological printing advances and cultural reading habits.",
      terms: ["Design System", "Visual Communication", "Reading Habits", "Function & Period"]
    },
    {
      index: 3,
      title: "Historic Classification",
      tagline: "The 5 Major Eras (1617–1957)",
      speech: "Our study material classifies type into five historic eras: Old Style with Garamond (France, 1617); Transitional with Baskerville (England, 1757); Modern with Bodoni (Italy, 1788); Egyptian / Slab Serif with Century Expanded (US, 1894); and Contemporary Sans Serif with Helvetica (Switzerland, 1957). Each reflects its era's manufacturing capability.",
      terms: ["Garamond 1617", "Baskerville 1757", "Bodoni 1788", "Century Expanded 1894", "Helvetica 1957"]
    },
    {
      index: 4,
      title: "Strokes & Contrast",
      tagline: "Anatomy of Letterforms",
      speech: "A stroke is simply the line that makes up a letter. Strokes may be straight—horizontal, vertical, or diagonal as in k, l, v, w, x, z—or curved (open or closed as in c, o, s). Contrast is defined as the difference between thick and thin strokes. High contrast creates a dramatic difference.",
      terms: ["Stroke Definition", "Straight vs Curved", "Open vs Closed", "High vs Low Contrast"]
    },
    {
      index: 5,
      title: "Stress in Letterforms",
      tagline: "Axis & Weight Distribution",
      speech: "Stress in typography refers to the direction where the thickest part of a letter appears—showing where pressure was applied when written. The four types from our source are: Vertical stress (Bodoni, formal), Diagonal stress (Garamond, handwritten), Horizontal stress (decorative/unconventional), and No stress / Monolinear (Helvetica, uniform).",
      terms: ["Vertical Stress", "Diagonal (Oblique) Stress", "Horizontal Stress", "No Stress (Monolinear)"]
    },
    {
      index: 6,
      title: "Serif and Bracket",
      tagline: "Terminal Structure & Fillets",
      speech: "A serif is a small decorative line attached to the ends of letter strokes. A bracket refers to the curved or angled stroke that connects the serif to the main stem. Notice in our diagrams how Garamond and Baskerville are bracketed, whereas Bodoni has zero bracketing and Univers/Helvetica has no serifs at all.",
      terms: ["Serif Terminal", "Bracket (Fillet)", "Bracketed vs Unbracketed", "Stem Junction"]
    },
    {
      index: 7,
      title: "Old Style Typefaces",
      tagline: "Humanist Heritage (1617)",
      speech: "Old Style began our timeline with Garamond (1617 France), alongside Palatino, Caslon 224, and Weiss. Old Style features very little contrast between strokes, heavy brackets, and extreme diagonal stress. It feels distinctly 'human' and less 'machined' because it originated from the human hand holding a broad-nib quill.",
      terms: ["Garamond", "Low Contrast", "Heavy Brackets", "Humanist Quality", "Diagonal Slant"]
    },
    {
      index: 8,
      title: "Transitional Typefaces",
      tagline: "The Evolutionary Bridge (1757)",
      speech: "Transitional typefaces bridge the gap between Old Style and Modern. Introduced in England by John Baskerville in 1757, and including Times Roman, Stone Serif, and Perpetua. They offer more refined serifs, more contrast than Old Style, and a shift toward vertical stress, while retaining heavy bracketing.",
      terms: ["Baskerville (1757)", "Bridge Typeface", "Refined Serifs", "Vertical Shift", "Times Roman"]
    },
    {
      index: 9,
      title: "Modern Typefaces",
      tagline: "Mechanical Precision (1788)",
      speech: "Modern typefaces are not modern by today's calendar—they emerged at the end of the 18th century, led by Giambattista Bodoni in Italy (1788) and Didot. They brought extreme stroke contrast, hairline unbracketed serifs meeting stems at 90-degree right angles, and strict vertical architecture without noticeable diagonal stress.",
      terms: ["Bodoni (1788)", "Giambattista Bodoni", "Extreme Contrast", "Unbracketed Hairlines", "Mechanical Exactness"]
    },
    {
      index: 10,
      title: "Slab Serif / Egyptian",
      tagline: "Industrial Advertising (1894)",
      speech: "Also called Egyptian or Square Serif, Slab Serif typefaces feature blocky rectangular serifs and consistent stroke weight. Emerging for crudely printed 19th-century advertising and newspapers—such as Century Expanded (US, 1894). Early versions had no bracketing, while later Clarendons reintroduced subtle brackets and contrast.",
      terms: ["Century Expanded (1894)", "Egyptian / Square Serif", "Blocky Slabs", "Advertising Clarity", "Clarendons"]
    },
    {
      index: 11,
      title: "Sans Serif Typefaces",
      tagline: "Swiss Modernism, Leading & Figure 12.9",
      speech: "Sans Serif means without serifs. Popularized a century after invention by the Bauhaus and Art Deco movements, and epitomized by Helvetica (1957 Switzerland) and Univers. Lacking horizontal serifs, they tend to read vertically; typographers solve this by adding more leading between shorter lines. In Figure 12.9, our source details the four iconic sans serif families: Univers, Helvetica, Gill Sans, and Franklin Gothic.",
      terms: ["Helvetica (1957)", "Univers", "Gill Sans", "Franklin Gothic", "Vertical Reading Tendency", "Leading"]
    },
    {
      index: 12,
      title: "Type Styles: Weight",
      tagline: "Medium, Light, Bold & Specialized Grades",
      speech: "Type style usually refers to the variety of weights or widths of the letters in a specific typeface. Many names are given to the same weight or width. The three foundational weights from our study material are: 1. Medium, often called regular, book, or normal, which is the basic standard weight; 2. Light, sometimes called thin; and 3. Bold, a general term for heavier variations, which includes demi-bold, semi-bold, heavy, extrabold, ultra, and black.",
      terms: ["Medium (Regular/Book/Normal)", "Light (Thin)", "Bold", "Demi-bold & Semi-bold", "Heavy & Extra-bold", "Ultra & Black"]
    },
    {
      index: 13,
      title: "Type Styles: Width & Univers",
      tagline: "Condensed, Extended & Figure 12.10 Matrix",
      speech: "Type style also encompasses variations in width: 4. Condensed, also referred to as compressed or narrow, which gives letterforms the appearance of a vertical line direction; and 5. Extended or expanded, which is wider than standard medium and creates a strong horizontal line direction. In Figure 12.10, our study material showcases Adrian Frutiger's Univers, demonstrating how varying width and weight produces light, medium, bold, condensed, bold condensed, extended, and bold extended.",
      terms: ["Condensed (Compressed/Narrow)", "Extended (Expanded)", "Vertical Line Direction", "Horizontal Line Direction", "Univers (Figure 12.10)"]
    },
    {
      index: 14,
      title: "Final Summary",
      tagline: "The Full Typographic Hierarchy",
      speech: "In conclusion, we have traced the complete syntactic lineage of typography: from Typeface to Stroke, Contrast, Stress, Serif, Historic Classification, and Type Styles across both Weight and Width. Remember our closing principle: 'Typography is not just text. It is visual design.' Thank you for your attention.",
      terms: ["Syntactic Hierarchy", "Historical Lineage", "Visual Design Manifesto", "Seminar Conclusion"]
    }
  ];

  /* ==========================================================================
     THEME & DISPLAY MODE CONTROLLERS
     ========================================================================== */

  function initTheme() {
    const savedTheme = localStorage.getItem('vdc_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      applyTheme(savedTheme, false);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      applyTheme('light', false);
    } else {
      applyTheme('dark', false);
    }

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem('vdc_theme')) {
          applyTheme(e.matches ? 'light' : 'dark', false);
        }
      });
    }
  }

  function applyTheme(theme, save = true) {
    const isLight = (theme === 'light');
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.add('theme-white');
      if (btnToggleTheme) {
        btnToggleTheme.classList.add('active-theme-white');
        btnToggleTheme.setAttribute('title', 'Switch to Dark Theme (T)');
        btnToggleTheme.setAttribute('aria-label', 'Switch to Dark Theme');
      }
      if (iconSun) iconSun.classList.add('hidden');
      if (iconMoon) iconMoon.classList.remove('hidden');
      if (themeBtnText) themeBtnText.innerHTML = 'Dark Theme <kbd>T</kbd>';
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.classList.remove('theme-white');
      if (btnToggleTheme) {
        btnToggleTheme.classList.remove('active-theme-white');
        btnToggleTheme.setAttribute('title', 'Switch to White Theme (T)');
        btnToggleTheme.setAttribute('aria-label', 'Switch to White Theme');
      }
      if (iconSun) iconSun.classList.remove('hidden');
      if (iconMoon) iconMoon.classList.add('hidden');
      if (themeBtnText) themeBtnText.innerHTML = 'White Theme <kbd>T</kbd>';
    }
    if (save) {
      localStorage.setItem('vdc_theme', isLight ? 'light' : 'dark');
    }
  }

  function toggleTheme() {
    const isCurrentlyLight = document.documentElement.getAttribute('data-theme') === 'light' || document.body.classList.contains('theme-white');
    applyTheme(isCurrentlyLight ? 'dark' : 'light', true);
  }

  function toggleProjectorMode() {
    document.body.classList.toggle('projector-mode');
    if (btnToggleProjector) {
      btnToggleProjector.classList.toggle('active');
    }
  }

  /* ==========================================================================
     PRESENTATION CORE NAVIGATION ENGINE
     ========================================================================== */

  function initDeck() {
    initTheme();
    buildSlideDots();
    buildSlideOverviewGrid();
    setupEventListeners();
    setupSlideInteractions();
    goToSlide(1);
  }

  function goToSlide(slideNum) {
    if (slideNum < 1 || slideNum > TOTAL_SLIDES) return;

    currentSlideIndex = slideNum;

    // Reset slide scroll position for mobile & responsive stages
    const stage = document.getElementById('presentation-stage');
    if (stage) stage.scrollTop = 0;

    // Update Slide Elements
    slides.forEach((slide) => {
      const num = parseInt(slide.getAttribute('data-slide'), 10);
      if (num === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update Top HUD
    const meta = slideMetadata[currentSlideIndex - 1];
    hudSlideTitle.textContent = `${meta.index < 10 ? '0' + meta.index : meta.index}. ${meta.title}`;

    // Update Progress Bar & Mobile Hairline Progress
    const progressPercent = (currentSlideIndex / TOTAL_SLIDES) * 100;
    progressFill.style.width = `${progressPercent}%`;
    document.documentElement.style.setProperty('--mobile-progress', `${progressPercent}%`);

    // Update Bottom HUD Counters
    counterCurrent.textContent = currentSlideIndex < 10 ? `0${currentSlideIndex}` : currentSlideIndex;
    counterTotal.textContent = TOTAL_SLIDES < 10 ? `0${TOTAL_SLIDES}` : TOTAL_SLIDES;

    // Update Prev / Next Buttons
    btnPrev.disabled = (currentSlideIndex === 1);
    if (currentSlideIndex === TOTAL_SLIDES) {
      btnNext.querySelector('.nav-btn-text').textContent = 'Restart Deck';
    } else {
      btnNext.querySelector('.nav-btn-text').textContent = 'Next Slide';
    }

    // Update Bottom Dots
    const dots = slideDotsIndicator.querySelectorAll('.slide-dot');
    dots.forEach((dot, idx) => {
      if (idx + 1 === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update Slide Overview Grid Active Card
    const gridCards = somGrid.querySelectorAll('.som-card');
    gridCards.forEach((card, idx) => {
      if (idx + 1 === currentSlideIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Update Presenter Notes Drawer Content
    updatePresenterNotesContent(meta);
  }

  function nextSlide() {
    if (currentSlideIndex < TOTAL_SLIDES) {
      goToSlide(currentSlideIndex + 1);
    } else {
      goToSlide(1); // loop back to title on end
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 1) {
      goToSlide(currentSlideIndex - 1);
    }
  }

  function buildSlideDots() {
    slideDotsIndicator.innerHTML = '';
    for (let i = 1; i <= TOTAL_SLIDES; i++) {
      const dot = document.createElement('div');
      dot.className = `slide-dot ${i === 1 ? 'active' : ''}`;
      dot.title = `Jump to Slide ${i}: ${slideMetadata[i - 1].title}`;
      dot.setAttribute('data-target-slide', i);
      dot.addEventListener('click', () => goToSlide(i));
      slideDotsIndicator.appendChild(dot);
    }
  }

  function buildSlideOverviewGrid() {
    somGrid.innerHTML = '';
    slideMetadata.forEach((meta) => {
      const card = document.createElement('div');
      card.className = `som-card ${meta.index === 1 ? 'active' : ''}`;
      card.setAttribute('data-slide-index', meta.index);
      card.innerHTML = `
        <div>
          <div class="som-card-num">SLIDE ${meta.index < 10 ? '0' + meta.index : meta.index}</div>
          <div class="som-card-title">${meta.title}</div>
        </div>
        <div class="som-card-tag">${meta.tagline}</div>
      `;
      card.addEventListener('click', () => {
        goToSlide(meta.index);
        closeSlideOverview();
      });
      somGrid.appendChild(card);
    });
  }

  function updatePresenterNotesContent(meta) {
    pndSlideTitle.textContent = `Slide ${meta.index}: ${meta.title}`;
    pndSpeechBox.textContent = meta.speech;

    pndTermsBox.innerHTML = '';
    meta.terms.forEach((term) => {
      const pill = document.createElement('span');
      pill.className = 'pnd-term-pill';
      pill.textContent = term;
      pndTermsBox.appendChild(pill);
    });
  }

  /* ==========================================================================
     FULLSCREEN & MODAL CONTROLLERS
     ========================================================================== */

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  function updateFullscreenIcons() {
    const iconExpand = btnFullscreen.querySelector('.icon-expand');
    const iconCompress = btnFullscreen.querySelector('.icon-compress');
    if (document.fullscreenElement) {
      iconExpand.classList.add('hidden');
      iconCompress.classList.remove('hidden');
    } else {
      iconExpand.classList.remove('hidden');
      iconCompress.classList.add('hidden');
    }
  }

  function togglePresenterNotes() {
    presenterNotesDrawer.classList.toggle('open');
  }

  function openSlideOverview() {
    slideOverviewModal.classList.add('open');
  }

  function closeSlideOverview() {
    slideOverviewModal.classList.remove('open');
  }

  function toggleSlideOverview() {
    slideOverviewModal.classList.toggle('open');
  }

  function openShortcutsHelp() {
    shortcutsModal.classList.add('open');
  }

  function closeShortcutsHelp() {
    shortcutsModal.classList.remove('open');
  }

  function closeAllModals() {
    presenterNotesDrawer.classList.remove('open');
    closeSlideOverview();
    closeShortcutsHelp();
  }

  /* ==========================================================================
     EVENT LISTENERS & KEYBOARD CONTROLS
     ========================================================================== */

  function setupEventListeners() {
    // HUD Button clicks
    btnNext.addEventListener('click', nextSlide);
    btnPrev.addEventListener('click', prevSlide);
    btnFullscreen.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', updateFullscreenIcons);

    // Theme & Projector Toggles
    if (btnToggleTheme) {
      btnToggleTheme.addEventListener('click', toggleTheme);
    }
    if (btnToggleProjector) {
      btnToggleProjector.addEventListener('click', toggleProjectorMode);
    }

    btnToggleNotes.addEventListener('click', togglePresenterNotes);
    btnCloseNotes.addEventListener('click', () => presenterNotesDrawer.classList.remove('open'));

    btnToggleGrid.addEventListener('click', toggleSlideOverview);
    btnCloseGrid.addEventListener('click', closeSlideOverview);
    somBackdrop.addEventListener('click', closeSlideOverview);

    btnToggleHelp.addEventListener('click', openShortcutsHelp);
    btnCloseHelp.addEventListener('click', closeShortcutsHelp);
    helpBackdrop.addEventListener('click', closeShortcutsHelp);

    if (btnStartPresentation) {
      btnStartPresentation.addEventListener('click', () => goToSlide(2));
    }
    if (btnRestartDeck) {
      btnRestartDeck.addEventListener('click', () => goToSlide(1));
    }
    if (btnOpenOverviewSummary) {
      btnOpenOverviewSummary.addEventListener('click', openSlideOverview);
    }

    // Touch Swipe Gestures for Mobile Phones & Tablets
    let touchStartX = 0;
    let touchStartY = 0;

    presentationContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    presentationContainer.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Ensure gesture is intentional horizontal swipe (>45px and predominantly horizontal)
      if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.35) {
        const targetTag = e.target.tagName;
        if (targetTag === 'INPUT' || targetTag === 'TEXTAREA' || e.target.closest('.timeline-container') || e.target.closest('.slider-row')) {
          return;
        }
        if (diffX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }, { passive: true });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // If typing inside an input element, do not trigger deck shortcuts
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        if (e.key === 'Escape') e.target.blur();
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Spacebar
          e.preventDefault();
          nextSlide();
          break;

        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          prevSlide();
          break;

        case 'Home':
          e.preventDefault();
          goToSlide(1);
          break;

        case 'End':
          e.preventDefault();
          goToSlide(TOTAL_SLIDES);
          break;

        case 't':
        case 'T':
          e.preventDefault();
          toggleTheme();
          break;

        case 'p':
        case 'P':
          e.preventDefault();
          toggleProjectorMode();
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;

        case 'n':
        case 'N':
          e.preventDefault();
          togglePresenterNotes();
          break;

        case 'm':
        case 'M':
        case 'o':
        case 'O':
          e.preventDefault();
          toggleSlideOverview();
          break;

        case '?':
        case 'h':
        case 'H':
          e.preventDefault();
          openShortcutsHelp();
          break;

        case 'Escape':
          e.preventDefault();
          closeAllModals();
          break;

        default:
          break;
      }
    });
  }

  /* ==========================================================================
     INDIVIDUAL SLIDE INTERACTION MODULES
     ========================================================================== */

  function setupSlideInteractions() {
    initSlide2_TypefaceSwitcher();
    initSlide3_Timeline();
    initSlide4_StrokeInspector();
    initSlide5_StressVisualizer();
    initSlide6_BracketMicroscope();
    initSlide7_OldStyleComparison();
    initSlide8_TransitionalMorph();
    initSlide9_ModernCaliper();
    initSlide10_SlabComparator();
    initSlide11_SansSerifDynamics();
    initSlide11_Figure129SansExamples();
    initSlide12_WeightController();
    initSlide13_WidthUniversMatrix();
    initSlide14_SummaryChain();
  }

  // --------------------------------------------------------------------------
  // SLIDE 2: Interactive Specimen Switcher
  // --------------------------------------------------------------------------
  function initSlide2_TypefaceSwitcher() {
    const input = document.getElementById('sample-text-input');
    const liveText = document.getElementById('live-specimen-text');
    const metaText = document.getElementById('live-specimen-meta');
    const analysisText = document.getElementById('analysis-text');
    const buttons = document.querySelectorAll('#type-switcher-buttons .switcher-btn');

    const fontStyles = {
      garamond: {
        fontFamily: "'EB Garamond', serif",
        meta: "Garamond • 1617 • France (Claude Garamond)",
        desc: "<strong>Old Style (Garamond):</strong> Organic humanist proportions rooted in pen calligraphy, gentle stroke contrast, heavily bracketed serifs."
      },
      baskerville: {
        fontFamily: "'Libre Baskerville', serif",
        meta: "Baskerville • 1757 • England (John Baskerville)",
        desc: "<strong>Transitional (Baskerville):</strong> Greater vertical discipline, sharper serifs, heightened stroke contrast between stems and bars."
      },
      bodoni: {
        fontFamily: "'Bodoni Moda', serif",
        meta: "Bodoni • 1788 • Italy (Giambattista Bodoni)",
        desc: "<strong>Modern (Bodoni):</strong> Severe mechanical geometry, razor-thin unbracketed hairline serifs meeting heavy stems at 90° angles."
      },
      slab: {
        fontFamily: "'Roboto Slab', serif",
        meta: "Century Expanded • 1894 • US (Egyptian/Slab)",
        desc: "<strong>Slab Serif (Century Expanded):</strong> Massive square rectangular serifs engineered for high legibility in industrial posters and newspapers."
      },
      sans: {
        fontFamily: "'Inter', sans-serif",
        meta: "Helvetica • 1957 • Switzerland (Miedinger & Hoffmann)",
        desc: "<strong>Sans Serif (Helvetica):</strong> Unadorned terminals, uniform stroke weight, and contemporary machined aesthetic suited for digital screens."
      }
    };

    if (input) {
      input.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        liveText.textContent = val.length > 0 ? val : 'Typographia';
      });
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const fontKey = btn.getAttribute('data-font');
        const data = fontStyles[fontKey];
        if (data) {
          liveText.style.fontFamily = data.fontFamily;
          metaText.textContent = data.meta;
          analysisText.innerHTML = data.desc;
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // SLIDE 3: Interactive Historical Timeline
  // --------------------------------------------------------------------------
  function initSlide3_Timeline() {
    const nodes = document.querySelectorAll('.timeline-node');
    const lineActive = document.getElementById('timeline-line-active');
    const specLarge = document.getElementById('td-specimen-large');
    const fontName = document.getElementById('td-font-name');
    const meta = document.getElementById('td-meta');
    const featuresList = document.getElementById('td-features-list');
    const historyDesc = document.getElementById('td-history-desc');
    const btnPrevTimeline = document.getElementById('btn-prev-timeline');
    const btnNextTimeline = document.getElementById('btn-next-timeline');

    const timelineData = [
      {
        year: "1617",
        class: "Old Style / Serif",
        font: "Garamond",
        origin: "France • 1617 • Claude Garamond / Jean Jannon",
        fontFamily: "'EB Garamond', serif",
        glyph: "Gg",
        features: [
          "<strong>Stroke Contrast:</strong> Very low contrast between thick and thin strokes.",
          "<strong>Serif & Bracketing:</strong> Heavy, curved brackets connecting serif to main stem.",
          "<strong>Stress Axis:</strong> Extreme diagonal / oblique stress matching broad-nib pen calligraphy.",
          "<strong>Visual Feeling:</strong> Warm, organic, humanist, and noticeably less machined."
        ],
        history: "Directly descendant from Renaissance Venetian humanism. Cut in metal punches by hand, reflecting the organic tilt of the scribe's broad-nib quill before mechanized industrial uniformity."
      },
      {
        year: "1757",
        class: "Transitional",
        font: "Baskerville",
        origin: "England • 1757 • John Baskerville",
        fontFamily: "'Libre Baskerville', serif",
        glyph: "Bb",
        features: [
          "<strong>The Historic Bridge:</strong> Bridges the gap between Old Style and Modern.",
          "<strong>Refined Serifs:</strong> Sharper, more calculated serifs than Old Style.",
          "<strong>Increased Contrast:</strong> More contrast in stroke than Garamond, but less than Bodoni.",
          "<strong>Shift to Vertical:</strong> Stress rotates toward a near-vertical axis while retaining heavy bracketing."
        ],
        history: "Baskerville developed smoother wove paper and deeper black inks in England to print sharper, higher-contrast letters. It feels more machined while preserving humanist warmth."
      },
      {
        year: "1788",
        class: "Modern",
        font: "Bodoni",
        origin: "Italy • 1788 • Giambattista Bodoni",
        fontFamily: "'Bodoni Moda', serif",
        glyph: "Mm",
        features: [
          "<strong>Not Modern by Today:</strong> Radical break created in the late eighteenth century.",
          "<strong>Extreme Contrast:</strong> Spectacular disparity between massive stems and razor hairlines.",
          "<strong>Unbracketed Serifs:</strong> Flat hairline serifs meeting the stem at crisp 90° right angles.",
          "<strong>Strict Vertical Architecture:</strong> No noticeable diagonal stress; perfectly plumb vertical alignment."
        ],
        history: "Giambattista Bodoni in Parma and the Didot family in Paris championed absolute geometric purity and mechanical precision, rejecting the organic handwriting aesthetic of prior centuries."
      },
      {
        year: "1894",
        class: "Egyptian / Slab Serif",
        font: "Century Expanded",
        origin: "United States • 1894 • Linn Boyd Benton / Morris Fuller Benton",
        fontFamily: "'Roboto Slab', serif",
        glyph: "Ee",
        features: [
          "<strong>Blocky Serifs:</strong> Prominent, heavy rectangular square serifs.",
          "<strong>Consistent Stroke:</strong> Uniform stroke thickness with minimal or no contrast in early models.",
          "<strong>Advertising Clarity:</strong> Engineered for crude high-speed printing on posters and newspapers.",
          "<strong>Clarendons:</strong> Later refined variants reintroduced slight contrast and gentle bracket fillets."
        ],
        history: "Triggered by the Industrial Revolution's explosion in commerce, billboards, and daily newspapers. Slab serifs commanded instant visual attention from readers on bustling city streets."
      },
      {
        year: "1957",
        class: "Contemporary / Sans Serif",
        font: "Helvetica",
        origin: "Switzerland • 1957 • Max Miedinger & Edouard Hoffmann",
        fontFamily: "'Inter', sans-serif",
        glyph: "Hh",
        features: [
          "<strong>No Serifs:</strong> Clean, unadorned terminals with simple machined geometry.",
          "<strong>Bauhaus & Art Deco Influence:</strong> Popularized internationally 100 years after initial invention.",
          "<strong>Vertical Reading Dynamic:</strong> Tends to read vertically; typographers add extra leading for comfortable flow.",
          "<strong>Digital Primacy:</strong> Universal, neutral, and ideally suited for contemporary society and screens."
        ],
        history: "Born at the Haas Type Foundry in Münchenstein, Switzerland. Became the ultimate symbol of the International Typographic Style (Swiss Style), prioritizing neutral clarity and objective communication."
      }
    ];

    let currentTimelineIdx = 0;

    function renderTimeline(idx) {
      currentTimelineIdx = idx;
      nodes.forEach((n, i) => {
        if (i === idx) n.classList.add('active');
        else n.classList.remove('active');
      });

      const pct = (idx / (timelineData.length - 1)) * 100;
      lineActive.style.width = `${pct}%`;

      const data = timelineData[idx];
      specLarge.style.fontFamily = data.fontFamily;
      specLarge.textContent = data.glyph;
      fontName.textContent = `${data.font} (${data.class})`;
      meta.textContent = data.origin;

      featuresList.innerHTML = '';
      data.features.forEach((feat) => {
        const li = document.createElement('li');
        li.innerHTML = feat;
        featuresList.appendChild(li);
      });

      historyDesc.textContent = data.history;
    }

    nodes.forEach((node, idx) => {
      node.addEventListener('click', () => renderTimeline(idx));
    });

    if (btnPrevTimeline) {
      btnPrevTimeline.addEventListener('click', () => {
        if (currentTimelineIdx > 0) renderTimeline(currentTimelineIdx - 1);
      });
    }

    if (btnNextTimeline) {
      btnNextTimeline.addEventListener('click', () => {
        if (currentTimelineIdx < timelineData.length - 1) renderTimeline(currentTimelineIdx + 1);
      });
    }
  }

  // --------------------------------------------------------------------------
  // SLIDE 4: The Anatomy of Strokes Inspector
  // --------------------------------------------------------------------------
  function initSlide4_StrokeInspector() {
    const zones = document.querySelectorAll('.interactive-stroke-zone');
    const badge = document.getElementById('stroke-active-label');
    const arName = document.getElementById('ar-name');
    const arType = document.getElementById('ar-type');
    const arThickness = document.getElementById('ar-thickness');
    const arDesc = document.getElementById('ar-desc');

    zones.forEach((zone) => {
      zone.addEventListener('mouseenter', () => {
        zones.forEach((z) => z.classList.remove('highlighted'));
        zone.classList.add('highlighted');

        const part = zone.getAttribute('data-part');
        const type = zone.getAttribute('data-type');
        const thickness = zone.getAttribute('data-thickness');
        const desc = zone.getAttribute('data-desc');

        if (badge) badge.textContent = part;
        if (arName) arName.textContent = part;
        if (arType) arType.textContent = type;
        if (arThickness) arThickness.textContent = `Stroke Quality: ${thickness}`;
        if (arDesc) arDesc.textContent = desc;
      });
    });
  }

  // --------------------------------------------------------------------------
  // SLIDE 5: Stress in Letterforms Simulator
  // --------------------------------------------------------------------------
  function initSlide5_StressVisualizer() {
    const stressPath = document.getElementById('stress-letter-path');
    const axisLine = document.getElementById('stress-axis-line');
    const marker1 = document.getElementById('stress-axis-marker-1');
    const marker2 = document.getElementById('stress-axis-marker-2');
    const svgStressLabel = document.getElementById('svg-stress-label');
    const badgeAxis = document.getElementById('stress-badge-axis');
    const sipTitle = document.getElementById('sip-title');
    const sipBody = document.getElementById('sip-body');
    const tabButtons = document.querySelectorAll('.stress-tab-btn');
    const ctrlButtons = document.querySelectorAll('.btn-stress-select');

    // Morphing compound SVG path definitions for the letter 'O'
    const stressConfigs = {
      diagonal: {
        badge: "Axis: ~ -20° Diagonal (Old Style)",
        label: "DIAGONAL AXIS (GARAMOND / CASLON)",
        axisCoords: { x1: 120, y1: 50, x2: 280, y2: 350 },
        // Diagonal 'O': Outer ellipse slightly tilted, inner counter ellipse rotated
        pathD: "M 200,40 C 300,40 360,110 360,200 C 360,290 300,360 200,360 C 100,360 40,290 40,200 C 40,110 100,40 200,40 Z M 215,85 C 160,85 140,135 140,200 C 140,265 160,315 215,315 C 245,315 260,265 260,200 C 260,135 245,85 215,85 Z",
        title: "Diagonal (Oblique) Stress",
        body: "Thick-thin contrast follows a diagonal axis (top-left to bottom-right). Inherited directly from the 45° angle of the calligrapher's broad-nib quill. Found universally in Old Style typefaces like Garamond and Caslon. Feels traditional, warm, and handwritten."
      },
      vertical: {
        badge: "Axis: 90° Vertical (Modern)",
        label: "VERTICAL AXIS (BODONI / DIDOT)",
        axisCoords: { x1: 200, y1: 40, x2: 200, y2: 360 },
        // Vertical 'O': Perfect vertical plumb, massive sides, razor top and bottom
        pathD: "M 200,40 C 310,40 360,110 360,200 C 360,290 310,360 200,360 C 90,360 40,290 40,200 C 40,110 90,40 200,40 Z M 200,60 C 240,60 245,120 245,200 C 245,280 240,340 200,340 C 160,340 155,280 155,200 C 155,120 160,60 200,60 Z",
        title: "Vertical Stress",
        body: "Thick strokes are strictly vertical, thin strokes are razor-horizontal. Common in Modern serif typefaces like Bodoni and Didot. Gives the letterform an architectural, dignified, formal, and elegant posture."
      },
      horizontal: {
        badge: "Axis: 0° Horizontal (Experimental)",
        label: "HORIZONTAL AXIS (KARLOFF NEGATIVE)",
        axisCoords: { x1: 40, y1: 200, x2: 360, y2: 200 },
        // Horizontal 'O': Inverted contrast, thick top and bottom, thin sides
        pathD: "M 200,40 C 310,40 360,110 360,200 C 360,290 310,360 200,360 C 90,360 40,290 40,200 C 40,110 90,40 200,40 Z M 200,120 C 290,120 340,150 340,200 C 340,250 290,280 200,280 C 110,280 60,250 60,200 C 60,150 110,120 200,120 Z",
        title: "Horizontal Stress",
        body: "Thick strokes are horizontal while vertical stems are thin. Rare in body text and predominantly used for decorative or experimental display (such as Karloff Negative). Deliberately inverts calligraphic tradition to provoke curiosity."
      },
      monolinear: {
        badge: "Axis: None (Monolinear / Sans Serif)",
        label: "MONOLINEAR (HELVETICA / ARIAL)",
        axisCoords: { x1: 200, y1: 200, x2: 200, y2: 200 }, // hidden / zero-length
        // Monolinear 'O': Uniform thickness circle/ellipse
        pathD: "M 200,40 C 288,40 360,112 360,200 C 360,288 288,360 200,360 C 112,360 40,288 40,200 C 40,112 112,40 200,40 Z M 200,82 C 265,82 318,135 318,200 C 318,265 265,318 200,318 C 135,318 82,265 82,200 C 82,135 135,82 200,82 Z",
        title: "No Stress (Monolinear)",
        body: "Strokes maintain equal thickness throughout the entire contour. Predominant in Sans-Serif typefaces like Helvetica and Arial. Delivers uniform, neutral, machined clarity without directional bias."
      }
    };

    function applyStress(type) {
      const cfg = stressConfigs[type];
      if (!cfg) return;

      // Update paths and SVG attributes
      stressPath.setAttribute('d', cfg.pathD);
      axisLine.setAttribute('x1', cfg.axisCoords.x1);
      axisLine.setAttribute('y1', cfg.axisCoords.y1);
      axisLine.setAttribute('x2', cfg.axisCoords.x2);
      axisLine.setAttribute('y2', cfg.axisCoords.y2);

      marker1.setAttribute('cx', cfg.axisCoords.x1);
      marker1.setAttribute('cy', cfg.axisCoords.y1);
      marker2.setAttribute('cx', cfg.axisCoords.x2);
      marker2.setAttribute('cy', cfg.axisCoords.y2);

      if (type === 'monolinear') {
        axisLine.style.opacity = '0';
        marker1.style.opacity = '0';
        marker2.style.opacity = '0';
      } else {
        axisLine.style.opacity = '1';
        marker1.style.opacity = '1';
        marker2.style.opacity = '1';
      }

      svgStressLabel.textContent = cfg.label;
      badgeAxis.textContent = cfg.badge;
      sipTitle.textContent = cfg.title;
      sipBody.textContent = cfg.body;

      // Sync both UI sets
      tabButtons.forEach((tab) => {
        if (tab.getAttribute('data-stress') === type) tab.classList.add('active');
        else tab.classList.remove('active');
      });

      ctrlButtons.forEach((btn) => {
        if (btn.getAttribute('data-type') === type) btn.classList.add('active');
        else btn.classList.remove('active');
      });
    }

    tabButtons.forEach((tab) => {
      tab.addEventListener('click', () => applyStress(tab.getAttribute('data-stress')));
    });

    ctrlButtons.forEach((btn) => {
      btn.addEventListener('click', () => applyStress(btn.getAttribute('data-type')));
    });
  }

  // --------------------------------------------------------------------------
  // SLIDE 6: Serif & Bracket Microscope
  // --------------------------------------------------------------------------
  function initSlide6_BracketMicroscope() {
    const stemSerifPath = document.getElementById('stem-serif-path');
    const badge = document.getElementById('bracket-status-badge');
    const formText = document.getElementById('current-form-text');
    const calloutBracket = document.getElementById('callout-bracket');
    const calloutSerif = document.getElementById('callout-serif');

    const btnSerifOn = document.getElementById('btn-serif-on');
    const btnSerifOff = document.getElementById('btn-serif-off');
    const btnBracketOn = document.getElementById('btn-bracket-on');
    const btnBracketOff = document.getElementById('btn-bracket-off');
    const btnReset = document.getElementById('btn-reset-bracket');

    let hasSerif = true;
    let hasBracket = true;

    // SVG foot terminal paths for morphing
    // Stem width is from x=180 to x=320 (width 140), base line at y=410
    const paths = {
      bracketedSerif: "M 180,30 L 320,30 L 320,270 Q 320,380 440,390 L 440,410 L 60,410 L 60,390 Q 180,380 180,270 Z",
      unbracketedSerif: "M 180,30 L 320,30 L 320,390 L 440,390 L 440,410 L 60,410 L 60,390 L 180,390 Z",
      sansSerif: "M 180,30 L 320,30 L 320,410 L 180,410 Z"
    };

    function updateMicroscope() {
      if (hasSerif && hasBracket) {
        stemSerifPath.setAttribute('d', paths.bracketedSerif);
        badge.textContent = "Curved Bracket Active";
        formText.textContent = "Old Style / Transitional (Garamond, Baskerville)";
        calloutBracket.style.display = 'block';
        calloutSerif.style.display = 'block';

        btnSerifOn.classList.add('active');
        btnSerifOff.classList.remove('active');
        btnBracketOn.classList.add('active');
        btnBracketOff.classList.remove('active');
      } else if (hasSerif && !hasBracket) {
        stemSerifPath.setAttribute('d', paths.unbracketedSerif);
        badge.textContent = "Unbracketed (90° Sharp Join)";
        formText.textContent = "Modern (Bodoni, Didot)";
        calloutBracket.style.display = 'none';
        calloutSerif.style.display = 'block';

        btnSerifOn.classList.add('active');
        btnSerifOff.classList.remove('active');
        btnBracketOn.classList.remove('active');
        btnBracketOff.classList.add('active');
      } else {
        // Sans Serif
        stemSerifPath.setAttribute('d', paths.sansSerif);
        badge.textContent = "Sans Serif (No Terminals)";
        formText.textContent = "Contemporary Sans Serif (Helvetica, Univers)";
        calloutBracket.style.display = 'none';
        calloutSerif.style.display = 'none';

        btnSerifOn.classList.remove('active');
        btnSerifOff.classList.add('active');
        btnBracketOn.classList.remove('active');
        btnBracketOff.classList.remove('active');
      }
    }

    btnSerifOn.addEventListener('click', () => {
      hasSerif = true;
      updateMicroscope();
    });

    btnSerifOff.addEventListener('click', () => {
      hasSerif = false;
      updateMicroscope();
    });

    btnBracketOn.addEventListener('click', () => {
      hasSerif = true;
      hasBracket = true;
      updateMicroscope();
    });

    btnBracketOff.addEventListener('click', () => {
      hasSerif = true;
      hasBracket = false;
      updateMicroscope();
    });

    btnReset.addEventListener('click', () => {
      hasSerif = true;
      hasBracket = true;
      updateMicroscope();
    });
  }

  // --------------------------------------------------------------------------
  // SLIDE 7: Old Style Comparison
  // --------------------------------------------------------------------------
  function initSlide7_OldStyleComparison() {
    const compButtons = document.querySelectorAll('.btn-comp');
    const modernSide = document.querySelector('.modern-side');
    if (!modernSide) return;

    const watermark = modernSide.querySelector('.sh-watermark');
    const letter = modernSide.querySelector('.sh-letter');
    const strong = modernSide.querySelector('.sh-caption strong');
    const span = modernSide.querySelector('.sh-caption span');

    const targets = {
      bodoni: {
        year: "1788",
        letterFont: "'Bodoni Moda', serif",
        name: "Bodoni (Modern)",
        traits: "No brackets • Extreme contrast • Vertical axis"
      },
      baskerville: {
        year: "1757",
        letterFont: "'Libre Baskerville', serif",
        name: "Baskerville (Transitional)",
        traits: "Heavy brackets • Sharper contrast • Near vertical"
      },
      helvetica: {
        year: "1957",
        letterFont: "'Inter', sans-serif",
        name: "Helvetica (Sans Serif)",
        traits: "Zero serifs • Monolinear stroke • Machined shape"
      }
    };

    compButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        compButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const key = btn.getAttribute('data-target');
        const data = targets[key];
        if (data) {
          watermark.textContent = data.year;
          letter.style.fontFamily = data.letterFont;
          strong.textContent = data.name;
          span.textContent = data.traits;
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // SLIDE 8: Transitional Evolution Morph
  // --------------------------------------------------------------------------
  function initSlide8_TransitionalMorph() {
    const stepButtons = document.querySelectorAll('.step-btn');
    const morphLetter = document.getElementById('morph-letter');
    const morphTagline = document.getElementById('morph-tagline');
    const mmContrast = document.getElementById('mm-contrast');
    const mmAxis = document.getElementById('mm-axis');
    const mmBracket = document.getElementById('mm-bracket');
    const mvContrast = document.getElementById('mv-contrast');
    const mvAxis = document.getElementById('mv-axis');
    const mvBracket = document.getElementById('mv-bracket');

    const stepData = {
      "1": {
        fontFamily: "'EB Garamond', serif",
        name: "Garamond",
        tagline: "“Old Style: Handcrafted Humanist & Gentle Contrast”",
        contrast: 25,
        contrastText: "Low (Subtle)",
        axis: 30,
        axisText: "Steep Diagonal",
        bracket: 90,
        bracketText: "Heavy Bracket"
      },
      "2": {
        fontFamily: "'Libre Baskerville', serif",
        name: "Baskerville",
        tagline: "“The Bridge: Balanced Contrast & Upright Stress”",
        contrast: 60,
        contrastText: "Medium-High",
        axis: 80,
        axisText: "Near Vertical",
        bracket: 70,
        bracketText: "Retained Heavy"
      },
      "3": {
        fontFamily: "'Bodoni Moda', serif",
        name: "Bodoni",
        tagline: "“Modern: Extreme Contrast & Mathematical Architecture”",
        contrast: 100,
        contrastText: "Extreme (10:1)",
        axis: 100,
        axisText: "Strictly Vertical",
        bracket: 5,
        bracketText: "None / Hairline"
      }
    };

    stepButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        stepButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const step = btn.getAttribute('data-step');
        const data = stepData[step];
        if (data) {
          morphLetter.style.fontFamily = data.fontFamily;
          morphLetter.textContent = data.name;
          morphTagline.textContent = data.tagline;

          mmContrast.style.width = `${data.contrast}%`;
          mmAxis.style.width = `${data.axis}%`;
          mmBracket.style.width = `${data.bracket}%`;

          mvContrast.textContent = data.contrastText;
          mvAxis.textContent = data.axisText;
          mvBracket.textContent = data.bracketText;
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // SLIDE 9: Modern Typeface Extreme Contrast Caliper
  // --------------------------------------------------------------------------
  function initSlide9_ModernCaliper() {
    const slider = document.getElementById('contrast-slider');
    const caption = document.getElementById('slider-caption');
    const letter = document.querySelector('.caliper-letter');

    if (slider && letter) {
      slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (val < 4) {
          letter.style.fontFamily = "'EB Garamond', serif";
          caption.textContent = `Contrast Ratio: 1.${val}:1 — Low Contrast (Old Style Heritage)`;
        } else if (val < 8) {
          letter.style.fontFamily = "'Libre Baskerville', serif";
          caption.textContent = `Contrast Ratio: ${val}:1 — Refined Contrast (Transitional)`;
        } else {
          letter.style.fontFamily = "'Bodoni Moda', serif";
          caption.textContent = `Contrast Ratio: 10:1 — Extreme Contrast (Bodoni Modern)`;
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // SLIDE 10: Slab Serif Comparator
  // --------------------------------------------------------------------------
  function initSlide10_SlabComparator() {
    const buttons = document.querySelectorAll('.btn-slab-mode');
    const letterSpec = document.getElementById('slab-letter-specimen');
    const metaTag = document.getElementById('slab-meta-tag');

    const modes = {
      slab: {
        fontFamily: "'Roboto Slab', serif",
        weight: "800",
        meta: "Industrial Square Slabs • Uniform Heavy Weight",
        letter: "H"
      },
      clarendon: {
        fontFamily: "'Roboto Slab', serif",
        weight: "600",
        meta: "Clarendon Style • Subtly Bracketed with Mild Contrast",
        letter: "H"
      },
      delicate: {
        fontFamily: "'Bodoni Moda', serif",
        weight: "500",
        meta: "Classic Roman Serif • Tapered Bracketed Terminal",
        letter: "H"
      }
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const modeKey = btn.getAttribute('data-mode');
        const data = modes[modeKey];
        if (data) {
          letterSpec.style.fontFamily = data.fontFamily;
          letterSpec.style.fontWeight = data.weight;
          letterSpec.textContent = data.letter;
          metaTag.textContent = data.meta;
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // SLIDE 11: Sans Serif Reading Dynamics & Leading Simulator
  // --------------------------------------------------------------------------
  function initSlide11_SansSerifDynamics() {
    const sample = document.getElementById('reading-sample-text');
    const slider = document.getElementById('leading-slider');
    const leadingBadge = document.getElementById('leading-badge');
    const leadingValText = document.getElementById('leading-val-text');
    const btnSans = document.getElementById('btn-toggle-sans');
    const btnSerif = document.getElementById('btn-toggle-serif-read');

    if (slider && sample) {
      slider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value).toFixed(1);
        sample.style.lineHeight = val;
        leadingValText.textContent = `${val}x`;
        leadingBadge.textContent = `Leading: ${val}x ${val > 1.6 ? '(Generous)' : val < 1.3 ? '(Tight)' : '(Balanced)'}`;
      });
    }

    if (btnSans && btnSerif) {
      btnSans.addEventListener('click', () => {
        btnSans.classList.add('active');
        btnSerif.classList.remove('active');
        sample.style.fontFamily = "'Inter', sans-serif";
      });

      btnSerif.addEventListener('click', () => {
        btnSerif.classList.add('active');
        btnSans.classList.remove('active');
        sample.style.fontFamily = "'EB Garamond', serif";
      });
    }
  }

  // --------------------------------------------------------------------------
  // SLIDE 11 (CONTINUED): Figure 12.9 Four Examples Switcher
  // --------------------------------------------------------------------------
  function initSlide11_Figure129SansExamples() {
    const tags = document.querySelectorAll('#sans-examples-tags .seb-tag');
    const ssbFontName = document.getElementById('ssb-font-name');
    const ssbAlphabet = document.getElementById('ssb-alphabet');

    const sansFamilies = {
      univers: {
        name: "1. Univers (Adrian Frutiger, 1957)",
        fontFamily: "'Inter', sans-serif"
      },
      helvetica: {
        name: "2. Helvetica (Max Miedinger, 1957)",
        fontFamily: "'Inter', sans-serif"
      },
      gillsans: {
        name: "3. Gill Sans (Eric Gill, 1928)",
        fontFamily: "'Cabin', 'Gill Sans', sans-serif"
      },
      franklingothic: {
        name: "4. Franklin Gothic (Morris Fuller Benton, 1902)",
        fontFamily: "'Libre Franklin', sans-serif"
      }
    };

    tags.forEach((tag) => {
      tag.addEventListener('click', () => {
        tags.forEach((t) => t.classList.remove('active'));
        tag.classList.add('active');

        const key = tag.getAttribute('data-sans');
        const data = sansFamilies[key];
        if (data && ssbFontName && ssbAlphabet) {
          ssbFontName.textContent = data.name;
          ssbAlphabet.style.fontFamily = data.fontFamily;
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // SLIDE 12: Type Styles & Weights Controller
  // --------------------------------------------------------------------------
  function initSlide12_WeightController() {
    const heroLetter = document.getElementById('weight-hero-letter');
    const sampleText = document.getElementById('weight-sample-text');
    const badge = document.getElementById('active-weight-badge');
    const descCard = document.getElementById('weight-desc-card');
    const weightButtons = document.querySelectorAll('.btn-weight');
    const gradeButtons = document.querySelectorAll('.btn-grade');

    const descriptions = {
      "300": "<strong>2. Light (Thin):</strong> The lighter, thinner version of the medium typeface. Lends a delicate, airy elegance to large headings.",
      "500": "<strong>1. Medium (Regular / Book / Normal):</strong> The most basic or standard weight of a typeface. Can be relatively heavier depending on family size.",
      "600": "<strong>Semi-bold:</strong> Nuanced step above medium, providing subtle hierarchy without heavy ink weight.",
      "650": "<strong>Demi-bold:</strong> Intermediate weight often favored in editorial captions and subheadings.",
      "700": "<strong>3. Bold (General Term):</strong> Primary emphatic grade. Thickens strokes dramatically while keeping internal counters open.",
      "800": "<strong>Heavy:</strong> Dense visual impact engineered to command immediate attention.",
      "850": "<strong>Extra-bold:</strong> Ultra-heavy display weight for maximum contrast.",
      "900": "<strong>Black / Ultra:</strong> Highest ink density variation. Counters shrink to jewel-like negative shapes."
    };

    function applyWeight(weight, name) {
      if (heroLetter) heroLetter.style.fontWeight = weight;
      if (sampleText) sampleText.style.fontWeight = weight;
      if (badge) badge.textContent = `Weight: ${weight} (${name})`;
      if (descCard) descCard.innerHTML = descriptions[weight] || `<strong>${name} (Weight ${weight}):</strong> Specialized variation.`;
    }

    weightButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        weightButtons.forEach((b) => b.classList.remove('active'));
        gradeButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const weight = btn.getAttribute('data-weight');
        const name = btn.getAttribute('data-name');
        applyWeight(weight, name);
      });
    });

    gradeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        weightButtons.forEach((b) => b.classList.remove('active'));
        gradeButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const weight = btn.getAttribute('data-weight');
        const name = btn.getAttribute('data-name');
        applyWeight(weight, name);
      });
    });
  }

  // --------------------------------------------------------------------------
  // SLIDE 13: Type Styles — Width Variations & Univers Matrix (Figure 12.10)
  // --------------------------------------------------------------------------
  function initSlide13_WidthUniversMatrix() {
    const buttons = document.querySelectorAll('.btn-univers-style');
    const badge = document.getElementById('univers-active-badge');
    const word = document.getElementById('univers-display-word');
    const sub = document.getElementById('univers-specimen-sub');
    const desc = document.getElementById('univers-desc-box');
    const guideV = document.querySelector('.guide-v');
    const guideH = document.querySelector('.guide-h');

    const universVariations = {
      "condensed": {
        title: "Univers Condensed",
        weight: "400",
        scaleX: "0.72",
        letterSpacing: "-0.04em",
        sub: "Narrow Proportions • Vertical Line Direction",
        desc: "<strong>4. Condensed (Narrow / Compressed):</strong> Narrow version of a typeface that gives letterforms the appearance of a vertical line direction. Highly efficient for compact space.",
        dir: "vertical"
      },
      "bold-condensed": {
        title: "Univers Bold Condensed",
        weight: "700",
        scaleX: "0.72",
        letterSpacing: "-0.04em",
        sub: "Heavy + Narrow • Intense Vertical Emphasis",
        desc: "<strong>Bold Condensed:</strong> Combines heavy stroke mass with compressed horizontal width, maximizing poster impact per square inch.",
        dir: "vertical"
      },
      "light": {
        title: "Univers Light",
        weight: "300",
        scaleX: "1.0",
        letterSpacing: "0",
        sub: "Standard Width • Delicate Hairline Stroke",
        desc: "<strong>Light:</strong> Standard geometric width with thin, elegant strokes. Open and airy.",
        dir: "balanced"
      },
      "medium": {
        title: "Univers Medium",
        weight: "500",
        scaleX: "1.0",
        letterSpacing: "0",
        sub: "Standard Width • Balanced Horizontal / Vertical Flow",
        desc: "<strong>1. Medium (Standard):</strong> The baseline reference point for the entire Univers 2D matrix designed by Adrian Frutiger in 1957.",
        dir: "balanced"
      },
      "bold": {
        title: "Univers Bold",
        weight: "700",
        scaleX: "1.0",
        letterSpacing: "0",
        sub: "Standard Width • Authoritative Weight",
        desc: "<strong>Bold:</strong> Substantially heavier strokes without altering standard width proportions.",
        dir: "balanced"
      },
      "extended": {
        title: "Univers Extended",
        weight: "400",
        scaleX: "1.32",
        letterSpacing: "0.06em",
        sub: "Expanded Width • Horizontal Line Direction",
        desc: "<strong>5. Extended (Expanded):</strong> Wider than the standard medium typeface. Because of the emphasis on width, it creates a prominent horizontal line direction.",
        dir: "horizontal"
      },
      "bold-extended": {
        title: "Univers Bold Extended",
        weight: "700",
        scaleX: "1.32",
        letterSpacing: "0.06em",
        sub: "Heavy + Expanded • Extreme Horizontal Presence",
        desc: "<strong>Bold Extended:</strong> Maximum width and maximum weight combined, creating massive horizontal presence across the page.",
        dir: "horizontal"
      }
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const styleKey = btn.getAttribute('data-style');
        const data = universVariations[styleKey];
        if (data) {
          if (badge) badge.textContent = data.title;
          if (word) {
            word.style.fontWeight = data.weight;
            word.style.transform = `scaleX(${data.scaleX})`;
            word.style.letterSpacing = data.letterSpacing;
          }
          if (sub) sub.textContent = data.sub;
          if (desc) desc.innerHTML = data.desc;

          // Adjust directional guides
          if (guideV && guideH) {
            if (data.dir === 'vertical') {
              guideV.style.opacity = '1';
              guideH.style.opacity = '0.15';
            } else if (data.dir === 'horizontal') {
              guideV.style.opacity = '0.15';
              guideH.style.opacity = '1';
            } else {
              guideV.style.opacity = '0.4';
              guideH.style.opacity = '0.4';
            }
          }
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // SLIDE 14: Final Summary Hierarchy Map
  // --------------------------------------------------------------------------
  function initSlide14_SummaryChain() {
    const chainNodes = document.querySelectorAll('.chain-node');
    const lineageCards = document.querySelectorAll('.l-card');

    chainNodes.forEach((node) => {
      node.addEventListener('click', () => {
        const target = parseInt(node.getAttribute('data-target-slide'), 10);
        if (target) goToSlide(target);
      });
    });

    lineageCards.forEach((card) => {
      card.addEventListener('click', () => {
        const target = parseInt(card.getAttribute('data-target-slide'), 10);
        if (target) goToSlide(target);
      });
    });
  }

  // Initialize presentation once DOM is fully parsed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDeck);
  } else {
    initDeck();
  }

})();
