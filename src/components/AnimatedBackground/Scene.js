import Clock from "./Clock";
import Camera from "./Camera";

import Mesh from "./Mesh";
import Renderer from "./Renderer";

export default class Scene {
  constructor(canvas) {
    this.canvas = canvas;

    this.clock = new Clock();

    this.camera = new Camera();

    this.mesh = new Mesh(window.innerWidth, window.innerHeight);

    this.renderer = new Renderer(canvas, this.camera, this.mesh);

    this.running = false;

    this.loop = this.loop.bind(this);
    this.resize = this.resize.bind(this);

    window.addEventListener("resize", this.resize);
  }

  start() {
    this.running = true;

    requestAnimationFrame(this.loop);
  }

  loop() {
    if (!this.running) return;

    this.clock.update();

    this.camera.update(this.clock.delta);

    this.mesh.update(this.clock.elapsed);

    this.renderer.render(this.clock.elapsed, this.mesh);

    requestAnimationFrame(this.loop);
  }

  resize() {
    this.mesh.resize(window.innerWidth, window.innerHeight);

    this.renderer.resize();
  }

  destroy() {
    this.running = false;

    this.camera.destroy();

    window.removeEventListener("resize", this.resize);
  }
}
