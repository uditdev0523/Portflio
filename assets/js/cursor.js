/**
 * Formula 1 Telemetry Custom Reticle Cursor
 * Robust pointer tracking with touch suppression, window boundaries & smooth spring lerp
 */

export class TelemetryCursor {
  constructor() {
    this.cursorRing = document.querySelector(".telemetry-cursor-ring");
    this.cursorDot = document.querySelector(".telemetry-cursor-dot");
    
    // Check if device supports fine pointer
    this.hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!this.hasFinePointer || !this.cursorRing || !this.cursorDot) return;

    this.mouse = { x: -200, y: -200 };
    this.ringPos = { x: -200, y: -200 };
    this.targetPos = { x: -200, y: -200 };
    this.isHovering = false;
    this.isClicking = false;
    this.isOffscreen = true;

    this.init();
  }

  init() {
    document.documentElement.classList.add("has-custom-cursor");

    // Hide cursor when touch is initiated
    window.addEventListener("touchstart", () => {
      this.hide();
    }, { passive: true });

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.targetPos.x = e.clientX;
      this.targetPos.y = e.clientY;

      if (this.isOffscreen) {
        this.isOffscreen = false;
        this.show();
      }

      if (this.cursorDot) {
        this.cursorDot.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
      }
    }, { passive: true });

    document.addEventListener("mouseleave", () => {
      this.isOffscreen = true;
      this.hide();
    });

    document.addEventListener("mouseenter", () => {
      this.isOffscreen = false;
      this.show();
    });

    window.addEventListener("mousedown", () => {
      this.isClicking = true;
      if (this.cursorRing) this.cursorRing.classList.add("cursor-clicking");
    });

    window.addEventListener("mouseup", () => {
      this.isClicking = false;
      if (this.cursorRing) this.cursorRing.classList.remove("cursor-clicking");
    });

    // Delegate hover listeners for interactive elements
    document.addEventListener("mouseover", (e) => {
      const target = e.target.closest("a, button, .project-card, input, select, textarea, .interactive-hover");
      if (target) {
        this.cursorRing.classList.add("cursor-hover");
        this.isHovering = true;
      }
    });

    document.addEventListener("mouseout", (e) => {
      const target = e.target.closest("a, button, .project-card, input, select, textarea, .interactive-hover");
      if (target) {
        this.cursorRing.classList.remove("cursor-hover");
        this.isHovering = false;
      }
    });

    this.render();
  }

  hide() {
    if (this.cursorRing) this.cursorRing.style.opacity = "0";
    if (this.cursorDot) this.cursorDot.style.opacity = "0";
  }

  show() {
    if (this.cursorRing) this.cursorRing.style.opacity = "1";
    if (this.cursorDot) this.cursorDot.style.opacity = "1";
  }

  render() {
    if (!this.isOffscreen) {
      const ease = 0.2;
      this.ringPos.x += (this.targetPos.x - this.ringPos.x) * ease;
      this.ringPos.y += (this.targetPos.y - this.ringPos.y) * ease;

      if (this.cursorRing) {
        this.cursorRing.style.transform = `translate3d(${this.ringPos.x}px, ${this.ringPos.y}px, 0)`;
      }
    }

    requestAnimationFrame(() => this.render());
  }
}
