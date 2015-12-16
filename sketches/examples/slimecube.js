function onGLC(glc) {
	glc.loop();
	glc.size(200, 200);
	glc.setDuration(3);
	glc.setFPS(60);
	glc.setMode("single");
	glc.setEasing(false);
	glc.setMaxColors(64);
	var list = glc.renderList,
		width = glc.w,
		height = glc.h;

	list.addRect({
		x: 0,
		y: 0,
		w: 400,
		h: 400,
		fillStyle: '#f80'
	});

	list.addRect({
		translationX: [ -100, 300 ],
		x: 0,
		y: 0,
		w: 200,
		h: 200,
		fillStyle: '#fa0'
	});

	list.addRect({
		translationX: [ -100, 300 ],
		x: -200,
		y: 200,
		w: 200,
		h: 200,
		fillStyle: '#fa0'
	});

	list.addRect({
		translationX: [ -100, 300 ],
		x: 200,
		y: 200,
		w: 200,
		h: 200,
		fillStyle: '#fa0'
	});

	list.addCube({
		x: width / 2,
		y: height / 2,
		size: width * 0.5,
		rotationX: [0, 0],
		rotationY: [0, 180],
		rotationZ: [0, 360],
		phase: 0.5,
		globalAlpha: 1.0,
		strokeStyle: '#fff',
		lineWidth: 1,
	});

	for(var i=0; i<100; i++) {
		list.addCube({
			x: width / 2,
			y: height / 2,
			size: width * 0.33,
			rotationX: [0, 180],
			rotationY: [90, 270],
			rotationZ: [0, 360],
			phase: i / 500.0,
			globalAlpha: 1.0,
			strokeStyle: '#369',
			lineWidth: 4,
			clip: [0, 2 * i, 200, 2],
		shadowColor: '#fff',
		shadowOffsetX: 0.0,
		shadowOffsetY: 0.0,
		shadowBlur: 20.0,
		});
	}

}