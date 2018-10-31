import ShipCollector from './ShipCollector';
import * as colors from '../../lib/colors'

class Ship {

  constructor(context, attractorColor, orientation) {
    this.context = context;

    this.clientHeight = this.context.canvas.clientHeight;
    this.clientWidth = this.context.canvas.clientWidth;

    this.width = 15;
    this.height = 50;

    this.x = this.clientWidth/2;
    this.y = this.clientHeight - (this.height * 1.75);
    this.orientation = orientation

    this.armLength = 5;
    this.collectorRadius = 100;
    this.collectorEdge = this.x + this.width + this.armLength
    this.collectorOffset = (this.armLength + this.collectorRadius + this.width) * orientation;

    // this.attractorMax = this.collectorOffset + 6;
    this.attractorMin = this.collectorOffset + (5 * orientation);
    this.attractorOffset = this.attractorMin;


    // this.attractorReverse = 1;
    // this.attractorSpeed = 8; // Pixels per second
    this.attractorColor = attractorColor;

    this.arcReverse = orientation < 0;
    const start1 = Math.PI * 1.9;
    const end1 = Math.PI * 0.1;

    const start2 = Math.PI * 1.1;
    const end2 = Math.PI * 0.9;

    this.startAngle = this.arcReverse ? start2 : start1;
    this.endAngle = this.arcReverse ? end2 : end1; 
  }

  update(delta) {
    const attractorDelta = this.attractorSpeed * delta / 1000;
    this.attractorReverse *= (this.attractorOffset >= this.attractorMax || this.attractorOffset <= this.attractorMin) ? -1 : 1;

    this.attractorOffset += (attractorDelta * this.attractorReverse) * this.orientation;
  }

  render() {
    const context = this.context;
    const armLength = this.armLength;
    const collectorRadius = this.collectorRadius;
    const collectorOffset = this.collectorOffset;
    const attractorOffset = this.attractorOffset;

    context.strokeStyle = colors.shipGray;
    context.lineWidth = 5;
    
    // Left Arm
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x - ((this.width + armLength) * this.orientation), this.y);
    context.stroke();

    // Left Collector
    context.beginPath();
    context.arc(this.x - collectorOffset, this.y, collectorRadius, this.startAngle, this.endAngle, this.arcReverse);
    context.stroke();

    context.lineWidth = 2.5;

    // Left Attractor
    context.beginPath();
    context.strokeStyle = this.attractorColor;
    context.arc(this.x - attractorOffset, this.y, collectorRadius, this.startAngle, this.endAngle, this.arcReverse);
    context.stroke();
  }
}

export default Ship;

