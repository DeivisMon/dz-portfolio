import BackgroundPass from "./passes/BackgroundPass";
import MeshPass from "./passes/MeshPass";

export default class Renderer {
  constructor(canvas, camera, mesh) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.camera = camera;
    this.mesh = mesh;

    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.passes = [new BackgroundPass(), new MeshPass()];

    this.resize();
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;

    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;

    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  render(time) {
    for (const pass of this.passes) {
      pass.render(this.ctx, this.mesh, this.camera, time);
    }
  }
}
