define(function() {


    return {
        draw: function(context, t) {
            var x = this.getNumber("x", t, 100),
                y = this.getNumber("y", t, 100),
                radius = this.getNumber("radius", t, 60),
                h = this.getNumber("h", t, 40),
                colorLeft = this.getColor("colorLeft", t, "#999999"),
                colorRight = this.getColor("colorRight", t, "#cccccc"),
                colorTop = this.getColor("colorTop", t, "#eeeeee"),
                scaleX = this.getNumber("scaleX", t, 1),
                scaleY = this.getNumber("scaleY", t, 1);
                
            context.translate(x, y);
            context.scale(scaleX, scaleY);

            var gradient = context.createLinearGradient(-radius, 0, radius, 0);

            if(h >= 0) {
                gradient.addColorStop(0, colorLeft);
                gradient.addColorStop(1, colorRight);
                context.fillStyle = gradient;
                context.save();
                context.scale(1, 0.5);
                context.beginPath();
                context.arc(0, 0, radius, 0, Math.PI * 2);
                context.fill();
                context.restore();

                context.fillRect(-radius, -h, radius * 2, h);

                context.fillStyle = colorTop;
                context.save();
                context.translate(0, -h);
                context.scale(1, 0.5);
                context.beginPath();
                context.arc(0, 0, radius, 0, Math.PI * 2);
                context.fill();
                context.restore();
            }
            else {
                gradient.addColorStop(1, colorLeft);
                gradient.addColorStop(0 , colorRight);

                // clip path
                context.save();
                context.scale(1, 0.5);
                context.beginPath();
                context.arc(0, 0, radius, 0, Math.PI * 2);
                context.restore();
                context.clip();

                context.fillStyle = gradient;
                context.fillRect(-radius, -radius / 2, radius * 2, radius * 2);

                context.save();
                context.translate(0, -h);
                context.scale(1, 0.5);
                context.fillStyle = colorTop;
                context.beginPath();
                context.arc(0, 0, radius, 0, Math.PI * 2);
                context.fill();
                context.restore();
            }
        }
    }
});
