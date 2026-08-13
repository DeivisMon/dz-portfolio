function parsePath(path) {
  const nums = path.match(/-?\d*\.?\d+/g).map(Number);
  const points = [];
  for (let i = 0; i < nums.length; i += 2) points.push([nums[i], nums[i + 1]]);

  const segments = [];
  let start = points[0];
  for (let i = 1; i < points.length; i += 3) {
    segments.push([start, points[i], points[i + 1], points[i + 2]]);
    start = points[i + 2];
  }
  return segments;
}

const bez = (t, [a, b, c, d]) =>
  (1 - t) ** 3 * a +
  3 * (1 - t) ** 2 * t * b +
  3 * (1 - t) * t ** 2 * c +
  t ** 3 * d;

function gsapEaseToFn(path, resolution = 200) {
  const segments = parsePath(path);
  const lut = [];
  for (const [p0, p1, p2, p3] of segments) {
    for (let i = 0; i <= resolution; i++) {
      const t = i / resolution;
      lut.push([
        bez(t, [p0[0], p1[0], p2[0], p3[0]]),
        bez(t, [p0[1], p1[1], p2[1], p3[1]]),
      ]);
    }
  }
  lut.sort((a, b) => a[0] - b[0]);

  return (x) => {
    if (x <= 0) return lut[0][1];
    if (x >= 1) return lut[lut.length - 1][1];
    let lo = 0,
      hi = lut.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (lut[mid][0] < x) lo = mid + 1;
      else hi = mid;
    }
    const p1 = lut[Math.max(lo - 1, 0)],
      p2 = lut[lo];
    const ratio = p2[0] === p1[0] ? 0 : (x - p1[0]) / (p2[0] - p1[0]);
    return p1[1] + ratio * (p2[1] - p1[1]);
  };
}

export const customEases = {
  pageTransition: gsapEaseToFn(
    "M0,0 C0.38,0.05 0.48,0.58 0.65,0.82 0.82,1 1,1 1,1",
  ),
  pageTransition2: gsapEaseToFn(
    "M0,0 C0.178,0.031 0.279,0.802 0.345,0.856 0.421,0.918 0.374,1 1,1",
  ),
};
