/**
 * Udit Pratap Singh — Engineering Portfolio Application
 * Core Orchestrator & Telemetry Interactions
 */

import { projectsData } from "./projects-data.js";
import { telemetryAudio } from "./telemetry-audio.js";
import { ContourCanvas } from "./contour-canvas.js";
import { TelemetryCursor } from "./cursor.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Canvas and Cursor
  new ContourCanvas("hero-contour-canvas");
  new TelemetryCursor();

  // 2. Setup System Telemetry Clock
  initTelemetryClock();

  // 3. Audio Toggle Hook
  initAudioControls();

  // 4. Preloader Boot Sequence
  initPreloader();

  // 5. Navigation & Mobile Drawer
  initNavigation();

  // 6. Project Render & Filter System
  initProjects();

  // 7. Modal System (Projects & Resume)
  initModals();

  // 8. Contact Form Telemetry Simulator
  initContactForm();

  // 9. Copy Actions & Quick Interactions
  initQuickActions();

  // 10. Verified Metric Counter Animation
  initStatCounters();
});

/* -------------------------------------------------------------
 * 1. Live Telemetry Clock (Noida / IST or Local)
 * ----------------------------------------------------------- */
function initTelemetryClock() {
  const clockEl = document.getElementById("telemetry-clock");
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clockEl.textContent = `${hours}:${minutes}:${seconds} IST`;
  }
  update();
  setInterval(update, 1000);
}

/* -------------------------------------------------------------
 * 2. Audio Design Controls
 * ----------------------------------------------------------- */
function initAudioControls() {
  const toggleBtn = document.getElementById("audio-toggle-btn");
  const waveIcon = document.getElementById("audio-waves-indicator");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const active = telemetryAudio.toggle();
    if (active) {
      toggleBtn.classList.add("audio-active");
      toggleBtn.setAttribute("aria-label", "Audio Enabled (Click to Mute)");
      if (waveIcon) waveIcon.textContent = "AUDIO: ON [ACTIVE]";
    } else {
      toggleBtn.classList.remove("audio-active");
      toggleBtn.setAttribute("aria-label", "Audio Muted (Click to Enable)");
      if (waveIcon) waveIcon.textContent = "AUDIO: MUTE";
    }
  });

  // Attach hover and click sound triggers across interactive elements
  document.querySelectorAll("a, button, .project-card, input, select, textarea").forEach(el => {
    el.addEventListener("mouseenter", () => telemetryAudio.playHover());
    el.addEventListener("click", () => telemetryAudio.playClick());
  });
}

/* -------------------------------------------------------------
 * 3. Preloader Veil & Boot Sequence
 * ----------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById("telemetry-preloader");
  const progressText = document.getElementById("loader-progress-text");
  const progressBar = document.getElementById("loader-progress-bar");
  const logFeed = document.getElementById("loader-log-feed");

  if (!preloader) return;

  const logs = [
    "CHECKING KERNEL INTEGRITY...",
    "MOUNTING TELEMETRY SENSORS [NOIDA_28.47N]...",
    "CALIBRATING NEURAL ARCHITECTURE REGISTRIES...",
    "SYNCING AKTU CSE BATCH 2025-2029 PARAMETERS...",
    "CONNECTING SATELLITE UPLINK: NOMINAL",
    "SYSTEM READY // ALL CHANNELS ACTIVE"
  ];

  let currentProgress = 0;
  let logIndex = 0;

  const interval = setInterval(() => {
    currentProgress += Math.floor(Math.random() * 8) + 4;
    if (currentProgress > 100) currentProgress = 100;

    if (progressText) progressText.textContent = `${currentProgress}%`;
    if (progressBar) progressBar.style.width = `${currentProgress}%`;

    const nextLogStep = Math.floor((currentProgress / 100) * logs.length);
    if (nextLogStep > logIndex && logIndex < logs.length) {
      if (logFeed) {
        const item = document.createElement("div");
        item.className = "loader-log-line";
        item.textContent = `> ${logs[logIndex]}`;
        logFeed.appendChild(item);
        logFeed.scrollTop = logFeed.scrollHeight;
      }
      logIndex++;
    }

    if (currentProgress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add("preloader-complete");
        document.body.classList.remove("is-loading");
        telemetryAudio.playPing();
      }, 350);
    }
  }, 40);
}

/* -------------------------------------------------------------
 * 4. Navigation & Mobile Drawer
 * ----------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector(".telemetry-header");
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const mobileDrawer = document.getElementById("mobile-nav-drawer");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  // Sticky header class toggle
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("header-scrolled");
    } else {
      header?.classList.remove("header-scrolled");
    }
  }, { passive: true });

  // Mobile menu toggle
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("drawer-open");
      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.classList.toggle("toggle-active", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close mobile drawer upon link click
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("drawer-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.classList.remove("toggle-active");
        document.body.style.overflow = "";
      });
    });
  }

  // Active section observer
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active-link", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => observer.observe(sec));
}

/* -------------------------------------------------------------
 * 5. Project Showcase & Category Filtering
 * ----------------------------------------------------------- */
