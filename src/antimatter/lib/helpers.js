export const setMatrix = (context, x, y, scale, rotate) => {
  var xAx = Math.cos(rotate) * scale;
  var xAy = Math.sin(rotate) * scale;
  context.setTransform(xAx, xAy, -xAy, xAx, x, y);
};

export const transformMatrix = (context, x, y, scale, rotate) => {
  var xAx = Math.cos(rotate) * scale;
  var xAy = Math.sin(rotate) * scale;
  context.transform(xAx, xAy, -xAy, xAx, x, y);
};

export const drawArc = (context, shape, fill) => {
  context.beginPath();
  context.arc(shape.x, shape.y, shape.r, shape.startAngle, shape.endAngle);
  fill ? context.fill() : context.stroke();
};

export const drawLine = (context, shape) => {
  context.beginPath();
  context.moveTo(shape.startX, shape.startY);
  context.lineTo(shape.endX, shape.endY);
  context.stroke();
}

export const drawPylon = (context, pylon) => {
  context.beginPath();
  context.moveTo(pylon.top.x, pylon.top.y);
  context.quadraticCurveTo(pylon.left.x, pylon.left.y, pylon.bottom.x, pylon.bottom.y);
  context.quadraticCurveTo(pylon.right.x, pylon.right.y, pylon.top.x, pylon.top.y);
  context.fill();
}

export const easeInQuad = t => t*t;

export const rand = (start, end) => Math.floor((Math.random() * end) + start);