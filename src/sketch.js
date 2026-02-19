/// <reference types="p5/global"/>
// @ts-nocheck

const CONFIG = {
  SCREEN: {
    Z: 700,
  },
};

let prev;
let cube;
let camera;
let cubes;
let center;

function setup() {
  createCanvas(windowWidth, windowHeight);
  camera = {
    points: createVector(0, 0, 0),
    rotate: createVector(radians(0), radians(0), radians(0)),
  };
  // center = createVector(0, 0, 1300);
  // prev = createVector(0, 0);
  // cubes = createCubes(center, 200);
  cube = new Rubix_CUBE(0, 0, 1000, 400);
}

function mousePressed() {
  prev = createVector(mouseX, mouseY);
}

function mouseDragged() {
  const current = createVector(mouseX, mouseY);
  const change = p5.Vector.sub(current, prev);
  prev = current;
  if (change.x !== 0) {
    cube.rotate(0, radians(0.5 * change.x), 0);
  }
  if (change.y !== 0) {
    cube.rotate(radians(0.5 * change.y), 0, 0);
  }
}

const createCubes = (center, size, delta = 0) => {
  const cubes = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      for (let k = -1; k < 2; k++) {
        const x = center.x - j * size;
        const y = center.y - i * size;
        const z = center.z - k * size;
        const actualSize = size - delta;
        const cube = new Rubix_CUBE(
          x,
          y,
          z,
          actualSize,
          actualSize,
          actualSize,
          ["red", "blue", "green", "yellow", "white", "orange"],
          "black",
        );
        cubes.push(cube);
      }
    }
  }
  return cubes;
};

function keyPressed() {
  const bottom = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const middle = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const top = [18, 19, 20, 21, 22, 23, 24, 25, 26];
  if (key === "r") {
    cube.resetRotation();
  }

  if (key === "w") {
    top.forEach((idx) => {
      cubes[idx].rotate(90, "x", "z", center);
    });
  }

  if (key === "s") {
    middle.forEach((idx) => {
      cubes[idx].rotate(90, "x", "z", center);
    });
  }

  if (key === "x") {
    bottom.forEach((idx) => {
      cubes[idx].rotate(90, "x", "z", center);
    });
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  const shapes = cube.getFaces();
  const faces = renderShapes(shapes, camera);

  faces.forEach((face) => {
    drawFace(face);
  });
  // noLoop();
}
