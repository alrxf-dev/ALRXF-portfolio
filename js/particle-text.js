class ParticleText {
  constructor(container, options = {}) {
    this.container = container;
    this.canvas = container.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.options = {
      text: "Alif Rezky",
      particleSize: 2,
      density: 4,
      color: "#ffffff",
      highlightColor: "#4f9dff",
      scatter: 170,
      gatherDuration: 1500,
      stagger: 380,
      pointerRepel: 34,
      repelRadius: 110,
      idleDrift: 0.6,
      fontSize: "clamp(2.4rem, 7.5vw, 5rem)",
      fontWeight: 800,
      fontFamily: "Manrope, Arial, sans-serif",
      glow: true,
      ...options
    };

    this.particles = [];
    this.width = 0;
    this.height = 0;
    this.dpr = 1;

    this.pointer = { active: false, x: 0, y: 0, smoothX: 0, smoothY: 0 };
    this.gathering = false;
    this.gatherStart = 0;

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.init();
  }

  clamp(value, min, max) { return Math.min(Math.max(value, min), max); }
  easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  hexToRgb(hex) {
    const clean = hex.replace("#", "").trim();
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
    return { r: parseInt(clean.slice(0, 2), 16), g: parseInt(clean.slice(2, 4), 16), b: parseInt(clean.slice(4, 6), 16) };
  }
  mixRgb(a, b, amount) {
    return { r: Math.round(a.r + (b.r - a.r) * amount), g: Math.round(a.g + (b.g - a.g) * amount), b: Math.round(a.b + (b.b - a.b) * amount) };
  }
  rgbToCss(rgb) { return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`; }

  resolveFontSize(value) {
    if (typeof value === "number") return value;
    const probe = document.createElement("span");
    probe.textContent = "M";
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.pointerEvents = "none";
    probe.style.fontSize = value;
    probe.style.fontWeight = String(this.options.fontWeight);
    probe.style.fontFamily = this.options.fontFamily;
    this.container.appendChild(probe);
    const size = parseFloat(getComputedStyle(probe).fontSize) || 96;
    probe.remove();
    return size;
  }

  async waitForFonts(font) {
    if (!document.fonts) return;
    try { await document.fonts.load(font); } catch {}
    await document.fonts.ready;
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    this.width = Math.floor(rect.width);
    this.height = Math.floor(rect.height);
    if (!this.width || !this.height) return;

    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.buildParticles();
  }

  async buildParticles() {
    const width = this.width, height = this.height;
    if (!width || !height) return;

    const fontSize = this.resolveFontSize(this.options.fontSize);
    const font = `${this.options.fontWeight} ${fontSize}px ${this.options.fontFamily}`;
    await this.waitForFonts(font);

    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
    const text = String(this.options.text || " ");
    const maxTextWidth = width * 0.92;

    offCtx.font = font;
    let metrics = offCtx.measureText(text);
    let resolvedSize = fontSize;

    if (metrics.width > maxTextWidth) {
      resolvedSize = Math.max(18, resolvedSize * (maxTextWidth / metrics.width));
      offCtx.font = `${this.options.fontWeight} ${resolvedSize}px ${this.options.fontFamily}`;
      metrics = offCtx.measureText(text);
    }

    const left = Math.ceil(metrics.actualBoundingBoxLeft || 0);
    const right = Math.ceil(metrics.actualBoundingBoxRight || metrics.width);
    const ascent = Math.ceil(metrics.actualBoundingBoxAscent || resolvedSize * 0.78);
    const descent = Math.ceil(metrics.actualBoundingBoxDescent || resolvedSize * 0.22);
    const padding = Math.max(12, Math.ceil(resolvedSize * 0.08));
    const textWidth = Math.max(1, left + right);
    const textHeight = Math.max(1, ascent + descent);

    offscreen.width = textWidth + padding * 2;
    offscreen.height = textHeight + padding * 2;
    offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
    offCtx.font = `${this.options.fontWeight} ${resolvedSize}px ${this.options.fontFamily}`;
    offCtx.textAlign = "left";
    offCtx.textBaseline = "alphabetic";
    offCtx.fillStyle = "#fff";
    offCtx.fillText(text, padding - left, padding + ascent);

    const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
    const targets = [];
    const step = Math.max(2, Math.floor(this.options.density));

    for (let y = 0; y < offscreen.height; y += step) {
      for (let x = 0; x < offscreen.width; x += step) {
        const alpha = imageData.data[(y * offscreen.width + x) * 4 + 3];
        if (alpha > 40) {
          targets.push({
            x: width / 2 - offscreen.width / 2 + x,
            y: height / 2 - offscreen.height / 2 + y,
            alpha: alpha / 255
          });
        }
      }
    }

    const maxParticles = Math.max(900, Math.min(5200, Math.floor((width * height) / 90)));
    const stride = Math.max(1, Math.ceil(targets.length / maxParticles));
    const baseRgb = this.hexToRgb(this.options.color);
    const highlightRgb = this.hexToRgb(this.options.highlightColor);
    const selected = targets.filter((_, index) => index % stride === 0);

    this.particles = selected.map((target, index) => {
      const seed = ((index * 9301 + 49297) % 233280) / 233280;
      const depth = 0.45 + (((index * 233 + 97) % 1000) / 1000) * 0.9;
      const blend = baseRgb && highlightRgb ? this.clamp(target.x / Math.max(1, width) + (seed - 0.5) * 0.35, 0, 1) : 0;
      const particleColor = baseRgb && highlightRgb ? this.rgbToCss(this.mixRgb(baseRgb, highlightRgb, blend)) : this.options.color;
      const angle = seed * Math.PI * 2;
      const distance = this.options.scatter * (0.35 + depth * 0.75);
      const startX = target.x + Math.cos(angle) * distance + (seed - 0.5) * this.options.scatter * 0.45;
      const startY = target.y + Math.sin(angle) * distance + (depth - 0.9) * this.options.scatter * 0.45;

      return {
        x: startX, y: startY, startX, startY,
        targetX: target.x, targetY: target.y,
        size: Math.max(0.6, this.options.particleSize * (0.75 + target.alpha * 0.45)),
        color: particleColor, seed, depth,
        delay: seed * this.options.stagger
      };
    });

    this.pointer.x = width / 2;
    this.pointer.y = height / 2;
    this.pointer.smoothX = this.pointer.x;
    this.pointer.smoothY = this.pointer.y;
    this.startGather();
  }

  startGather() {
    if (!this.particles.length) return;
    const now = performance.now();
    this.particles.forEach(p => {
      p.startX = p.x; p.startY = p.y;
      p.delay = p.seed * this.options.stagger;
    });
    this.gatherStart = now;
    this.gathering = true;
  }

  drawParticle(particle) {
    const ctx = this.ctx, size = particle.size;
    ctx.fillStyle = particle.color;
    if (size <= 2.1) {
      ctx.fillRect(particle.x - size / 2, particle.y - size / 2, size, size);
      return;
    }
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  render(now) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    if (this.options.glow) {
      ctx.shadowBlur = this.options.particleSize * 3;
      ctx.shadowColor = this.options.highlightColor;
    } else {
      ctx.shadowBlur = 0;
    }

    this.pointer.smoothX += (this.pointer.x - this.pointer.smoothX) * 0.18;
    this.pointer.smoothY += (this.pointer.y - this.pointer.smoothY) * 0.18;

    let complete = true;

    this.particles.forEach(particle => {
      let baseX = particle.targetX, baseY = particle.targetY, progress = 1;

      if (this.gathering) {
        const local = (now - this.gatherStart - particle.delay) / Math.max(1, this.options.gatherDuration);
        progress = this.clamp(local, 0, 1);
        const eased = this.easeOutCubic(progress);
        baseX = particle.startX + (particle.targetX - particle.startX) * eased;
        baseY = particle.startY + (particle.targetY - particle.startY) * eased;
        if (progress < 1) complete = false;
      } else {
        const driftTime = now * 0.001;
        baseX += Math.sin(driftTime * 0.9 + particle.seed * 10) * this.options.idleDrift * particle.depth;
        baseY += Math.cos(driftTime * 0.75 + particle.depth * 10) * this.options.idleDrift * particle.depth;
      }

      if (this.pointer.active && this.options.pointerRepel > 0) {
        const dx = baseX - this.pointer.smoothX, dy = baseY - this.pointer.smoothY;
        const distance = Math.hypot(dx, dy);
        if (distance > 0 && distance < this.options.repelRadius) {
          const force = Math.pow(1 - distance / this.options.repelRadius, 2) * this.options.pointerRepel;
          baseX += (dx / distance) * force;
          baseY += (dy / distance) * force;
        }
      }

      const follow = 0.22;
      particle.x += (baseX - particle.x) * follow;
      particle.y += (baseY - particle.y) * follow;

      ctx.globalAlpha = this.clamp(0.35 + progress * 0.65, 0, 1);
      this.drawParticle(particle);
    });

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    if (this.gathering && complete) this.gathering = false;
    this._raf = requestAnimationFrame(time => this.render(time));
  }

  pointerMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = event.clientX - rect.left;
    this.pointer.y = event.clientY - rect.top;
    this.pointer.active = true;
  }
  pointerLeave() { this.pointer.active = false; }

  init() {
    this.resizeObserver.observe(this.container);
    this.canvas.addEventListener("pointermove", e => this.pointerMove(e));
    this.canvas.addEventListener("pointerleave", () => this.pointerLeave());
    this.canvas.addEventListener("pointerenter", e => { this.pointerMove(e); this.startGather(); });
    window.addEventListener("resize", () => this.resize());
    this.resize();
    this._raf = requestAnimationFrame(time => this.render(time));
  }
}
