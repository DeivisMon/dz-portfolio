import { useEffect, useRef, useState } from "react";
import { globalCursor } from "./CustomCursor";

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_radius;
uniform float u_opacity;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;

  vec2 p = uv;
  p.x *= aspect;
  vec2 m = u_mouse;
  m.x *= aspect;

  vec2 diff = p - m;
  float dist = length(diff);

  float disc = smoothstep(u_radius, u_radius * 0.94, dist);
  if (disc < 0.001) { discard; }

  vec2 dir = normalize(diff + 0.0001);
  float depth = 1.0 - smoothstep(0.0, u_radius, dist);

  float ripple = sin(dist * 26.0 - u_time * 2.2) * 0.5 + 0.5;
  float n = noise(p * 6.0 + u_time * 0.3);

  float fresnel = pow(depth, 2.5);

  vec3 rChan = vec3(1.0, 0.35, 0.35) * fresnel * 0.5;
  vec3 gChan = vec3(0.35, 1.0, 0.55) * fresnel * 0.35;
  vec3 bChan = vec3(0.35, 0.55, 1.0) * fresnel * 0.5;

  vec3 chromatic = mix(rChan, bChan, dot(dir, vec2(0.7, 0.7)) * 0.5 + 0.5) + gChan * 0.3;

  float rim = smoothstep(u_radius, u_radius * 0.75, dist) * smoothstep(u_radius * 0.55, u_radius * 0.75, dist);
  vec3 rimColor = vec3(1.0) * rim * 0.6;

  vec3 color = chromatic + rimColor;
  color += (n - 0.5) * 0.04 * fresnel;
  color += ripple * 0.03 * fresnel;

  float alpha = fresnel * 0.55 * disc * u_opacity;

  gl_FragColor = vec4(color * alpha, alpha);
}
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vsSource, fsSource) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

const lerp = (a, b, n) => (1 - n) * a + n * b;

export default function ShaderCursor({
  radius = 30,
  excludeSelector = ".cursor-no-distort",
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [suppressed, setSuppressed] = useState(false);
  const suppressedRef = useRef(false);

  useEffect(() => {
    suppressedRef.current = suppressed;
  }, [suppressed]);

  useEffect(() => {
    if (!excludeSelector) return;
    const handleOver = (e) => {
      if (e.target.closest(excludeSelector)) setSuppressed(true);
    };
    const handleOut = (e) => {
      const stillInside =
        e.relatedTarget && e.relatedTarget.closest?.(excludeSelector);
      if (e.target.closest(excludeSelector) && !stillInside) {
        setSuppressed(false);
      }
    };
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [excludeSelector]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
    });
    if (!gl) return;

    const program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const u_resolution = gl.getUniformLocation(program, "u_resolution");
    const u_mouse = gl.getUniformLocation(program, "u_mouse");
    const u_time = gl.getUniformLocation(program, "u_time");
    const u_radius = gl.getUniformLocation(program, "u_radius");
    const u_opacity = gl.getUniformLocation(program, "u_opacity");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const smoothed = { x: 0.5, y: 0.5 };
    const smoothedOpacity = { v: 0 };
    const start = performance.now();

    const render = (now) => {
      const time = (now - start) / 1000;

      if (globalCursor.ready) {
        const mx = globalCursor.x / window.innerWidth;
        const my = 1 - globalCursor.y / window.innerHeight;
        smoothed.x = lerp(smoothed.x, mx, 0.18);
        smoothed.y = lerp(smoothed.y, my, 0.18);
      }

      const targetOpacity = suppressedRef.current ? 0 : 1;
      smoothedOpacity.v = lerp(smoothedOpacity.v, targetOpacity, 0.15);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(u_resolution, canvas.width, canvas.height);
      gl.uniform2f(u_mouse, smoothed.x, smoothed.y);
      gl.uniform1f(u_time, time);
      gl.uniform1f(u_radius, radius / window.innerWidth);
      gl.uniform1f(u_opacity, smoothedOpacity.v);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [radius]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9996 }}
    />
  );
}
