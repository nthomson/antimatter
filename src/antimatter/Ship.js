class Ship {

  constructor(context) {
    this.context = context;

    this.clientHeight = this.context.canvas.clientHeight;
      this.clientWidth = this.context.canvas.clientWidth;

      this.width = 20;
    this.height = 50;

    this.x = this.clientWidth/2;
    this.y = this.clientHeight - (this.height * 1.75);

    
  }

  update() {
    // TODO?
  }

  render() {
    let context = this.context;

    context.beginPath();
    context.moveTo(this.x, this.y+this.height);
    context.lineTo(this.x-this.width, this.y);
    context.lineTo(this.x, this.y-this.height);
    context.lineTo(this.x+this.width, this.y);
    context.fillStyle = '#eee';
    context.fill();
  }
}

export default Ship;