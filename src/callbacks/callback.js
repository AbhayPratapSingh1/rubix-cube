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

  if (key === "w") {
    states.cube.rotateTop();
  }
}
