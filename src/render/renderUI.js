// @ts-nocheck
const shapeFromCamera = (shape, camera) => {
  const worldPoints = shape.points.map((point) =>
    p5.Vector.sub(point, camera.points)
  );
  const points = worldPoints.map((point) => {
    const nPoint = point.copy();
    const rotated = rotateVertices(nPoint, camera.rotate);
    return rotated;
  });

  return { ...shape, points };
};

const renderShapes = (shapes, camera) => {
  const shapesFromCamera = shapes.map((shape) =>
    shapeFromCamera(shape, camera)
  );

  const shapesWithDetials = shapesFromCamera.map((shape) =>
    shapeWithDetails(shape)
  );

  const clippedShapes = shapesWithDetials.map((shape) => clipFace(shape));
  const sortedFaces = getSortedFaces(clippedShapes);
  const projections = shapesProjections(sortedFaces);
  return projections;
};

const metaData = () => {
  push();
  noStroke();
  fill(225);
  textSize(14);
  translate(-width / 2, -height / 2);
  text(`FPS : ${Math.floor(frameRate())}`, width - 150, 60);
  pop();
};
