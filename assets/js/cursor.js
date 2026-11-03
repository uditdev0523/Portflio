/**
 * Formula 1 Telemetry Custom Reticle Cursor
 * Interactive mouse tracker with subtle magnetic attraction & hover states
 */

export class TelemetryCursor {
  constructor() {
    this.cursorRing = document.querySelector(".telemetry-cursor-ring");
    this.cursorDot = document.querySelector(".telemetry-cursor-dot");
    
    // Check if mouse device exists and not touch-only
    this.hasMouse = window.matchMedia("(pointer: fine)").matches;
    if (!this.hasMouse || !this.cursorRing || !this.cursorDot) return;

    this.mouse = { x: -100, y: -100 };
    this.ringPos = { x: -100, y: -100 };
    this.targetPos = { x: -100, y: -100 };
    this.isHovering = false;
    this.isClicking = false;

    this.init();
  }

  init() {
    document.documentElement.classList.add("has-custom-cursor");

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.targetPos.x = e.clientX;
      this.targetPos.y = e.clientY;

      if (this.cursorDot) {
        this.cursorDot.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
      }
    }, { passive: true });

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
      const target = e.target.closest("a, button, .interactive-hover, .project-card, .telemetry-switch, input, textarea");
      if (target) {
        this.cursorRing.classList.add("cursor-hover");
        this.isHovering = true;
      }
    });

    document.addEventListener("mouseout", (e) => {
      const target = e.target.closest("a, button, .interactive-hover, .project-card, .telemetry-switch, input, textarea");
      if (target) {
        this.cursorRing.classList.remove("cursor-hover");
        this.isHovering = false;
      }
    });

    this.render();
  }

  render() {
    // Smooth spring/lerp interpolation for outer ring
    const ease = 0.18;
    this.ringPos.x += (this.targetPos.x - this.ringPos.x) * ease;
    this.ringPos.y += (this.targetPos.y - this.ringPos.y) * ease;

    if (this.cursorRing) {
      this.cursorRing.style.transform = `translate3d(${this.ringPos.x}px, ${this.ringPos.y}px, 0)`;
    }

    requestAnimationFrame(() => this.render());
  }
}
