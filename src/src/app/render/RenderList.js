define([
	"app/render/shapes/shape",
	"app/render/shapes/arrow",
	"app/render/shapes/arcSegment",
	"app/render/shapes/beziercurve",
	"app/render/shapes/beziersegment",
	"app/render/shapes/circle",
	"app/render/shapes/container",
	"app/render/shapes/crescent",
	"app/render/shapes/cube",
	"app/render/shapes/curve",
	"app/render/shapes/curvesegment",
	"app/render/shapes/gear",
	"app/render/shapes/grid",
	"app/render/shapes/heart",
	"app/render/shapes/image",
	"app/render/shapes/isobox",
	"app/render/shapes/isotube",
	"app/render/shapes/line",
	"app/render/shapes/oval",
	"app/render/shapes/path",
	"app/render/shapes/poly",
	"app/render/shapes/ray",
	"app/render/shapes/raysegment",
	"app/render/shapes/rect",
	"app/render/shapes/segment",
	"app/render/shapes/spiral",
	"app/render/shapes/star",
	"app/render/shapes/text",
	],
	function(
		Shape,
		Arrow,
		ArcSegment,
		BezierCurve,
		BezierSegment, 
		Circle,
		Container,
		Crescent,
		Cube,
		Curve,
		CurveSegment,
		Gear,
		Grid,
		Heart,
		Image,
		Isobox,
		Isotube,
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
		GLCInterface = null,
		interval = null;

	function init(pGLCInterface, pStyles, pInterpolation, pCanvas) {
		GLCInterface = pGLCInterface
		canvas = pCanvas;
		setSize(glcConfig.canvasSize, glcConfig.canvasHeight)
		context = canvas.getContext("2d");
		styles = pStyles
		Shape.styles = styles;
		Shape.interpolation = interpolation = pInterpolation;
	}

	function setSize(w, h) {
		width = w;
		height = h;
	}

	function add(item) {
		if(item.props.parent) {
			item.props.parent.add(item);
		}
		else {
			list.push(item);
		}
		clearTimeout(interval);
		interval = setTimeout(function() {
			render(0);
		}, 0);
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

	function addCrescent(props) {
		return add(Shape.create(Crescent, props));
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

	function addImage(props) {
		if(glcConfig.isStandalone) {
			var image = document.createElement("img");
			image.src = props.url;
			props.image = image;
			return add(Shape.create(Image, props));
		}
		alert("The Image object is only supported in the standalone version of GLC.");
		return null;
	}

	function addIsobox(props) {
		return add(Shape.create(Isobox, props));
	}

	function addIsotube(props) {
		return add(Shape.create(Isotube, props));
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
		if(GLCInterface.onEnterFrame) {
			context.save();
			GLCInterface.onEnterFrame(interpolatedT);
			context.restore();
		}
		for(var i = 0; i < list.length; i++) {
			list[i].render(context, t);
		}
		if(GLCInterface.onExitFrame) {
			context.save();
			GLCInterface.onExitFrame(interpolatedT);
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
		setSize: setSize,
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
		addCrescent: addCrescent,
		addCube: addCube,
		addCurve: addCurve,
		addCurveSegment: addCurveSegment,
		addGear: addGear,
		addGrid: addGrid,
		addHeart: addHeart,
		addImage: addImage,
		addIsobox: addIsobox,
		addIsotube: addIsotube,
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
