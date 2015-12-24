define([
	"app/shapes/shape",
	"app/shapes/arrow",
	"app/shapes/arcSegment",
	"app/shapes/beziercurve",
	"app/shapes/beziersegment",
	"app/shapes/circle",
	"app/shapes/container",
	"app/shapes/cube",
	"app/shapes/curve",
	"app/shapes/curvesegment",
	"app/shapes/gear",
	"app/shapes/grid",
	"app/shapes/heart",
	"app/shapes/isobox",
	"app/shapes/line",
	"app/shapes/oval",
	"app/shapes/path",
	"app/shapes/poly",
	"app/shapes/ray",
	"app/shapes/raysegment",
	"app/shapes/rect",
	"app/shapes/segment",
	"app/shapes/spiral",
	"app/shapes/star",
	"app/shapes/text",
	],
	function(
		Shape,
		Arrow,
		ArcSegment,
		BezierCurve,
		BezierSegment, 
		Circle,
		Container,
		Cube,
		Curve,
		CurveSegment,
		Gear,
		Grid,
		Heart,
		Isobox,
		Line,
		Oval,
		Path,
		Poly,
		Ray,
		RaySegment,
		Rect,
		Segment,
		Spiral,
		Star,
		Text
	) {


	var canvas = null,
		context = null,
		width = 0,
		height = 0,
		list = [],
		styles = null,
		interpolation = null,
		glc = null;

	function init(pGlc, w, h, pStyles, pInterpolation) {
		glc = pGlc
		canvas = document.createElement("canvas");
		width = canvas.width = w;
		height = canvas.height = h;
		context = canvas.getContext("2d");
		styles = pStyles
		Shape.styles = styles;
		Shape.interpolation = interpolation = pInterpolation;
	}

	function size(w, h) {
		width = canvas.width = w;
		height = canvas.height = h;
	}

	function add(item) {
		if(item.props.parent) {
			item.props.parent.add(item);
		}
		else {
			list.push(item);
		}
		render(0);
		return item;
	}

	function clear() {
		list.length = 0;
	}

	function addArrow(props) {
		return add(Shape.create(Arrow, props));
	}

	function addArcSegment(props) {
		return add(Shape.create(ArcSegment, props));
	}

	function addBezierCurve(props) {
		return add(Shape.create(BezierCurve, props));
	}

	function addBezierSegment(props) {
		return add(Shape.create(BezierSegment, props));
	}

	function addCircle(props) {
		return add(Shape.create(Circle, props));
	}

	function addContainer(props) {
		return add(Shape.create(Container, props));
	}

	function addCube(props) {
		return add(Shape.create(Cube, props));
	}

	function addCurve(props) {
		return add(Shape.create(Curve, props));
	}

	function addCurveSegment(props) {
		return add(Shape.create(CurveSegment, props));
	}

	function addGear(props) {
		return add(Shape.create(Gear, props));
	}

	function addGrid(props) {
		return add(Shape.create(Grid, props));
	}

	function addHeart(props) {
		return add(Shape.create(Heart, props));
	}

	function addIsobox(props) {
		return add(Shape.create(Isobox, props));
	}

	function addLine(props) {
		return add(Shape.create(Line, props));
	}
	
	function addOval(props) {
		return add(Shape.create(Oval, props));
	}
	
	function addPath(props) {
		return add(Shape.create(Path, props));
	}
	
	function addPoly(props) {
		return add(Shape.create(Poly, props));
	}
	
	function addRay(props) {
		return add(Shape.create(Ray, props));
	}

	function addRaySegment(props) {
		return add(Shape.create(RaySegment, props));
	}

	function addRect(props) {
		return add(Shape.create(Rect, props));
	}

	function addSegment(props) {
		return add(Shape.create(Segment, props));
	}

	function addSpiral(props) {
		return add(Shape.create(Spiral, props));
	}

	function addStar(props) {
		return add(Shape.create(Star, props));
	}

	function addText(props) {
		return add(Shape.create(Text, props));
	}

	function render(t) {
		if(styles.backgroundColor === "transparent") {
			context.clearRect(0, 0, width, height);
		}
		else {
			context.fillStyle = styles.backgroundColor;
  			context.fillRect(0, 0, width, height);
  		}
  		var interpolatedT = interpolation.interpolate(t);
		if(glc.onEnterFrame) {
			context.save();
			glc.onEnterFrame(interpolatedT);
			context.restore();
		}
		for(var i = 0; i < list.length; i++) {
			list[i].render(context, t);
		}
		if(glc.onExitFrame) {
			context.save();
			glc.onExitFrame(interpolatedT);
			context.restore();
		}
	}

	function getCanvas() {
		return canvas;
	}

	function getContext() {
		return context;
	}

	return {
		init: init,
		size: size,
		getCanvas: getCanvas,
		getContext: getContext,
		add: add,
		clear: clear,
		addArrow: addArrow,
		addArcSegment: addArcSegment,
		addBezierCurve: addBezierCurve,
		addBezierSegment: addBezierSegment,
		addCircle: addCircle,
		addContainer: addContainer,
		addCube: addCube,
		addCurve: addCurve,
		addCurveSegment: addCurveSegment,
		addGear: addGear,
		addGrid: addGrid,
		addHeart: addHeart,
		addIsobox: addIsobox,
		addLine: addLine,
		addOval: addOval,
		addPath: addPath,
		addPoly: addPoly,
		addRay: addRay,
		addRaySegment: addRaySegment,
		addRect: addRect,
		addSegment: addSegment,
		addSpiral: addSpiral,
		addStar: addStar,
		addText: addText,
		render: render
	};

});
