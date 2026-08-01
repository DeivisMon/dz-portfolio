export default class BackgroundPass {
  render(ctx) {
    const g = ctx.createLinearGradient(0, 0, 0, window.innerHeight);

    g.addColorStop(0, "#1d1d1d");
    g.addColorStop(1, "#050505");

    ctx.fillStyle = g;

    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }
}
