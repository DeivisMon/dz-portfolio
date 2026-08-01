export default class Clock {
  constructor() {
    this.startTime = performance.now();
    this.lastTime = this.startTime;

    this.elapsed = 0;
    this.delta = 0;
  }

  update() {
    const now = performance.now();

    this.delta = (now - this.lastTime) / 1000;
    this.elapsed = (now - this.startTime) / 1000;

    this.lastTime = now;
  }
}
