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
  context.arc(shape.x, shape.y, shape.r, shape.startAngle || 0, shape.endAngle || Math.PI * 2);
  fill ? context.fill() : context.stroke();
};

export const drawLine = (context, shape) => {
  context.beginPath();
  context.moveTo(shape.startX, shape.startY);
  context.lineTo(shape.endX, shape.endY);
  context.stroke();
};

export const drawPylon = (context, pylon) => {
  context.beginPath();
  context.moveTo(pylon.top.x, pylon.top.y);
  context.quadraticCurveTo(pylon.left.x, pylon.left.y, pylon.bottom.x, pylon.bottom.y);
  context.quadraticCurveTo(pylon.right.x, pylon.right.y, pylon.top.x, pylon.top.y);
  context.fill();
};

export const rotate = (cx, cy, x, y, angle) => {
    var cos = Math.cos(angle),
        sin = Math.sin(angle),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return { x: nx, y: ny };
}

export const globalCoords = (item, offset, rotation) => {
  const nX = item.x + offset.x;
  const nY = item.y + offset.y;

  const rotated = rotate(offset.x, offset.y, nX, nY, rotation);
  return {
    x: rotated.x,
    y: rotated.y
  };
};

export const circleCollision = (c1, c2) => Math.sqrt( ( c2.x-c1.x ) * ( c2.x-c1.x )  + ( c2.y-c1.y ) * ( c2.y-c1.y ) ) < ( c1.r + c2.r );

export const easeInQuad = t => t*t;

export const rand = (start, end) => Math.floor((Math.random() * end) + start);