(async () => {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var container = document.getElementById("aboutEye");
  if (!container || reduceMotion) return;

  var ogl;
  try {
    ogl = await import("https://esm.sh/ogl@0.0.73");
  } catch (err) {
    return;
  }
  var Renderer = ogl.Renderer, Program = ogl.Program, Mesh = ogl.Mesh, Triangle = ogl.Triangle, Texture = ogl.Texture;

  var config = {
    eyeColor: "#3aa8ff",
    intensity: 1.3,
    pupilSize: 0.5,
    irisWidth: 0.3,
    glowIntensity: 0.28,
    scale: 1.55,
    noiseScale: 1.0,
    pupilFollow: 0.55,
    flameSpeed: 0.75,
    backgroundColor: "#070c13",
    lightMode: false
  };

  function hexToVec3(hex){
    var h = hex.replace("#", "");
    return [parseInt(h.slice(0,2),16)/255, parseInt(h.slice(2,4),16)/255, parseInt(h.slice(4,6),16)/255];
  }

  function generateNoiseTexture(size){
    size = size || 256;
    var data = new Uint8Array(size * size * 4);

    function hash(x, y, s){
      var n = x * 374761393 + y * 668265263 + s * 1274126177;
      n = Math.imul(n ^ (n >>> 13), 1274126177);
      return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
    }

    function noise(px, py, freq, seed){
      var fx = (px / size) * freq;
      var fy = (py / size) * freq;
      var ix = Math.floor(fx), iy = Math.floor(fy);
      var tx = fx - ix, ty = fy - iy;
      var w = freq | 0;
      var v00 = hash(((ix % w) + w) % w, ((iy % w) + w) % w, seed);
      var v10 = hash((((ix+1) % w) + w) % w, ((iy % w) + w) % w, seed);
      var v01 = hash(((ix % w) + w) % w, (((iy+1) % w) + w) % w, seed);
      var v11 = hash((((ix+1) % w) + w) % w, (((iy+1) % w) + w) % w, seed);
      return v00*(1-tx)*(1-ty) + v10*tx*(1-ty) + v01*(1-tx)*ty + v11*tx*ty;
    }

    for (var y = 0; y < size; y++){
      for (var x = 0; x < size; x++){
        var v = 0, amp = 0.4, totalAmp = 0;
        for (var o = 0; o < 8; o++){
          var f = 32 * (1 << o);
          v += amp * noise(x, y, f, o * 31);
          totalAmp += amp;
          amp *= 0.65;
        }
        v /= totalAmp;
        v = (v - 0.5) * 2.2 + 0.5;
        v = Math.max(0, Math.min(1, v));
        var val = Math.round(v * 255);
        var i = (y * size + x) * 4;
        data[i] = val; data[i+1] = val; data[i+2] = val; data[i+3] = 255;
      }
    }
    return data;
  }

  var vertexShader = [
    "attribute vec2 uv;",
    "attribute vec2 position;",
    "varying vec2 vUv;",
    "void main() {",
    "  vUv = uv;",
    "  gl_Position = vec4(position, 0.0, 1.0);",
    "}"
  ].join("\n");

  var fragmentShader = [
    "precision highp float;",
    "uniform float uTime;",
    "uniform vec3 uResolution;",
    "uniform sampler2D uNoiseTexture;",
    "uniform float uPupilSize;",
    "uniform float uIrisWidth;",
    "uniform float uGlowIntensity;",
    "uniform float uIntensity;",
    "uniform float uScale;",
    "uniform float uNoiseScale;",
    "uniform vec2 uMouse;",
    "uniform float uPupilFollow;",
    "uniform float uFlameSpeed;",
    "uniform vec3 uEyeColor;",
    "uniform vec3 uBgColor;",
    "uniform bool uLightMode;",
    "void main() {",
    "  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y;",
    "  uv /= uScale;",
    "  float ft = uTime * uFlameSpeed;",
    "  float polarRadius = length(uv) * 2.0;",
    "  float polarAngle = (2.0 * atan(uv.x, uv.y)) / 6.28 * 0.3;",
    "  vec2 polarUv = vec2(polarRadius, polarAngle);",
    "  vec4 noiseA = texture2D(uNoiseTexture, polarUv * vec2(0.2, 7.0) * uNoiseScale + vec2(-ft * 0.1, 0.0));",
    "  vec4 noiseB = texture2D(uNoiseTexture, polarUv * vec2(0.3, 4.0) * uNoiseScale + vec2(-ft * 0.2, 0.0));",
    "  vec4 noiseC = texture2D(uNoiseTexture, polarUv * vec2(0.1, 5.0) * uNoiseScale + vec2(-ft * 0.1, 0.0));",
    "  float distanceMask = 1.0 - length(uv);",
    "  float innerRing = clamp(-1.0 * ((distanceMask - 0.7) / uIrisWidth), 0.0, 1.0);",
    "  innerRing = (innerRing * distanceMask - 0.2) / 0.28;",
    "  innerRing += noiseA.r - 0.5;",
    "  innerRing *= 1.3;",
    "  innerRing = clamp(innerRing, 0.0, 1.0);",
    "  float outerRing = clamp(-1.0 * ((distanceMask - 0.5) / 0.2), 0.0, 1.0);",
    "  outerRing = (outerRing * distanceMask - 0.1) / 0.38;",
    "  outerRing += noiseC.r - 0.5;",
    "  outerRing *= 1.3;",
    "  outerRing = clamp(outerRing, 0.0, 1.0);",
    "  innerRing += outerRing;",
    "  float innerEye = distanceMask - 0.1 * 2.0;",
    "  innerEye *= noiseB.r * 2.0;",
    "  vec2 pupilOffset = uMouse * uPupilFollow * 0.12;",
    "  vec2 pupilUv = uv - pupilOffset;",
    "  float pupil = 1.0 - length(pupilUv * vec2(9.0, 2.3));",
    "  pupil *= uPupilSize;",
    "  pupil = clamp(pupil, 0.0, 1.0);",
    "  pupil /= 0.35;",
    "  float outerEyeGlow = 1.0 - length(uv * vec2(0.5, 1.5));",
    "  outerEyeGlow = clamp(outerEyeGlow + 0.5, 0.0, 1.0);",
    "  outerEyeGlow += noiseC.r - 0.5;",
    "  float outerBgGlow = outerEyeGlow;",
    "  outerEyeGlow = pow(outerEyeGlow, 2.0);",
    "  outerEyeGlow += distanceMask;",
    "  outerEyeGlow *= uGlowIntensity;",
    "  outerEyeGlow = clamp(outerEyeGlow, 0.0, 1.0);",
    "  outerEyeGlow *= pow(1.0 - distanceMask, 2.0) * 2.5;",
    "  outerBgGlow += distanceMask;",
    "  outerBgGlow = pow(outerBgGlow, 0.5);",
    "  outerBgGlow *= 0.15;",
    "  vec3 eyeEnergy = uEyeColor * uIntensity * clamp(max(innerRing + innerEye, outerEyeGlow + outerBgGlow) - pupil, 0.0, 3.0);",
    "  vec3 color;",
    "  if (uLightMode) {",
    "    vec3 mapped = vec3(1.0) - exp(-max(eyeEnergy, vec3(0.0)) * 1.3);",
    "    float energy = clamp(max(mapped.r, max(mapped.g, mapped.b)), 0.0, 1.0);",
    "    vec3 hue = mapped / max(energy, 0.0001);",
    "    hue = pow(clamp(hue, 0.0, 1.0), vec3(1.2));",
    "    color = mix(uBgColor, hue, smoothstep(0.02, 0.82, energy) * 0.96);",
    "  } else {",
    "    color = eyeEnergy + uBgColor;",
    "  }",
    "  gl_FragColor = vec4(color, 1.0);",
    "}"
  ].join("\n");

  var renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
  var gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);

  var noiseData = generateNoiseTexture(256);
  var noiseTexture = new Texture(gl, { image: noiseData, width: 256, height: 256, generateMipmaps: false, flipY: false });
  noiseTexture.minFilter = gl.LINEAR;
  noiseTexture.magFilter = gl.LINEAR;
  noiseTexture.wrapS = gl.REPEAT;
  noiseTexture.wrapT = gl.REPEAT;

  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  function updatePointer(x, y){
    var rect = container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    mouse.tx = ((x - rect.left) / rect.width) * 2 - 1;
    mouse.ty = -(((y - rect.top) / rect.height) * 2 - 1);
  }

  container.addEventListener("mousemove", function(e){ updatePointer(e.clientX, e.clientY); });
  container.addEventListener("mouseleave", function(){ mouse.tx = 0; mouse.ty = 0; });
  container.addEventListener("touchmove", function(e){
    if (!e.touches.length) return;
    updatePointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  container.addEventListener("touchend", function(){ mouse.tx = 0; mouse.ty = 0; }, { passive: true });

  var geometry = new Triangle(gl);
  var program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: [1, 1, 1] },
      uNoiseTexture: { value: noiseTexture },
      uPupilSize: { value: config.pupilSize },
      uIrisWidth: { value: config.irisWidth },
      uGlowIntensity: { value: config.glowIntensity },
      uIntensity: { value: config.intensity },
      uScale: { value: config.scale },
      uNoiseScale: { value: config.noiseScale },
      uMouse: { value: [0, 0] },
      uPupilFollow: { value: config.pupilFollow },
      uFlameSpeed: { value: config.flameSpeed },
      uEyeColor: { value: hexToVec3(config.eyeColor) },
      uBgColor: { value: hexToVec3(config.backgroundColor) },
      uLightMode: { value: config.lightMode }
    }
  });
  var mesh = new Mesh(gl, { geometry: geometry, program: program });

  container.appendChild(gl.canvas);

  function resize(){
    var width = Math.max(1, container.clientWidth);
    var height = Math.max(1, container.clientHeight);
    renderer.setSize(width, height);
    program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height];
  }

  window.addEventListener("resize", resize);
  window.addEventListener("orientationchange", resize);
  resize();

  var ro = new ResizeObserver(resize);
  ro.observe(container);

  var paused = false;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){ paused = !entry.isIntersecting; });
  }, { threshold: 0.01 });
  io.observe(container);

  function animate(time){
    requestAnimationFrame(animate);
    if (paused) return;
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    program.uniforms.uMouse.value = [mouse.x, mouse.y];
    program.uniforms.uTime.value = time * 0.001;
    renderer.render({ scene: mesh });
  }
  requestAnimationFrame(animate);
})();
