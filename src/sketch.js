/// <reference types="p5/global"/>
// @ts-nocheck

const CONFIG = {
  SCREEN: {
    Z: 700,
  },
};

const states = {
  cube: null,
  camera: null,
  views: [],
  mouse: {
    prev: null,
  },
  cameraMovement: {
    phase: 0,
  },
};

const createViews = () => {
  const camLB = {
    points: createVector(width, -height * 0.6, -700),
    rotate: createVector(radians(0), radians(20), radians(0)),
  };
  const camRB = {
    points: createVector(-width, -height * 0.6, -700),
    rotate: createVector(radians(0), radians(-20), radians(0)),
  };
  return [camLB, camRB];
};

const createCamera = () => {
  return {
    points: createVector(0, 0, 0),
    rotate: createVector(radians(0), radians(0), radians(0)),
  };
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  states.camera = createCamera();
  states.views.push(...createViews());
  states.cube = new Rubix_CUBE(0, 0, 1000, 400);
}

const handlerCameraMovement = (states) => {
  states.cameraMovement.phase = (states.cameraMovement.phase + 3) % 360;
  const val = Math.sin(radians(states.cameraMovement.phase)) * 1.2;
  states.camera.points.y += val;
};

function draw() {
  background(0);
  translate(width / 2, height / 2);

  const shapes = states.cube.getFaces();
  const faces = renderShapes(shapes, states.camera);

  const viewsFaces = states.views.map((each) => renderShapes(shapes, each));

  states.cube.update();

  faces.forEach((face) => {
    drawFace(face);
  });

  viewsFaces.forEach((faces) => {
    faces.forEach((face) => {
      drawFace(face);
    });
  });

  handlerCameraMovement(states);
  metaData();
}
