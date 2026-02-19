// @ts-nocheck
// @ts-nocheck;

const COLORS = ["blue", "red", "white", "green", "orange", "yellow"];

class Rubix_CUBE {
  constructor(x, y, z, size, color = COLORS, strokeColor = [0, 0, 0, 140]) {
    this.pos = createVector(x, y, z);
    this.size = size;
    this.colors = color;
    this.stroke = strokeColor;
    this.rotations = createVector(90, 0, 0);

    this.createPoints();
    this.getParts();
  }

  rotate(x, y, z) {
    this.rotations.add(createVector(x, y, z));
  }

  handleRelease() {
    const delta = 90;
    while (
      Math.abs(this.rotations.x) >= delta || Math.abs(this.rotations.y) >= delta
    ) {
      if (Math.abs(this.rotations.x) >= delta) {
        const change = delta * Math.sign(this.rotations.x);
        this.rotations.x = this.rotations.x - change;
        this.parts.forEach((path) => path.rotate(change, "y", "z"));
      }
      if (Math.abs(this.rotations.y) >= delta) {
        const change = delta * Math.sign(this.rotations.y);
        this.rotations.y = this.rotations.y - change;
        this.parts.forEach((path) => path.rotate(change, "x", "z"));
      }
    }
    this.resetRotation();
  }

  resetRotation() {
    const delta = 50;
    if (Math.abs(this.rotations.x) >= delta) {
      const change = 90 * Math.sign(this.rotations.x);
      this.parts.forEach((path) => path.rotate(change, "y", "z"));
    }
    if (Math.abs(this.rotations.y) >= delta) {
      const change = 90 * Math.sign(this.rotations.y);
      this.parts.forEach((path) => path.rotate(change, "x", "z"));
    }

    this.rotations = createVector(0, 0, 0);
  }

  createPoints(delta = 0) {
    const size = this.size / 3;
    const points = [];
    const parts = [];
    for (let k = -1; k < 2; k++) {
      for (let j = -1; j < 2; j++) {
        for (let i = -1; i < 2; i++) {
          const x = k * size;
          const y = j * size;
          const z = i * size;
          const point = createVector(x, y, z);
          points.push(point);
          const actualSize = size - delta;
          const part = new Cube(
            x,
            y,
            z,
            actualSize,
            actualSize,
            actualSize,
            this.colors,
            this.stroke,
          );
          parts.push(part);
        }
      }
    }
    this.points = points;
    this.parts = parts;
  }

  getParts = () => {
    return this.parts.flatMap((part) => part.getFaces());
  };

  getFaces() {
    const faces = this.getParts();
    return faces.map(({ color, strokeColor, points }) => {
      const newPoints = points.map((point) => point.copy());
      newPoints.forEach((point) => point.add(this.pos));

      this.rotatePoints(
        newPoints,
        this.rotations.x,
        "y",
        "z",
        this.pos,
      );
      this.rotatePoints(
        newPoints,
        this.rotations.y,
        "x",
        "z",
        this.pos,
      );

      return { color, strokeColor, points: newPoints };
    });
  }

  rotatePoints(points, degree, a1 = "x", a2 = "y", reference) {
    points.forEach((point) => {
      const [v1, v2] = rotatePointAroundPoint(point, reference, degree, a1, a2);
      point[a1] = v1;
      point[a2] = v2;
    });
  }
}
