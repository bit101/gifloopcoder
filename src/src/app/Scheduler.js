define(function() {

	var t = 0,
		duration = 2,
		fps = 30,
		running = false,
		stopping = false,
		looping = false,
		listener = null,
		renderList = null

	function init(pListener) {
		listener = pListener;
	}

	function render() {
		if(running && !stopping) {
			listener.onRender(t);
		    advance();
			setTimeout(onTimeout, 1000 / fps);
		}
		else {
			running = false;
			looping = false;
			stopping = false;
	    	listener.onComplete();
	   	}
	}

	function onTimeout() {
		requestAnimationFrame(render);
	}

	function advance() {
		var numFrames = duration * fps,
			speed = 1 / numFrames; 
		t += speed;
	    if(Math.round(t * 10000) / 10000 >= 1) {
	    	if(looping) {
	    		t -= 1;
	    	}
	    	else {
		    	t = 0;
		    	stop();
		    }
	    }
	}

	function loop() {
		if(!running) {
			listener.onStart();
			t = 0;
			stopping = false;
			looping = true;
			running = true;
			render();
		}
	}

	function stop() {
		if(running) {
			stopping = true;
			t = 0;
		}
	}

	function playOnce() {
		if(!running) {
			listener.onStart();
			t = 0;
			looping = false;
			running = true;
			render();		
		}
	}

	function isRunning() {
		return running;
	}

	function setDuration(value) {
		duration = value;
	}

	function getDuration() {
		return duration;
	}

	function setFPS(value) {
		fps = value;
	}

	function getFPS() {
		return fps;
	}


	return {
		init: init,
		loop: loop,
		playOnce: playOnce,
		stop: stop,
		isRunning: isRunning,
		setDuration: setDuration,
		getDuration: getDuration,
		setFPS: setFPS,
		getFPS: getFPS
	};

});
