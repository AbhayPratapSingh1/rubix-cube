// @ts-nocheck
const WORLD_ITEMS = {
  palettes: [
    "#0015ff",
    "#ff00a1",
    "#90fe00",
    "#8400ff",
    "#00fff7",
    "#ff7300",
  ],
};
// const WORLD_ITEMS.palettes =;

class Cube {
  constructor(id, x, y, z, h, w, d, color, strokeColor = "black") {
    this.id = id;
    color = color || WORLD_ITEMS.palettes;

    this.pos = createVector(x, y, z);
    this.h = h;
    this.w = w;
    this.d = d;

    this.OGCenter = createVector(x, y, z);
    this.rotations = { x: 0, y: 0, z: 0 };

    this.strokeColor = strokeColor;
    this.color = color;

    this.points = this.createVertices();
  }

  createVertices() {
    const w2 = this.w / 2;
    const h2 = this.h / 2;
    const d2 = this.d / 2;

    const p1 = createVector(-w2, -h2, -d2).add(this.pos); // F-T-L
    const p2 = createVector(-w2, +h2, -d2).add(this.pos); // F-B-L
    const p3 = createVector(+w2, +h2, -d2).add(this.pos); // F-B-R
    const p4 = createVector(+w2, -h2, -d2).add(this.pos); // F-T-R
    const p5 = createVector(+w2, -h2, +d2).add(this.pos); // B-T-R
    const p6 = createVector(+w2, +h2, +d2).add(this.pos); // B-B-R
    const p7 = createVector(-w2, +h2, +d2).add(this.pos); // B-B-L
    const p8 = createVector(-w2, -h2, +d2).add(this.pos); // B-T-L
    return [p1, p2, p3, p4, p5, p6, p7, p8];
  }

  getFaces() {
    const [p1, p2, p3, p4, p5, p6, p7, p8] = this.points;

    const f1 = [p1, p2, p3, p4]; // front
    const f2 = [p5, p6, p7, p8]; // back
    const f3 = [p8, p7, p2, p1]; // left
    const f4 = [p4, p3, p6, p5]; // right
    const f5 = [p8, p1, p4, p5]; // top
    const f6 = [p2, p7, p6, p3]; // bottom

    // const f6 = []; // bottom

    const val = [f1, f2, f3, f4, f5, f6].map((points, i) => ({
      strokeColor: this.strokeColor,
      color: this.color[i % this.color.length],
      points,
    }));

    return val;
  }

  rotate(degree, a1 = "x", a2 = "y", reference = undefined) {
    reference = reference || this.pos;

    this.points.forEach((point) => {
      const [v1, v2] = rotatePointAroundPoint(point, reference, degree, a1, a2);
      point[a1] = v1;
      point[a2] = v2;
    });

    const [v1, v2] = rotatePointAroundPoint(
      this.pos,
      reference,
      degree,
      a1,
      a2,
    );
    this.pos[a1] = v1;
    this.pos[a2] = v2;
  }
}
