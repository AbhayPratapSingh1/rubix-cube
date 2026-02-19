// @ts-nocheck
// @ts-nocheck;

const COLORS = ["blue", "red", "white", "green", "orange", "yellow"];

class Rubix_CUBE {
  constructor(x, y, z, size, color = COLORS, strokeColor = "black") {
    this.pos = createVector(x, y, z);
    this.size = size;
    this.colors = color;
    this.stroke = strokeColor;
    this.rotations = createVector(0, 0, 0);

    this.createPoints();
    this.getParts();
  }

  rotate(x, y, z) {
    this.rotations.add(createVector(x, y, z));
  }

  resetRotation() {
    this.rotations = createVector(0, 0, 0);
  }

  createPoints() {
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
          const part = new Cube(
            x,
            y,
            z,
            size,
            size,
            size,
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
        degrees(this.rotations.x),
        "y",
        "z",
        this.pos,
      );
      this.rotatePoints(
        newPoints,
        degrees(this.rotations.y),
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
