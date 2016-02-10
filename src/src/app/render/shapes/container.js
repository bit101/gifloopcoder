define(function() {

    return {
        draw: function(context, t) {
            var x = this.getNumber("x", t, 0),
                y = this.getNumber("y", t, 0),
                scaleX = this.getNumber("scaleX", t, 1),
                scaleY = this.getNumber("scaleY", t, 1);

            context.translate(x, y);
            context.scale(scaleX, scaleY);
            context.rotate(this.getNumber("rotation", t, 0) * Math.PI / 180);
        }
    }
});
