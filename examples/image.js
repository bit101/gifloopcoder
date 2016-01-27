function onGLC(glc) {
    glc.loop();
    glc.size(200, 200);
//     glc.setDuration(5);
//     glc.setFPS(20);
//     glc.setMode('single');
//     glc.setEasing(false);
    var list = glc.renderList,
        width = glc.w,
        height = glc.h,
        color = glc.color;
    

    list.addImage({
		x: width / 2,
		y: height / 2,
        url: "https://33.media.tumblr.com/avatar_a2db05b379e3_128.png",
        rotation: [-45, 45],

	});
	
}
