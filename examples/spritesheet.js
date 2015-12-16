function onGLC(glc) {
	glc.loop();
	glc.size(100, 100);
	// glc.setDuration(1);
	glc.setFPS(20);
	// glc.setMode("single");
	// glc.setEasing(false);
	var list = glc.renderList,
		width = glc.w,
		height = glc.h,
		color = glc.color;

	// your code goes here:


	list.addOval({
		x: width / 2,
		y: height / 2,
		rx: 22.5,
		ry: [22.5, 1],
		rotation: [0, 180],
		strokeStyle: "blue",
		fill: false,
		stroke: true,
		phase: 0.5
	});
	list.addOval({
		x: width / 2,
		y: height / 2,
		rx: [45, 1],
		ry: 45,
		rotation: [0, 180],
		strokeStyle: "red",
		fill: false,
		stroke: true
	});


}		