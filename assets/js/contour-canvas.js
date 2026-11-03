/**
 * Aerodynamic Topographic Contour Background
 * Synthesized smooth contour lines running on HTML5 Canvas with requestAnimationFrame
 */

export class ContourCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.time = 0;
    this.animId = null;
    this.isVisible = true;

    // Respect user's motion preferences
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize(), { passive: true });

    // Performance observer to pause when outside viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible && !this.animId && !this.reducedMotion) {
          this.loop();
        }
      });
    }, { threshold: 0.05 });

    observer.observe(this.canvas);

    if (!this.reducedMotion) {
      this.loop();
    } else {
      this.renderStatic();
    }
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    if (this.reducedMotion) {
      this.renderStatic();
    }
  }

  loop() {
    if (!this.isVisible || this.reducedMotion) {
      this.animId = null;
      return;
    }
    this.time += 0.004;
    this.render();
    this.animId = requestAnimationFrame(() => this.loop());
  }

  render() {
    const { ctx, width, height, time } = this;
    ctx.clearRect(0, 0, width, height);

    const linesCount = 14;
    const stepY = height / (linesCount * 0.7);

    ctx.lineWidth = 1.0;

    for (let i = 0; i < linesCount; i++) {
      const baseY = i * stepY - 50;
      const progress = i / linesCount;
      
      // Dynamic cyan opacity depending on depth
      const alpha = 0.04 + (Math.sin(i * 0.4 + time) * 0.02) + (progress * 0.06);
      ctx.strokeStyle = `rgba(2, 210, 227, ${alpha})`;

      ctx.beginPath();
      const points = 30;
      const stepX = width / points;

      for (let j = 0; j <= points + 1; j++) {
        const x = j * stepX;
        // Two harmonic sine waves combined for fluid aerodynamic flow
        const wave1 = Math.sin(j * 0.18 + time + i * 0.3) * 35;
        const wave2 = Math.cos(j * 0.1 - time * 0.7 + i * 0.2) * 20;
        const wave3 = Math.sin((x / width) * Math.PI) * 25; // center envelope
        
        const y = baseY + wave1 + wave2 + wave3;

        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    // Subtle technical measurement tick marks
    ctx.strokeStyle = "rgba(223, 229, 233, 0.05)";
    ctx.beginPath();
    for (let x = 60; x < width; x += 120) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    ctx.stroke();
  }

  renderStatic() {
    this.time = 1.5;
    this.render();
  }
}
