export default class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.targetX = 0;
    this.targetY = 0;

    this.strength = 25;

    this.onMouseMove = this.onMouseMove.bind(this);

    window.addEventListener("mousemove", this.onMouseMove);
  }

  onMouseMove(e) {
    this.targetX = (e.clientX / window.innerWidth - 0.5) * this.strength;

    this.targetY = (e.clientY / window.innerHeight - 0.5) * this.strength;
  }

  update(dt) {
    const speed = 4;

    this.x += (this.targetX - this.x) * speed * dt;

    this.y += (this.targetY - this.y) * speed * dt;
  }

  destroy() {
    window.removeEventListener("mousemove", this.onMouseMove);
  }
}
