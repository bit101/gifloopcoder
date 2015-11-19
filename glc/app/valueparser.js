define(function() {

	return {

		getNumber: function(prop, t, def) {
			if(typeof(prop) === "number") {
				return prop;
			}
			else if(typeof(prop) === "function") {
				return prop(t);
			}
			else if(prop && prop.length === 2) {
				var start = prop[0],
				end = prop[1];
				return start + (end - start) * t;
			}
			else if(prop && prop.length) {
				return prop[Math.round(t * (prop.length - 1))];
			}
			return def;
		},


		getString: function(prop, t, def) {
			if(prop === undefined) {
				return def;
			}
			else if(typeof(prop) === "string") {
				return prop;
			}
			else if(typeof(prop) === "function") {
				return prop(t);
			}
			else if(prop && prop.length) {
				return prop[Math.round(t * (prop.length - 1))];
			}
			return prop;
		},

		getBool: function(prop, t, def) {
			if(prop === undefined) {
				return def;
			}
			else if(typeof(prop) === "function") {
				return prop(t);
			}
			else if(prop && prop.length) {
				return prop[Math.round(t * (prop.length - 1))];
			}
			return prop;
		},

		getArray: function(prop, t, def) {
			// string will have length, but is useless
			if(typeof(prop) === "string") {
				return def;
			}
			else if(typeof(prop) === "function") {
				return prop(t);
			}
			else if(prop && (prop.length == 2) && prop[0].length && prop[1].length) {
				// we seem to have an array of arrays
				var arr0 = prop[0],
					arr1 = prop[1],
					len = Math.min(arr0.length, arr1.length),
					result = [];

				for(var i = 0; i < len; i++) {
					var v0 = arr0[i],
						v1 = arr1[i];
					result.push(v0 + (v1 - v0) * t);
				}
				return result;

			}
			else if(prop && prop.length > 1) {
				return prop;
			}
			return def;
		},

		getObject: function(prop, t, def) {
			if(prop === undefined) {
				return def;
			}
			else if(typeof(prop) === "function") {
				return prop(t);
			}
			else if(prop && prop.length) {
				return prop[Math.round(t * (prop.length - 1))];
			}
			return prop;
		}

	
	}


	
});
