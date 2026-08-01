export default class Mesh {
  constructor(width, height, options = {}) {
    this.options = {
      spacing: options.spacing ?? 120,
      jitter: options.jitter ?? 42,
      amplitude: options.amplitude ?? 2.5,
      speed: options.speed ?? 0.35,
    };

    this.resize(width, height);
  }

  resize(width, height) {
    this.width = width;
    this.height = height;

    this.points = [];
    this.triangles = [];

    this.generatePoints();
    this.generateTriangles();
  }

  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  generatePoints() {
    const { spacing, jitter, amplitude, speed } = this.options;

    const cols = Math.ceil(this.width / spacing) + 3;
    const rows = Math.ceil(this.height / spacing) + 3;

    for (let row = 0; row < rows; row++) {
      this.points[row] = [];

      const offsetX = row % 2 === 0 ? 0 : spacing * 0.5;

      for (let col = 0; col < cols; col++) {
        const x = col * spacing + offsetX + this.random(-jitter, jitter);

        const y = row * spacing + this.random(-jitter, jitter);

        this.points[row][col] = {
          baseX: x,
          baseY: y,

          x,
          y,

          phase: Math.random() * Math.PI * 2,

          amplitude: amplitude * this.random(0.5, 1.5),

          speed: speed * this.random(0.6, 1.4),
        };
      }
    }
  }

  generateTriangles() {
    const rows = this.points.length;
    const cols = this.points[0].length;

    for (let y = 0; y < rows - 1; y++) {
      for (let x = 0; x < cols - 1; x++) {
        const p1 = this.points[y][x];
        const p2 = this.points[y][x + 1];
        const p3 = this.points[y + 1][x];
        const p4 = this.points[y + 1][x + 1];

        const flip = Math.random() > 0.5;

        if (flip) {
          this.createTriangle(p1, p2, p4);
          this.createTriangle(p1, p4, p3);
        } else {
          this.createTriangle(p1, p2, p3);
          this.createTriangle(p2, p4, p3);
        }
      }
    }
  }

  createTriangle(a, b, c) {
    this.triangles.push({
      points: [a, b, c],

      center: { x: 0, y: 0 },

      normal: {
        x: this.random(-1, 1),
        y: this.random(-1, 1),
        z: this.random(0.6, 1),
      },

      brightness: this.random(0.02, 0.08),

      edgeAlpha: this.random(0.03, 0.12),

      glow: Math.random() > 0.7,

      seed: Math.random() * Math.PI * 2,
    });
  }

  update(time) {
    for (const row of this.points) {
      for (const p of row) {
        p.x = p.baseX + Math.cos(time * p.speed + p.phase) * p.amplitude;

        p.y = p.baseY + Math.sin(time * p.speed + p.phase) * p.amplitude;
      }
    }

    for (const tri of this.triangles) {
      const [a, b, c] = tri.points;

      tri.center.x = (a.x + b.x + c.x) / 3;
      tri.center.y = (a.y + b.y + c.y) / 3;
    }
  }
}