function initProjects() {
  const grid = document.getElementById("projects-grid");
  const filterBtns = document.querySelectorAll(".project-filter-btn");

  if (!grid) return;

  function render(filter = "all") {
    grid.innerHTML = "";

    const filtered = filter === "all" 
      ? projectsData 
      : projectsData.filter(p => {
          if (filter === "ai") return p.category.includes("AI");
          if (filter === "systems") return p.category.includes("Systems") || p.category.includes("IoT") || p.category.includes("Database");
          if (filter === "frontend") return p.category.includes("Frontend");
          return true;
        });

    filtered.forEach((prj) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.setAttribute("data-project-id", prj.id);

      card.innerHTML = `
        <div class="project-card-header">
          <span class="project-code">${prj.code}</span>
          <span class="project-status-badge ${prj.statusBadge.includes('LIVE') ? 'badge-live' : 'badge-research'}">
            ${prj.statusBadge}
          </span>
        </div>

        <div class="project-media-wrap">
          <img src="${prj.image}" alt="${prj.title} telemetry preview" loading="lazy" class="project-media-img" />
          <div class="project-media-overlay">
            <button type="button" class="btn-inspect-telemetry" data-inspect="${prj.id}">
              <span class="bracket">[</span> INSPECT TELEMETRY <span class="bracket">]</span>
            </button>
          </div>
        </div>

        <div class="project-info">
          <div class="project-meta-row">
            <span class="project-category">${prj.category}</span>
            <span class="project-year">${prj.year}</span>
          </div>

          <h3 class="project-title">${prj.title}</h3>
          <p class="project-tagline">${prj.tagline}</p>

          <p class="project-desc">${prj.problem}</p>

          <div class="project-tags">
            ${prj.techStack.slice(0, 4).map(t => `<span class="tech-tag">${t.name}</span>`).join("")}
            ${prj.techStack.length > 4 ? `<span class="tech-tag tag-more">+${prj.techStack.length - 4}</span>` : ""}
          </div>

          <div class="project-actions-row">
            <button type="button" class="btn-project-detail" data-inspect="${prj.id}">
              TELEMETRY REPORT &rarr;
            </button>
            <div class="project-links-icons">
              ${prj.githubUrl ? `
                <a href="${prj.githubUrl}" target="_blank" rel="noopener noreferrer" class="link-icon" title="View GitHub Repository" aria-label="GitHub Repository">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
              ` : ""}
              ${prj.liveUrl ? `
                <a href="${prj.liveUrl}" target="_blank" rel="noopener noreferrer" class="link-icon link-live" title="View Live Production Demo" aria-label="Live Demo">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              ` : ""}
            </div>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    // Reattach inspection modal buttons
    grid.querySelectorAll("[data-inspect]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-inspect");
        openProjectModal(id);
      });
    });
  }

  render("all");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("filter-active"));
      btn.classList.add("filter-active");
      const filter = btn.getAttribute("data-filter");
      render(filter);
      telemetryAudio.playClick();
    });
  });
}

/* -------------------------------------------------------------
 * 6. Modal Systems (Project Inspector & Resume)
 * ----------------------------------------------------------- */
function initModals() {
  const modalBackdrop = document.getElementById("project-modal-backdrop");
  const modalContainer = document.getElementById("project-modal-container");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  const resumeModal = document.getElementById("resume-modal-backdrop");
  const resumeCloseBtn = document.getElementById("resume-modal-close-btn");
  const openResumeBtns = document.querySelectorAll(".btn-open-resume");

  function closeModal() {
    if (modalBackdrop) modalBackdrop.classList.remove("modal-active");
    if (resumeModal) resumeModal.classList.remove("modal-active");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (resumeCloseBtn) resumeCloseBtn.addEventListener("click", closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  openResumeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (resumeModal) {
        resumeModal.classList.add("modal-active");
        document.body.style.overflow = "hidden";
        telemetryAudio.playPing();
      }
    });
  });
}

function openProjectModal(projectId) {
  const prj = projectsData.find(p => p.id === projectId);
  if (!prj) return;

  const modalBackdrop = document.getElementById("project-modal-backdrop");
  const modalBody = document.getElementById("project-modal-content");
  if (!modalBackdrop || !modalBody) return;

  modalBody.innerHTML = `
    <div class="modal-telemetry-header">
      <div class="modal-code-tag">${prj.code}</div>
      <div class="modal-status-badge ${prj.statusBadge.includes('LIVE') ? 'badge-live' : 'badge-research'}">
        ${prj.statusBadge}
      </div>
    </div>

    <h2 class="modal-project-title">${prj.title}</h2>
    <p class="modal-project-tagline">${prj.tagline}</p>

    <div class="modal-image-stage">
      <img src="${prj.image}" alt="${prj.title} Telemetry Architecture" class="modal-feature-img" />
    </div>

    <!-- Telemetry Readouts Grid -->
    <div class="modal-telemetry-grid">
      ${Object.entries(prj.telemetryMetrics).map(([key, val]) => `
        <div class="telemetry-box">
          <div class="telemetry-label">${key}</div>
          <div class="telemetry-value">${val}</div>
        </div>
      `).join("")}
    </div>

    <div class="modal-section-block">
      <h4 class="modal-block-heading">// PROBLEM DIAGNOSIS</h4>
      <p class="modal-block-text">${prj.problem}</p>
    </div>

    <div class="modal-section-block">
      <h4 class="modal-block-heading">// ARCHITECTURAL SOLUTION</h4>
      <p class="modal-block-text">${prj.solution}</p>
    </div>

    <div class="modal-section-block">
      <h4 class="modal-block-heading">// CORE IMPLEMENTATION HIGHLIGHTS</h4>
      <ul class="modal-features-list">
        ${prj.keyFeatures.map(f => `<li><span class="bullet">&gt;</span> ${f}</li>`).join("")}
      </ul>
    </div>

    <div class="modal-section-block">
      <h4 class="modal-block-heading">// TECHNOLOGY MATRIX</h4>
      <div class="modal-tech-matrix">
        ${prj.techStack.map(t => `
          <div class="tech-matrix-item">
            <span class="tech-matrix-name">${t.name}</span>
            <span class="tech-matrix-role">${t.category}</span>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="modal-note-box">
      <span class="note-label">VERIFICATION NOTE:</span> ${prj.statusNote}
    </div>

    <div class="modal-action-bar">
      ${prj.githubUrl ? `
        <a href="${prj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary-telemetry">
          <span class="bracket">[</span> EXPLORE GITHUB REPOSITORY <span class="bracket">]</span>
        </a>
      ` : ""}
      ${prj.liveUrl ? `
        <a href="${prj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary-telemetry">
          <span class="bracket">[</span> LAUNCH LIVE DEMO <span class="bracket">]</span>
        </a>
      ` : ""}
    </div>
  `;

  modalBackdrop.classList.add("modal-active");
  document.body.style.overflow = "hidden";
  telemetryAudio.playPing();
}

/* -------------------------------------------------------------
 * 7. Contact Form Telemetry Simulator
 * ----------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("telemetry-contact-form");
  const statusBox = document.getElementById("form-transmission-status");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#sender-name")?.value.trim();
    const email = form.querySelector("#sender-email")?.value.trim();
    const subject = form.querySelector("#sender-subject")?.value.trim() || "Portfolio Transmission";
    const message = form.querySelector("#sender-message")?.value.trim();

    if (!name || !email || !message) {
      if (statusBox) {
        statusBox.className = "form-status status-error";
        statusBox.textContent = "[ERROR: TRANSMISSION INCOMPLETE — PLEASE FILL ALL REQUIRED FIELDS]";
      }
      return;
    }

    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (statusBox) {
        statusBox.className = "form-status status-error";
        statusBox.textContent = "[ERROR: INVALID TELEMETRY ADDRESS FORMAT]";
      }
      return;
    }

    if (statusBox) {
      statusBox.className = "form-status status-transmitting";
      statusBox.textContent = "[TRANSMITTING PACKETS VIA DIRECT UPLINK...]";
    }

    telemetryAudio.playBootChime();

    setTimeout(() => {
      // Create mailto link for direct transmission reliability
      const mailtoUrl = `mailto:uditdev0523@gmail.com?subject=${encodeURIComponent("[Uplink from Portfolio] " + subject)}&body=${encodeURIComponent("Sender Name: " + name + "\nSender Email: " + email + "\n\nMessage:\n" + message)}`;
      
      if (statusBox) {
        statusBox.className = "form-status status-success";
        statusBox.innerHTML = `
          <span>[TRANSMISSION COMPILED SUCCESSFULLY]</span>
          <br>
          <a href="${mailtoUrl}" class="direct-mail-link" style="color: #02D2E3; text-decoration: underline; margin-top: 6px; display: inline-block;">
            Click here to confirm dispatch via your local email client &rarr;
          </a>
        `;
      }

      form.reset();
    }, 800);
  });
}

/* -------------------------------------------------------------
 * 8. Quick Actions (Copy Email, Print Resume)
 * ----------------------------------------------------------- */
function initQuickActions() {
  const copyBtn = document.getElementById("copy-email-btn");
  const copyFeedback = document.getElementById("copy-email-feedback");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const email = "uditdev0523@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        telemetryAudio.playPing();
        if (copyFeedback) {
          copyFeedback.textContent = "[COPIED TO CLIPBOARD]";
          copyFeedback.style.opacity = "1";
          setTimeout(() => {
            copyFeedback.style.opacity = "0";
          }, 2400);
        }
      }).catch(() => {
        // Fallback
        prompt("Copy verified developer email:", email);
      });
    });
  }

  const printResumeBtn = document.getElementById("btn-print-resume");
  if (printResumeBtn) {
    printResumeBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

/* -------------------------------------------------------------
 * 9. Verified Statistics Counter Animation
 * ----------------------------------------------------------- */
function initStatCounters() {
  const statElements = document.querySelectorAll("[data-counter-target]");
  if (!statElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-counter-target"));
        const decimals = parseInt(el.getAttribute("data-counter-decimals") || "0", 10);
        const prefix = el.getAttribute("data-counter-prefix") || "";
        const suffix = el.getAttribute("data-counter-suffix") || "";

        let current = 0;
        const duration = 1200;
        const startTime = performance.now();

        function count(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          current = eased * target;

          el.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(count);
          } else {
            el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
          }
        }

        requestAnimationFrame(count);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statElements.forEach(el => observer.observe(el));
}
