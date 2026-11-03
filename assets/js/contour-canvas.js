/**
 * Aerodynamic Topographic Contour Background
 * Synthesized smooth contour lines running on HTML5 Canvas with requestAnimationFrame
 * Optimized for variable refresh rates (60Hz / 120Hz / 144Hz) using delta-time
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
    this.lastFrameTime = performance.now();
    this.animId = null;
    this.isVisible = true;

    // Respect user's motion preferences
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.init();
  }

  init() {
    this.resize();
    
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.resize(), 100);
    }, { passive: true });

    // IntersectionObserver to pause loop when outside viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible && !this.animId && !this.reducedMotion) {
          this.lastFrameTime = performance.now();
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
    const parent = this.canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    this.width = Math.max(rect.width, 320);
    this.height = Math.max(rect.height, 480);

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
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

    const now = performance.now();
    const delta = Math.min((now - this.lastFrameTime) / 1000, 0.1); // clamp to avoid jump
    this.lastFrameTime = now;

    // Advance time at constant real-time rate (0.25 rad / sec)
    this.time += delta * 0.28;

    this.render();
    this.animId = requestAnimationFrame(() => this.loop());
  }

  render() {
    const { ctx, width, height, time } = this;
    if (!ctx || width <= 0 || height <= 0) return;

    ctx.clearRect(0, 0, width, height);

    const linesCount = 14;
    const stepY = height / (linesCount * 0.72);

    ctx.lineWidth = 1.0;

    for (let i = 0; i < linesCount; i++) {
      const baseY = i * stepY - 40;
      const progress = i / linesCount;
      
      // Dynamic cyan opacity depending on altitude depth
      const alpha = 0.04 + (Math.sin(i * 0.45 + time) * 0.02) + (progress * 0.05);
      ctx.strokeStyle = `rgba(2, 210, 227, ${Math.max(0.02, alpha.toFixed(3))})`;

      ctx.beginPath();
      const points = 32;
      const stepX = width / points;

      for (let j = 0; j <= points + 1; j++) {
        const x = j * stepX;
        // Two harmonic aerodynamic waves
        const wave1 = Math.sin(j * 0.18 + time + i * 0.32) * 32;
        const wave2 = Math.cos(j * 0.11 - time * 0.65 + i * 0.22) * 18;
        const wave3 = Math.sin((x / width) * Math.PI) * 22;
        
        const y = baseY + wave1 + wave2 + wave3;

        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    // Subtle technical measurement grid lines
    ctx.strokeStyle = "rgba(223, 229, 233, 0.04)";
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
