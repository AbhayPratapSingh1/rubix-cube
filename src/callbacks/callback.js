// @ts-nocheck
function mousePressed() {
  states.mouse.prev = createVector(mouseX, mouseY);
}

function mouseReleased() {
  states.cube.handleRelease();
}

function mouseDragged() {
  const current = createVector(mouseX, mouseY);
  const change = p5.Vector.sub(current, states.mouse.prev);
  states.mouse.prev = current;
  if (change.x !== 0) {
    states.cube.rotate(0, 0.5 * change.x, 0);
  }
  if (change.y !== 0) {
    states.cube.rotate(0.5 * change.y, 0, 0);
  }
}

function keyPressed() {
  if (states.cube.isUpdating) {
    return;
  }

  const isCounterClockwise = keyIsDown(SHIFT);
  const lowerKey = key.toLowerCase();

  switch (lowerKey) {
    case 'b':
      states.cube.rotateFront(isCounterClockwise);
      break;
    case 'f':
      states.cube.rotateBack(isCounterClockwise);
      break;
    case 'u':
      states.cube.rotateTop(isCounterClockwise);
      break;
    case 'd':
      states.cube.rotateBottom(isCounterClockwise);
      break;
    case 'l':
      states.cube.rotateLeft(isCounterClockwise);
      break;
    case 'r':
      states.cube.rotateRight(isCounterClockwise);
      break;
  }
}