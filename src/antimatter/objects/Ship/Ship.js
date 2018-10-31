import ShipCollector from './ShipCollector';
import * as colors from '../../lib/colors';

class Ship {

  constructor(context) {
    this.context = context;

    this.clientHeight = this.context.canvas.clientHeight;
    this.clientWidth = this.context.canvas.clientWidth;

    this.width = 20;
    this.height = 50;

    this.x = this.clientWidth/2;
    this.y = this.clientHeight - (this.height * 1.75);

    this.armLength = 0;
    this.collectorRadius = 90;
    this.collectorOffset = this.armLength + this.collectorRadius + this.width;

    this.attractorRadius = this.collectorRadius - 5;
    this.attractorOffset = this.collectorOffset;
    this.attractorSpeed = 15;

    this.maxRadius = this.attractorRadius + 1;
    this.minRadius = this.attractorRadius - 1;
    this.attractorReverse = -1;
  }

  update(delta) {
    const attractorDelta = this.attractorSpeed * delta / 1000;

    this.attractorReverse *= (this.attractorRadius >= this.maxRadius || this.attractorRadius <= this.minRadius) ? -1 : 1;
    this.attractorRadius += (attractorDelta * this.attractorReverse);
  }

  setMatrix(context, x, y, scale, rotate) {
    var xAx = Math.cos(rotate) * scale;
    var xAy = Math.sin(rotate) * scale;
    context.setTransform(xAx, xAy, -xAy, xAx, x, y);
  }

  render() {
    const context = this.context;
    const collectorRadius = this.collectorRadius;
    const attractorRadius = this.attractorRadius;

    context.strokeStyle = context.fillStyle = colors.shipGray;
    context.lineWidth = 5;

    // Body
    const body = {
      top: {
        x: 0,
        y: -this.height
      },
      bottom: {
        x: 0,
        y: this.height
      },
      left: {
        x: -(this.width * 1.5),
        y: 0
      },
      right: {
        x: this.width* 1.5,
        y: 0
      }
    };

    // DO ROTATION
    this.setMatrix(context, this.x, this.y, 1, Math.PI / 4);

    context.beginPath();
    context.moveTo(body.top.x, body.top.y);
    context.quadraticCurveTo(body.left.x, body.left.y, body.bottom.x, body.bottom.y);
    context.quadraticCurveTo(body.right.x, body.right.y, body.top.x, body.top.y);
    context.fill();

    const redFuel = 10;
    const blueFuel = 20;

    const redArm = {
      connector: {
        x:  - (this.width + this.armLength),
        y: 0
      },
      collector: {
        x: 0 - this.collectorOffset,
        y: 0,
        startAngle: Math.PI * 1.9,
        endAngle: Math.PI * 0.1
      },
      attractor: {
        x: 0 - this.attractorOffset,
        y: 0,
        startAngle: Math.PI * 1.91,
        endAngle: Math.PI * 0.09
      },
      matter: {
        x: 0 - (this.width + this.armLength + redFuel + 10),
        y: 0,
        level: redFuel
      }
    }

    const blueArm = {
      connector: {
        x: (this.width + this.armLength),
        y: 0
      },
      collector: {
        x: this.collectorOffset,
        y: 0,
        startAngle: Math.PI * 1.1,
        endAngle: Math.PI * 0.9
      },
      attractor: {
        x: this.attractorOffset,
        y: 0
      },
      matter: {
        x: (this.width + this.armLength + blueFuel + 10),
        y: 0,
        level: blueFuel
      }
    }

    // Red Arm
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(redArm.connector.x, redArm.connector.y);
    context.stroke();

    // Blue Arm
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(blueArm.connector.x, blueArm.connector.y);
    context.stroke();

    // Red Collector
    context.beginPath();
    context.arc(redArm.collector.x, redArm.collector.y, collectorRadius, redArm.collector.startAngle, redArm.collector.endAngle);
    context.stroke();

    // Blue Collector
    context.beginPath();
    context.arc(blueArm.collector.x, blueArm.collector.y, collectorRadius, blueArm.collector.startAngle, blueArm.collector.endAngle, true);
    context.stroke();

    context.lineWidth = 3;

    // Red Attractor
    context.beginPath();
    context.strokeStyle = colors.redMatter;
    context.arc(redArm.attractor.x, redArm.attractor.y, attractorRadius, redArm.collector.startAngle, redArm.collector.endAngle);
    context.stroke();

    // Blue Attractor
    context.beginPath();
    context.strokeStyle = colors.blueMatter;
    context.arc(blueArm.attractor.x, blueArm.attractor.y, attractorRadius, blueArm.collector.startAngle, blueArm.collector.endAngle, true);
    context.stroke();

    // Red Matter
    context.beginPath();
    context.fillStyle = colors.redMatter;
    context.arc(redArm.matter.x, redArm.matter.y, redArm.matter.level, 0, 2 * Math.PI);
    context.fill();

    // Blue Matter
    context.beginPath();
    context.fillStyle = colors.blueMatter;
    context.arc(blueArm.matter.x, blueArm.matter.y, blueArm.matter.level, 0, 2 * Math.PI);
    context.fill();

    // UNDO ROTATION
    this.setMatrix(context, 0, 0, 1, 0);
  }
}

export default Ship;