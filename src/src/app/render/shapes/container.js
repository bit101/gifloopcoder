define(function() {

    return {
        draw: function(context, t) {
            var x = this.getNumber("x", t, 0),
                y = this.getNumber("y", t, 0);

            context.translate(x, y);
            context.rotate(this.getNumber("rotation", t, 0) * Math.PI / 180);
        }
    }
});
