/**
 * ====================================================================
 * PORTFOLIO CLIENT-SIDE INTERACTION SCRIPTS
 * ====================================================================
 * Suman S - Personal Portfolio
 * 
 * Features:
 * - Theme Switcher (Light/Dark + System Preference + Persistence)
 * - Mobile Navigation Menu & Focus Management
 * - Active Navigation Spy via IntersectionObserver
 * - Real-Time Form Character Counters & Validation Popovers
 * - Asynchronous Formspree Submission with Fallback Preview Mode
 * - Interactive Timeline Scroll Progress Indicator
 * - Accessible Modal Dialogs for Imprint, Privacy, and Cookie Policies
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------
  // 1. THEME TOGGLE (LIGHT / DARK MODE)
  // ------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Determine initial theme
  const savedTheme = localStorage.getItem('suman_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  htmlRoot.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = htmlRoot.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', currentTheme);
      localStorage.setItem('suman_theme', currentTheme);
    });
  }

  // Listen to OS system theme changes if no manual preference stored
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('suman_theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', newTheme);
    }
  });


  // ------------------------------------------------------------------
  // 2. MOBILE NAVIGATION MENU
  // ------------------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggleBtn.classList.toggle('active', isOpen);
      mobileToggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggleBtn.classList.remove('active');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside of nav menu
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && 
          !navMenu.contains(e.target) && 
          !mobileToggleBtn.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggleBtn.classList.remove('active');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }


  // ------------------------------------------------------------------
  // 3. ACTIVE NAVIGATION SPY (IntersectionObserver)
  // ------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => navObserver.observe(sec));
  }


  // ------------------------------------------------------------------
  // 4. LEFT SIDE RAIL ("BACK TO TOP" SMOOTH SCROLL)
  // ------------------------------------------------------------------
  const railBackToTopBtn = document.getElementById('rail-back-to-top');
  if (railBackToTopBtn) {
    railBackToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // ------------------------------------------------------------------
  // 5. WINDING SCROLL-DRAWN TIMELINE (CUBIC BEZIER S-CURVES + 55px NODES)
  // ------------------------------------------------------------------
  /**
   * HOW TO CUSTOMIZE:
   * 1. Curve Swing Amplitude:
   *    Change `curveSwingAmplitude` below (default: 42px). A higher value (e.g. 60px)
   *    swings the curve wider; a lower value (e.g. 25px) makes it straighter.
   * 2. Colors:
   *    Change `--color-timeline-stroke` and `--color-timeline-year` in styles.css.
   * 3. Graph-Paper Grid Size:
   *    Change `--grid-cell-size` in styles.css (e.g. 50px, 75px, 100px).
   * 4. Adding/Editing Entries:
   *    Add items to `timeline` in content.js. The winding path and nodes build automatically!
   */

  const timelineContainer = document.getElementById('timeline-winding-container');
  const timelineSvg = document.getElementById('timeline-svg');
  const timelinePath = document.getElementById('timeline-curve-path');
  const timelineNodesGroup = document.getElementById('timeline-nodes-group');
  const timelineList = document.getElementById('timeline-entries-list');

  // Binary search helper to find the exact distance along the path closest to (targetX, targetY)
  function findLengthAlongPath(path, targetX, targetY, totalLength) {
    let bestL = 0;
    let minDist = Infinity;
    const steps = 120;
    for (let i = 0; i <= steps; i++) {
      const l = (i / steps) * totalLength;
      const pt = path.getPointAtLength(l);
      const dist = Math.hypot(pt.x - targetX, pt.y - targetY);
      if (dist < minDist) {
        minDist = dist;
        bestL = l;
      }
    }
    // Refine with binary-like trisection search
    let low = Math.max(0, bestL - totalLength / steps);
    let high = Math.min(totalLength, bestL + totalLength / steps);
    for (let j = 0; j < 24; j++) {
      const mid1 = low + (high - low) / 3;
      const mid2 = high - (high - low) / 3;
      const pt1 = path.getPointAtLength(mid1);
      const pt2 = path.getPointAtLength(mid2);
      const d1 = Math.hypot(pt1.x - targetX, pt1.y - targetY);
      const d2 = Math.hypot(pt2.x - targetX, pt2.y - targetY);
      if (d1 < d2) {
        high = mid2;
      } else {
        low = mid1;
      }
    }
    return (low + high) / 2;
  }

  // Populate or synchronize timeline entries from content.js if available
  function syncTimelineEntriesWithData() {
    if (!timelineList || typeof PORTFOLIO_DATA === 'undefined' || !Array.isArray(PORTFOLIO_DATA.timeline)) {
      return;
    }
    
    // Check if the DOM list count matches data count; if not, dynamically build from data
    const domEntries = timelineList.querySelectorAll('.timeline-entry');
    if (domEntries.length !== PORTFOLIO_DATA.timeline.length) {
      timelineList.innerHTML = '';
      PORTFOLIO_DATA.timeline.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'timeline-entry';
        li.setAttribute('data-index', String(index));

        // Left Column: Big Year Numeral
        const yearCol = document.createElement('div');
        yearCol.className = 'entry-year-col';
        const bigYear = document.createElement('span');
        bigYear.className = 'entry-big-year';
        bigYear.textContent = item.yearNumeral || (item.period.match(/\b\d{4}\b/) ? item.period.match(/\b\d{4}\b/)[0] : '2026');
        yearCol.appendChild(bigYear);

        // Center Anchor
        const nodeCol = document.createElement('div');
        nodeCol.className = 'entry-node-col';
        const mobileMarker = document.createElement('span');
        mobileMarker.className = 'entry-mobile-marker';
        mobileMarker.setAttribute('aria-hidden', 'true');
        nodeCol.appendChild(mobileMarker);

        // Right Column: Organisation Block
        const contentCol = document.createElement('div');
        contentCol.className = 'entry-content-col';

        // Mobile year label
        const mobileYear = document.createElement('span');
        mobileYear.className = 'entry-mobile-year';
        mobileYear.textContent = item.period || item.yearNumeral;
        contentCol.appendChild(mobileYear);

        // Org logo tile
        const orgTile = document.createElement('div');
        orgTile.className = 'org-logo-tile';
        orgTile.setAttribute('title', item.organization);
        if (item.logoUrl) {
          const img = document.createElement('img');
          img.src = item.logoUrl;
          img.alt = item.orgShort || item.organization;
          img.className = 'org-tile-img';
          orgTile.appendChild(img);
        } else {
          const initials = document.createElement('span');
          initials.className = 'org-tile-initials';
          initials.textContent = item.orgShort || (item.organization.split(' ').map(w => w[0]).join('').slice(0, 4));
          orgTile.appendChild(initials);
        }
        contentCol.appendChild(orgTile);

        // Text in format: "years (organisation): role"
        const metaLine = document.createElement('p');
        metaLine.className = 'entry-meta-line';
        const prefix = document.createElement('span');
        prefix.className = 'entry-meta-prefix';
        prefix.textContent = `${item.period} (${item.organization}): `;
        const roleBold = document.createElement('strong');
        roleBold.className = 'entry-role-highlight';
        roleBold.textContent = item.role;
        metaLine.appendChild(prefix);
        metaLine.appendChild(roleBold);
        contentCol.appendChild(metaLine);

        if (item.description) {
          const desc = document.createElement('p');
          desc.className = 'entry-description-text';
          desc.textContent = item.description;
          contentCol.appendChild(desc);
        }

        li.appendChild(yearCol);
        li.appendChild(nodeCol);
        li.appendChild(contentCol);
        timelineList.appendChild(li);
      });
    }
  }

  syncTimelineEntriesWithData();

  // Timeline state variables
  let totalPathLength = 0;
  let nodeDistanceArray = [];
  let timelineNodes = [];
  let timelineEntryItems = [];

  function buildWindingCurveAndNodes() {
    if (!timelineContainer || !timelineSvg || !timelinePath || !timelineNodesGroup) return;

    timelineEntryItems = Array.from(timelineContainer.querySelectorAll('.timeline-entry'));
    if (timelineEntryItems.length === 0) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // On mobile: curve is hidden, entries are arranged vertically with mobile node markers
      timelineSvg.style.display = 'none';
      timelineEntryItems.forEach(e => e.classList.add('visible'));
      return;
    } else {
      timelineSvg.style.display = 'block';
    }

    const cWidth = timelineContainer.offsetWidth;
    const cHeight = timelineContainer.offsetHeight;
    const cRect = timelineContainer.getBoundingClientRect();

    timelineSvg.setAttribute('viewBox', `0 0 ${cWidth} ${cHeight}`);
    timelineSvg.style.width = `${cWidth}px`;
    timelineSvg.style.height = `${cHeight}px`;

    // Calculate center of the node corridor column
    const firstNodeCol = timelineEntryItems[0].querySelector('.entry-node-col');
    const firstNodeRect = firstNodeCol ? firstNodeCol.getBoundingClientRect() : null;
    const centerX = firstNodeRect 
      ? (firstNodeRect.left - cRect.left + firstNodeRect.width / 2)
      : (cWidth * 0.46);

    // Curve Swing Amplitude: adjusts how far the S-curves swing left/right
    const curveSwingAmplitude = 44;

    // Collect coordinates for each node
    const points = [];
    timelineEntryItems.forEach((entry, i) => {
      const eRect = entry.getBoundingClientRect();
      const y = (eRect.top - cRect.top) + (eRect.height / 2);
      // Alternate left and right of centre
      const direction = (i % 2 === 0) ? -1 : 1;
      const x = centerX + (direction * curveSwingAmplitude);
      points.push({ x, y, index: i });
    });

    // Build smooth cubic Bezier S-curve (C commands)
    const topY = Math.max(12, points[0].y - 80);
    let d = `M ${centerX} ${topY} `;

    // From top start to first node:
    const dY0 = points[0].y - topY;
    d += `C ${centerX} ${topY + dY0 * 0.5}, ${points[0].x} ${points[0].y - dY0 * 0.5}, ${points[0].x} ${points[0].y} `;

    // Between consecutive nodes:
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dy = p2.y - p1.y;
      // Pure vertical tangents ensure smooth, continuous S-curves with no kinks
      d += `C ${p1.x} ${p1.y + dy * 0.5}, ${p2.x} ${p2.y - dy * 0.5}, ${p2.x} ${p2.y} `;
    }

    // From last node to bottom exit:
    const lastP = points[points.length - 1];
    const bottomY = Math.min(cHeight - 12, lastP.y + 80);
    const dYEnd = bottomY - lastP.y;
    d += `C ${lastP.x} ${lastP.y + dYEnd * 0.5}, ${centerX} ${bottomY - dYEnd * 0.5}, ${centerX} ${bottomY}`;

    timelinePath.setAttribute('d', d);

    // Measure total path length
    totalPathLength = timelinePath.getTotalLength();
    timelinePath.style.strokeDasharray = `${totalPathLength} ${totalPathLength}`;

    // Place 55px circle nodes sampled using getPointAtLength
    timelineNodesGroup.innerHTML = '';
    nodeDistanceArray = [];
    timelineNodes = [];

    points.forEach((pt, i) => {
      const targetLength = findLengthAlongPath(timelinePath, pt.x, pt.y, totalPathLength);
      nodeDistanceArray.push(targetLength);

      // Sample path point so the node sits precisely on the curve
      const sampledPoint = timelinePath.getPointAtLength(targetLength);

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'timeline-node');
      g.setAttribute('data-index', String(i));
      g.setAttribute('transform', `translate(${sampledPoint.x}, ${sampledPoint.y})`);

      // Outer 55px diameter filled circle (radius 27.5px)
      const outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      outerCircle.setAttribute('class', 'node-outer-circle');
      outerCircle.setAttribute('r', '27.5');

      // Inner core disc (radius 13px)
      const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      innerCircle.setAttribute('class', 'node-inner-circle');
      innerCircle.setAttribute('r', '13');

      g.appendChild(outerCircle);
      g.appendChild(innerCircle);
      timelineNodesGroup.appendChild(g);
      timelineNodes.push(g);
    });
  }

  // Scroll-driven line drawing and node activation
  function updateTimelineDrawing() {
    if (window.innerWidth <= 768) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (timelinePath) timelinePath.style.strokeDashoffset = '0';
      timelineNodes.forEach(node => node.classList.add('active'));
      timelineEntryItems.forEach(entry => entry.classList.add('visible'));
      return;
    }

    const expSection = document.getElementById('experience');
    if (!expSection || !timelinePath || totalPathLength <= 0) return;

    const rect = expSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Start drawing as section approaches viewport center
    const startTrigger = windowHeight * 0.72;
    const totalScrollDistance = rect.height - windowHeight * 0.40;

    let progress = (startTrigger - rect.top) / totalScrollDistance;
    progress = Math.max(0, Math.min(1, progress));

    // Calculate current drawn length
    const drawnLength = progress * totalPathLength;
    timelinePath.style.strokeDashoffset = `${totalPathLength - drawnLength}`;

    // Node & Entry activation: appears only when drawn line reaches it
    // Scrolling back up smoothly un-draws line and un-activates nodes!
    nodeDistanceArray.forEach((nodeDist, idx) => {
      const nodeEl = timelineNodes[idx];
      const entryEl = timelineEntryItems[idx];

      if (drawnLength >= nodeDist - 12) {
        if (nodeEl) nodeEl.classList.add('active');
        if (entryEl) entryEl.classList.add('visible');
      } else {
        if (nodeEl) nodeEl.classList.remove('active');
        if (entryEl) entryEl.classList.remove('visible');
      }
    });
  }

  // Build curve and place nodes
  buildWindingCurveAndNodes();
  updateTimelineDrawing();

  // Scroll handler with requestAnimationFrame and passive listener
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateTimelineDrawing();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // Recompute curve and nodes on window resize (debounced)
  let timelineResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(timelineResizeTimer);
    timelineResizeTimer = setTimeout(() => {
      buildWindingCurveAndNodes();
      updateTimelineDrawing();
    }, 120);
  }, { passive: true });

  // IntersectionObserver for sliding entries in viewport
  if ('IntersectionObserver' in window && timelineEntryItems.length > 0) {
    const entryObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      rootMargin: '0px 0px -15% 0px',
      threshold: 0.1
    });

    timelineEntryItems.forEach(el => entryObserver.observe(el));
  }


  // ------------------------------------------------------------------
  // 5. CONTACT FORM CHARACTER COUNTERS & VALIDATION POPOVERS
  // ------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  // Fields and their constraints
  const formFields = [
    {
      input: document.getElementById('form-name'),
      counter: document.getElementById('counter-name'),
      popover: document.getElementById('popover-name'),
      max: 50,
      validate: (val) => val.trim().length > 0 ? null : "Please enter your name."
    },
    {
      input: document.getElementById('form-email'),
      counter: document.getElementById('counter-email'),
      popover: document.getElementById('popover-email'),
      max: 50,
      validate: (val) => {
        if (!val.trim()) return "Please enter your email address.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(val.trim()) ? null : "Please enter a valid email address.";
      }
    },
    {
      input: document.getElementById('form-subject'),
      counter: document.getElementById('counter-subject'),
      popover: document.getElementById('popover-subject'),
      max: 50,
      validate: (val) => val.trim().length > 0 ? null : "Please provide a subject."
    },
    {
      input: document.getElementById('form-message'),
      counter: document.getElementById('counter-message'),
      popover: document.getElementById('popover-message'),
      max: 500,
      validate: (val) => val.trim().length > 0 ? null : "Please enter your message."
    }
  ];

  // Helper functions for popover error messages
  const showPopover = (popover, input, msg) => {
    if (!popover) return;
    const msgSpan = popover.querySelector('.popover-msg');
    if (msgSpan) msgSpan.textContent = msg;
    popover.classList.add('visible');
    input.setAttribute('aria-invalid', 'true');
  };

  const hidePopover = (popover, input) => {
    if (!popover) return;
    popover.classList.remove('visible');
    if (input) input.setAttribute('aria-invalid', 'false');
  };

  // Wire events for each field
  formFields.forEach(({ input, counter, popover, max, validate }) => {
    if (!input) return;

    // Real-time character counter
    const updateCounter = () => {
      const len = input.value.length;
      if (counter) counter.textContent = `${len}/${max}`;
      if (len > max) {
        input.value = input.value.substring(0, max);
        if (counter) counter.textContent = `${max}/${max}`;
      }
    };

    input.addEventListener('input', () => {
      updateCounter();
      // Hide error once user begins typing
      hidePopover(popover, input);
    });

    input.addEventListener('blur', () => {
      const error = validate(input.value);
      if (error && input.value.length > 0) {
        showPopover(popover, input, error);
      } else {
        hidePopover(popover, input);
      }
    });

    // Popover close button
    if (popover) {
      const closeBtn = popover.querySelector('.popover-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          hidePopover(popover, input);
        });
      }
    }

    // Initial counter display
    updateCounter();
  });

  // Consent checkbox
  const consentCheckbox = document.getElementById('consent');


  // ------------------------------------------------------------------
  // 6. FORM SUBMISSION (FORMSPREE / PREVIEW MODE)
  // ------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset feedback
      if (formFeedback) {
        formFeedback.className = 'form-feedback';
        formFeedback.textContent = '';
      }

      // Validate all fields
      let firstInvalid = null;

      for (const field of formFields) {
        const error = field.validate(field.input.value);
        if (error) {
          showPopover(field.popover, field.input, error);
          if (!firstInvalid) firstInvalid = field.input;
        } else {
          hidePopover(field.popover, field.input);
        }
      }

      // Check consent
      if (consentCheckbox && !consentCheckbox.checked) {
        if (!firstInvalid) firstInvalid = consentCheckbox;
        alert("Please accept the Cookie & Privacy policy terms before submitting.");
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      // Set loading state
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      const formData = new FormData(contactForm);
      const actionUrl = contactForm.getAttribute('action') || '';

      // Check if endpoint is still the placeholder
      const isPlaceholder = actionUrl.includes('YOUR_FORM_ID');

      if (isPlaceholder) {
        // Simulated submission for development / preview mode
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
          }
          if (formFeedback) {
            formFeedback.classList.add('success');
            formFeedback.innerHTML = `<strong>Message recorded in preview mode!</strong><br>To receive live submissions, set your Formspree or Web3Forms endpoint in <code>content.js</code> or <code>index.html</code>.`;
          }
          contactForm.reset();
          formFields.forEach(f => {
            if (f.counter) f.counter.textContent = `0/${f.max}`;
          });
        }, 800);
        return;
      }

      // Real Formspree AJAX Submission
      try {
        const response = await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          if (formFeedback) {
            formFeedback.classList.add('success');
            formFeedback.textContent = "Thank you! Your message has been sent successfully. I'll get back to you soon.";
          }
          contactForm.reset();
          formFields.forEach(f => {
            if (f.counter) f.counter.textContent = `0/${f.max}`;
          });
        } else {
          const data = await response.json();
          const errorMsg = data?.errors?.map(err => err.message).join(', ') || "There was a problem submitting your form.";
          if (formFeedback) {
            formFeedback.classList.add('error');
            formFeedback.textContent = `Error: ${errorMsg}`;
          }
        }
      } catch (err) {
        if (formFeedback) {
          formFeedback.classList.add('error');
          formFeedback.textContent = "Network error. Please check your connection or contact me directly via LinkedIn.";
        }
      } finally {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
      }
    });
  }


  // ------------------------------------------------------------------
  // 7. ACCESSIBLE MODALS FOR IMPRINT, PRIVACY & COOKIE POLICIES
  // ------------------------------------------------------------------
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalTitle = document.getElementById('modal-title');
  const modalBodyContent = document.getElementById('modal-body-content');
  const modalCloseBtn = document.getElementById('modal-close');

  const modalContents = {
    'imprint-modal': {
      title: 'Imprint / Legal Notice',
      html: `
        <h4>Information in accordance with § 5 TMG / General Disclosure:</h4>
        <p><strong>Name:</strong> Suman S</p>
        <p><strong>Status:</strong> Student, B.E. Information Science and Engineering</p>
        <p><strong>Institution:</strong> Sri Sairam College of Engineering, Bengaluru, Karnataka, India</p>
        <p><strong>Contact Email:</strong> [TODO: my email - Configure in content.js]</p>
        <p><strong>Social Profiles:</strong></p>
        <ul>
          <li><a href="https://github.com/sumanssringeri94-create" target="_blank" rel="noopener noreferrer" style="color: var(--color-secondary);">GitHub: sumanssringeri94-create</a></li>
          <li><a href="https://www.linkedin.com/in/suman-s-777ssss777/" target="_blank" rel="noopener noreferrer" style="color: var(--color-secondary);">LinkedIn: suman-s-777ssss777</a></li>
        </ul>
        <h4>Disclaimer:</h4>
        <p>This website is a non-commercial personal portfolio created to present academic, engineering, and open-source projects.</p>
      `
    },
    'privacy-modal': {
      title: 'Privacy Policy',
      html: `
        <h4>1. Data Controller</h4>
        <p>Suman S (Bengaluru, India). For privacy-related queries, reach out through the contact form or LinkedIn.</p>
        <h4>2. Data Collection in the Contact Form</h4>
        <p>When you submit a message via the contact form, the details you provide (your name, email address, subject, and message text) are processed solely to respond to your inquiry.</p>
        <h4>3. Processing &amp; Storage</h4>
        <p>Form submissions are processed securely through Formspree (or your configured backend). No data is shared with third parties or used for marketing purposes.</p>
        <h4>4. Your Rights</h4>
        <p>You have the right to request information about your stored data, its origin, its recipient, and the purpose of its collection, as well as the right to demand its correction, blocking, or deletion.</p>
      `
    },
    'cookie-modal': {
      title: 'Cookie Policy',
      html: `
        <h4>What Cookies Are Used?</h4>
        <p>This personal portfolio does not use invasive tracking cookies, third-party advertising cookies, or analytics beacons.</p>
        <h4>Local Storage Usage:</h4>
        <p>We use your browser's <code>localStorage</code> solely to remember your chosen visual theme (Light Mode or Dark Mode) across sessions. This ensures a consistent reading experience and does not track you across other websites.</p>
        <h4>Managing Preferences:</h4>
        <p>You can clear your local storage and cookies at any time via your browser's privacy settings.</p>
      `
    }
  };

  const openModal = (modalKey) => {
    const data = modalContents[modalKey];
    if (!data || !modalBackdrop) return;

    modalTitle.textContent = data.title;
    modalBodyContent.innerHTML = data.html;
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Wire up trigger buttons
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalKey = trigger.getAttribute('data-modal');
      openModal(modalKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });


  // ------------------------------------------------------------------
  // 8. UPDATE CURRENT YEAR IN FOOTER
  // ------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  console.log("Suman S Portfolio initialized successfully.");
});
