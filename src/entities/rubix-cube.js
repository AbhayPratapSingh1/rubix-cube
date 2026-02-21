// @ts-nocheck
// @ts-nocheck;
const COLORS = ["blue", "red", "white", "green", "orange", "yellow"];

class Rubix_CUBE {
  constructor(x, y, z, size, color = COLORS, strokeColor = [0, 0, 0, 140]) {
    this.pos = createVector(x, y, z);
    this.isUpdating = false;
    this.size = size;
    this.colors = color;
    this.stroke = strokeColor;
    this.rotations = createVector(0, 0, 0);

    this.createPoints();
    this.getParts();
    this.updateAngle = 0;

    this.updateConfig = null;
  }

  update() {
    if (!this.isUpdating) {
      return;
    }
    if (this.updateConfig.angle === 0) {
      this.isUpdating = false;

      return;
    }
    const { parts, axis1, axis2, delta } = this.updateConfig;
    this.updateConfig.angle += delta;
    for (const part of this.updateConfig.parts) {
      part.rotate(delta, axis1, axis2, createVector(0, 0, 0));
    }
  }

  rotate(x, y, z) {
    this.rotations.add(createVector(x, y, z));
  }

  handleRelease() {
    if (this.isUpdating) {
      return;
    }
    const delta = 90;
    while (
      Math.abs(this.rotations.x) >= delta || Math.abs(this.rotations.y) >= delta
    ) {
      if (Math.abs(this.rotations.x) >= delta) {
        const change = delta * Math.sign(this.rotations.x);
        this.rotations.x = this.rotations.x - change;
        this.parts.forEach((path) =>
          path.rotate(change, "y", "z", createVector(0, 0, 0))
        );
      }
      if (Math.abs(this.rotations.y) >= delta) {
        const change = delta * Math.sign(this.rotations.y);
        this.rotations.y = this.rotations.y - change;
        this.parts.forEach((path) =>
          path.rotate(change, "x", "z", createVector(0, 0, 0))
        );
      }
    }
    this.resetRotation();
  }

  resetRotation() {
    const delta = 50;

    if (Math.abs(this.rotations.x) >= delta) {
      const change = 90 * Math.sign(this.rotations.x);
      this.parts.forEach((path) =>
        path.rotate(change, "y", "z", createVector(0, 0, 0))
      );
    }

    if (Math.abs(this.rotations.y) >= delta) {
      const change = 90 * Math.sign(this.rotations.y);
      this.parts.forEach((path) =>
        path.rotate(change, "x", "z", createVector(0, 0, 0))
      );
    }

    this.rotations = createVector(0, 0, 0);
  }

  gcolors(m) {
    const val = m % 7;
    switch (val) {
      case 0:
        return ["black"];
      case 1:
        return ["white"];
      case 2:
        return ["red"];
      case 3:
        return ["orange"];
      case 4:
        return ["green"];
      case 5:
        return ["yellow"];
      case 6:
        return ["blue"];
    }
  }
  createPoints(delta = 0) {
    let id = 0;
    const size = this.size / 3;
    const points = [];
    const parts = [];
    for (let k = -1; k < 2; k += 1) {
      for (let j = -1; j < 2; j += 1) {
        for (let i = -1; i < 2; i += 1) {
          const x = k * size;
          const y = j * size;
          const z = i * size;
          const point = createVector(x, y, z);
          points.push(point);
          const actualSize = size - delta;
          const part = new Cube(
            id,
            x,
            y,
            z,
            actualSize,
            actualSize,
            actualSize,
            this.colors,
            // colorPallet[id++],
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

  getTop() {
    const maxY = this.parts.map((each) => each.pos.y);
    const min = Math.min(...maxY);
    const faces = this.parts.filter((part) => nearEqual(part.pos.y, min, 0.1));
    return faces;
  }

  rotateTop(direction = "left") {
    const top = this.getTop();
    this.isUpdating = true;
    this.updateConfig = {
      angle: 90,
      delta: -1,
      parts: top,
      axis1: "x",
      axis2: "z",
    };
  }
}

const nearEqual = (a, b, delta = 0.001) => {
  return Math.abs(a - b) < delta;
};
