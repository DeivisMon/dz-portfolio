const COLORS = [
  "#070707",
  "#0b0b0b",
  "#101010",
  "#171717",
  "#212121",
  "#292929",
];

export default class MeshPass {
  constructor() {
    this.light = {
      radius: 700,
      strength: 0.16,
    };
  }

  render(ctx, mesh, camera, time) {
    const lightX = window.innerWidth * (0.5 + Math.cos(time * 0.12) * 0.18);

    const lightY = window.innerHeight * (0.35 + Math.sin(time * 0.1) * 0.16);

    for (const tri of mesh.triangles) {
      const [a, b, c] = tri.points;

      const cx = tri.center.x;
      const cy = tri.center.y;

      const dx = lightX - cx;
      const dy = lightY - cy;

      const light = Math.max(0, 1 - Math.hypot(dx, dy) / this.light.radius);

      ctx.beginPath();

      ctx.moveTo(a.x + camera.x, a.y + camera.y);

      ctx.lineTo(b.x + camera.x, b.y + camera.y);

      ctx.lineTo(c.x + camera.x, c.y + camera.y);

      ctx.closePath();

      ctx.fillStyle =
        COLORS[Math.floor(tri.seed * COLORS.length) % COLORS.length];

      ctx.fill();

      ctx.fillStyle = `rgba(255,255,255,${
        tri.brightness + light * this.light.strength
      })`;

      ctx.fill();

      if (tri.glow) {
        ctx.strokeStyle = `rgba(255,255,255,${tri.edgeAlpha})`;

        ctx.lineWidth = 1;

        ctx.stroke();
      }
    }
  }
}
