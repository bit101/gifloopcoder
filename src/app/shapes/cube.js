define(function() {
	
	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				z = this.getNumber("z", t, 0),
				size = this.getNumber("size", t, 100),
				rotationX = this.getNumber("rotationX", t, 0) * Math.PI / 180,
				rotationY = this.getNumber("rotationY", t, 0) * Math.PI / 180,
				rotationZ = this.getNumber("rotationZ", t, 0) * Math.PI / 180;

			var points = makePoints();
			scale(points, size / 2);
			rotateX(points, rotationX);
			rotateY(points, rotationY);
			rotateZ(points, rotationZ);
			project(points, z);

			context.lineJoin = this.getString("lineJoin", t, "round");
			context.lineWidth = this.getNumber("lineWidth", t, 1);

			context.translate(x, y);

			context.moveTo(points[0].sx, points[0].sy);
			context.lineTo(points[1].sx, points[1].sy);
			context.lineTo(points[2].sx, points[2].sy);
			context.lineTo(points[3].sx, points[3].sy);
			context.lineTo(points[0].sx, points[0].sy);

			context.moveTo(points[4].sx, points[4].sy);
			context.lineTo(points[5].sx, points[5].sy);
			context.lineTo(points[6].sx, points[6].sy);
			context.lineTo(points[7].sx, points[7].sy);
			context.lineTo(points[4].sx, points[4].sy);

			context.moveTo(points[0].sx, points[0].sy);
			context.lineTo(points[4].sx, points[4].sy);

			context.moveTo(points[1].sx, points[1].sy);
			context.lineTo(points[5].sx, points[5].sy);

			context.moveTo(points[2].sx, points[2].sy);
			context.lineTo(points[6].sx, points[6].sy);

			context.moveTo(points[3].sx, points[3].sy);
			context.lineTo(points[7].sx, points[7].sy);

			this.setShadowParams(context, t);
			context.stroke();		
		}
	}
	
	function scale(points, size) {
		for(var i = 0; i < points.length; i++) {
			var p = points[i];
			p.x *= size;
			p.y *= size;
			p.z *= size;
		}
	}

	function rotateX(points, angle) {
		var cos = Math.cos(angle),
			sin = Math.sin(angle);
		for(var i = 0; i < points.length; i++) {
			var p = points[i],
				y = p.y * cos - p.z * sin,
				z = p.z * cos + p.y * sin;
			p.y = y;
			p.z = z;
		}
	}

	function rotateY(points, angle) {
		var cos = Math.cos(angle),
			sin = Math.sin(angle);
		for(var i = 0; i < points.length; i++) {
			var p = points[i],
				x = p.x * cos - p.z * sin,
				z = p.z * cos + p.x * sin;
			p.x = x;
			p.z = z;
		}
	}

	function rotateZ(points, angle) {
		var cos = Math.cos(angle),
			sin = Math.sin(angle);
		for(var i = 0; i < points.length; i++) {
			var p = points[i],
				x = p.x * cos - p.y * sin,
				y = p.y * cos + p.x * sin;
			p.x = x;
			p.y = y;
		}
	}

	function project(points, z) {
		var fl = 300;
		for(var i = 0; i < points.length; i++) {
			var p = points[i],
				scale = fl / (fl + p.z + z);
			p.sx = p.x * scale;
			p.sy = p.y * scale;
		}
	}

	function makePoints() {
		return [
			{
				x: -1,
				y: -1,
				z: -1
			},
			{
				x: 1,
				y: -1,
				z: -1
			},
			{
				x: 1,
				y: 1,
				z: -1
			},
			{
				x: -1,
				y: 1,
				z: -1
			},
			{
				x: -1,
				y: -1,
				z: 1
			},
			{
				x: 1,
				y: -1,
				z: 1
			},
			{
				x: 1,
				y: 1,
				z: 1
			},
			{
				x: -1,
				y: 1,
				z: 1
			}
		];
	}
});
