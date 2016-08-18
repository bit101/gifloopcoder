define(function() {

    var map = {
        "objects": {
            "Arc Segment": 
                "list.addArcSegment({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2\n\t" +
                "});\n\t",
            "Arrow": 
                "list.addArrow({\n\t\t" + 
                    "x: width / 2,\n\t\t" +
                    "y: height / 2,\n\t\t" +
                    "w: 100,\n\t\t" +
                    "h: 100,\n\t\t" +
                    "shaftPercent: 0.5,\n\t\t" + 
                    "pointPercent: 0.5\n\t" +
                "});\n\t",
            "Bezier Curve": 
                "list.addBezierCurve({\n\t\t" +
                    "x0: 0,\n\t\t" +
                    "y0: 0,\n\t\t" +
                    "x1: 0,\n\t\t" +
                    "y1: 100,\n\t\t" +
                    "x2: 100,\n\t\t" +
                    "y2: 100,\n\t\t" +
                    "x3: 100,\n\t\t" +
                    "y3: 200\n\t"  +
                "});",
            "Bezier Segment": 
                "list.addBezierSegment({\n\t\t" +
                    "x0: 0,\n\t\t" +
                    "y0: 0,\n\t\t" +
                    "x1: 0,\n\t\t" +
                    "y1: 100,\n\t\t" +
                    "x2: 100,\n\t\t" +
                    "y2: 100,\n\t\t" +
                    "x3: 100,\n\t\t" +
                    "y3: 200\n\t" +
                "});",
            "Circle": 
                "list.addCircle({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2,\n\t\t" +
                    "radius: 100\n\t" + 
                "});\n\t",
            "Container": 
                "var container = list.addContainer({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2\n\t" + 
                "});\n\t",
            "Crescent":
                "list.addCrescent({\n\t\t" +
                    "x: width / 2,\n\t\t" + 
                    "y: height / 2,\n\t\t" +
                    "radius: 100,\n\t\t" + 
                    "percent: 0.5\n\t" +
                "});",
            "Cube": 
                "list.addCube({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2,\n\t\t" + 
                    "size: 50,\n\t\t" +
                    "rotationX: 45,\n\t\t" + 
                    "rotationY: 45,\n\t\t" + 
                    "rotationZ: 45,\n\t" + 
                "});\n\t",
            "Curve": 
                "list.addCurve({\n\t\t" +
                    "x0: 0,\n\t\t" +
                    "y0: 0,\n\t\t" +
                    "x1: 0,\n\t\t" +
                    "y1: 100,\n\t\t" +
                    "x2: 100,\n\t\t" +
                    "y2: 100\n\t});",
            "Curve Segment": 
                "list.addCurveSegment({\n\t\t" +
                    "x0: 0,\n\t\t" +
                    "y0: 0,\n\t\t" +
                    "x1: 0,\n\t\t" +
                    "y1: 100,\n\t\t" +
                    "x2: 100,\n\t\t" +
                    "y2: 100\n\t});",
            "Gear": 
                "list.addGear({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2,\n\t\t" +
                    "radius: 50,\n\t\t" +
                    "toothHeight: 10,\n\t\t" +
                    "toothAngle: 0.5\n\t});\n\t",
            "Grid": 
                "list.addGrid({\n\t\t" +
                    "x: 0,\n\t\t" +
                    "y: 0,\n\t\t" +
                    "w: width,\n\t\t" +
                    "h: height, lineWidth: 0.25\n\t});",
            "Heart": 
                "list.addHeart({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2,\n\t\t" + 
                    "w: 100,\n\t\t" +
                    "h: 100\n\t});\n\t",
            "Image": 
                "list.addImage({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2,\n\t\t" +
                    "url: \"path/to/image\"\n\t});\n\t",
            "Iso Box": 
                "list.addIsobox({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2,\n\t\t" +
                    "size: 100,\n\t\t" +
                    "h: 60,\n\t\t" + 
                    "colorTop: color.hsv(30, 1, 1),\n\t\t" +
                    "colorRight: color.hsv(30, 1, 0.75),\n\t\t" +
                    "colorLeft: color.hsv(30, 1, 0.5),\n\t" + 
                "});\n\t",
            "Iso Tube": 
                "list.addIsotube({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2,\n\t\t" +
                    "radius: 50,\n\t\t" +
                    "h: 60,\n\t\t" + 
                    "colorTop: color.hsv(30, 1, 1),\n\t\t" +
                    "colorRight: color.hsv(30, 1, 0.75),\n\t\t" +
                    "colorLeft: color.hsv(30, 1, 0.5),\n\t" + 
                "});\n\t",
            "Line": 
                "list.addLine({\n\t\t" +
                    "x0: 0,\n\t\t" +
                    "y0: 0,\n\t\t" +
                    "x1: width,\n\t\t" +
                    "y1: height\n\t});",
            "Oval": 
                "list.addOval({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2,\n\t\t" +
                    "rx: 100,\n\t\t" +
                    "ry: 50\n\t});\n\t",
            "Path": 
                "list.addPath({\n\t\t" +
                    "path: [0, 0, 100, 50, 50, 100, 100, 100]\n\t});\n\t",
            "Poly": 
                "list.addPoly({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2,\n\t\t" +
                    "radius: 50,\n\t\t" +
                    "sides: 5\n\t});\n\t",
            "Ray": 
                "list.addRay({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2\n\t});\n\t",
            "Ray Segment": 
                "list.addRaySegment({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2\n\t});\n\t",
            "Rect": 
                "list.addRect({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2,\n\t\t" +
                    "w: 100,\n\t\t" +
                    "h: 50\n\t});\n\t",
            "Segment": 
                "list.addSegment({\n\t\t" +
                    "x0: 0,\n\t\t" +
                    "y0: 0,\n\t\t" +
                    "x1: width,\n\t\t" +
                    "y1: height\n\t});",
            "Spiral": 
                "list.addSpiral({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2\n\t});\n\t",
            "Star": 
                "list.addStar({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2,\n\t\t" +
                    "outerRadius: 60,\n\t\t" +
                    "innerRadius: 25,\n\t\t" +
                    "points: 5\n\t});\n\t",
            "Text": 
                "list.addText({\n\t\t" +
                    "x: width / 2,\n\t\t" +
                    "y: height / 2\n\t});",
        },

        "custom": {
            "Shadow": 
                "\t\tshadowColor: \"rgba(0, 0, 0, 0.3)\",\n\t\t" +
                "shadowOffsetX: 10,\n\t\t" +
                "shadowOffsetY: 10,\n\t\t" +
                "shadowBlur: 10,\n",

            "Grid Layout": 
                "\tvar res = 50;\n\t" +
                "for(var y = 0; y < height; y += res) {\n\t\t" +
                    "for(var x = 0; x < width; x += res) {\n\t\t\t" +
                        "list.addCircle({\n\t\t\t\t" +
                            "translationX: x,\n\t\t\t\t" +
                            "translationY: y,\n\t\t\t\t" +
                            "x: res / 2,\n\t\t\t\t" +
                            "y: res / 2,\n\t\t\t\t" +
                            "radius: res / 2\n\t\t\t" +
                            "});\n\t\t" +
                    "}\n\t" +
                "}\n",

            "Iso Grid Layout":
                "\tvar isoSize = 50,\n\t\t" +
                    "startX = width / 2,\n\t\t" +
                    "startY = 100;\n\n\t" +
        
                "isoGrid(0, 0, 30, 30);\n\t" +
                "isoGrid(1, 0, 30, 40);\n\t" +
                "isoGrid(0, 1, 30, 40);\n\t" +
                "isoGrid(1, 1, 30, 50);\n\n\t" +
        
                "function isoGrid(x, y, h, hue) {\n\t\t" +
                    "var xpos = startX + (x - y) * isoSize / 2,\n\t\t\t" +
                        "ypos = startY + (x + y) * isoSize / 4;\n\t\t" +     
                    "list.addIsobox({\n\t\t\t" +
                        "x: xpos,\n\t\t\t" +
                        "y: ypos,\n\t\t\t" +
                        "size: isoSize,\n\t\t\t" +
                        "h: h,\n\t\t\t" +
                        "colorTop: color.hsv(hue, 1, 1),\n\t\t\t" +
                        "colorRight: color.hsv(hue, 1, 0.75),\n\t\t\t" +
                        "colorLeft: color.hsv(hue, 1, 0.5),\n\t\t" +
                    "});\n\t" +
                "}"

        }
    };


    if(glcConfig.isStandalone) {
        loadCustomSnippets();
    }

    function loadCustomSnippets() {
        map.custom = {};
        var fs = nodeRequire("fs");
        var files = fs.readdirSync(__dirname + "/config/snippets");
        for(var i = 0; i < files.length; i++) {
            var fileName = files[i];
            var file = fs.readFileSync(__dirname + "/config/snippets/" + fileName);
            map.custom[fileName.split(".")[0]] = file.toString();
        }
    }

    function getObjectSnippets() {
        var result = [];
        for(var obj in map.objects) {
            result.push(obj);
        }
        result = result.sort();
        return result;
    }

    function getCustomSnippets() {
        var result = [];
        for(var obj in map.custom) {
            result.push(obj);
        }
        result = result.sort();
        return result;
    }

    function getSnippet(name) {
        var snippet = map.objects[name];
        if(!snippet) {
            snippet = map.custom[name];
        }
        return snippet;
    }

    return {
        getSnippet: getSnippet,
        getObjectSnippets: getObjectSnippets,
        getCustomSnippets: getCustomSnippets
    };


});