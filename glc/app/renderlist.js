define([
	"app/shapes/shape",
	"app/shapes/arrow",
	"app/shapes/arcSegment",
	"app/shapes/beziercurve",
	"app/shapes/beziersegment",
	"app/shapes/circle",
	"app/shapes/cube",
	"app/shapes/curve",
	"app/shapes/curvesegment",
	"app/shapes/gear",
	"app/shapes/grid",
	"app/shapes/heart",
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
		Cube,
		Curve,
		CurveSegment,
		Gear,
		Grid,
		Heart,
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
		styles = null;

	function init(w, h, stylesValue, interpolation) {
		canvas = document.createElement("canvas");
		width = canvas.width = w;
		height = canvas.height = h;
		context = canvas.getContext("2d");
		styles = stylesValue
		Shape.styles = styles;
		Shape.interpolation = interpolation;
	}

	function size(w, h) {
		width = canvas.width = w;
		height = canvas.height = h;
	}

	function add(item) {
		list.push(item);
		render(0);
	}

	function clear() {
		list.length = 0;
	}

	function addArrow(props) {
		add(Shape.create(Arrow, props));
	}

	function addArcSegment(props) {
		add(Shape.create(ArcSegment, props));
	}

	function addBezierCurve(props) {
		add(Shape.create(BezierCurve, props));
	}

	function addBezierSegment(props) {
		add(Shape.create(BezierSegment, props));
	}

	function addCircle(props) {
		add(Shape.create(Circle, props));
	}

	function addCube(props) {
		add(Shape.create(Cube, props));
	}

	function addCurve(props) {
		add(Shape.create(Curve, props));
	}

	function addCurveSegment(props) {
		add(Shape.create(CurveSegment, props));
	}

	function addGear(props) {
		add(Shape.create(Gear, props));
	}

	function addGrid(props) {
		add(Shape.create(Grid, props));
	}

	function addHeart(props) {
		add(Shape.create(Heart, props));
	}

	function addLine(props) {
		add(Shape.create(Line, props));
	}
	
	function addOval(props) {
		add(Shape.create(Oval, props));
	}
	
	function addPath(props) {
		add(Shape.create(Path, props));
	}
	
	function addPoly(props) {
		add(Shape.create(Poly, props));
	}
	
	function addRay(props) {
		add(Shape.create(Ray, props));
	}

	function addRaySegment(props) {
		add(Shape.create(RaySegment, props));
	}

	function addRect(props) {
		add(Shape.create(Rect, props));
	}

	function addSegment(props) {
		add(Shape.create(Segment, props));
	}

	function addSpiral(props) {
		add(Shape.create(Spiral, props));
	}

	function addStar(props) {
		add(Shape.create(Star, props));
	}

	function addText(props) {
		add(Shape.create(Text, props));
	}

	function render(t) {
		context.fillStyle = styles.backgroundColor;
  		context.fillRect(0, 0, width, height);
		for(var i = 0; i < list.length; i++) {
			list[i].render(context, t);
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
		addCube: addCube,
		addCurve: addCurve,
		addCurveSegment: addCurveSegment,
		addGear: addGear,
		addGrid: addGrid,
		addHeart: addHeart,
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
