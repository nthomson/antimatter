class Ship {

	constructor(context) {
		this.context = context;
	}

	update() {
		// TODO?
	}

	render() {
		let context = this.context;

		context.beginPath();
		context.moveTo(250, 800);
		context.lineTo(225, 850);
		context.lineTo(250, 900);
		context.lineTo(275, 850);
		context.fillStyle = '#888';
		context.fill();
	}
}

export default Ship;