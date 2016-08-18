define({

    createElement: function(element, className, parent, style) {
        var el = document.createElement(element);
        if(className) {
            el.className = className;
        }
        if(parent) {
            parent.appendChild(el);
        }
        if(style) {
            for(var prop in style) {
                el.style[prop] = style[prop];
            }
        }
        return el;
    },

    createDiv: function(className, parent, style) {
        return this.createElement("div", className, parent, style);
    },

    createImage: function(className, parent, style) {
        return this.createElement("img", className, parent, style);
    },

    createInput: function(type, className, parent, style, event, handler) {
        var input = this.createElement("input", className, parent, style);
        input.type = type;
        input.addEventListener(event, handler);
        return input;
    },

    createCanvas: function(className, parent, style) {
        return this.createElement("canvas", className, parent, style);
    },

    createScript: function(id, code, parent) {
        var script = this.createElement("script", null, null);
        if(code) {
            script.textContent = code;
        }
        if(parent) {
            parent.appendChild(script);
        }
        return script;
    },

    createSelect: function(className, parent, style, options, handler) {
        var select = this.createElement("select", className, parent, style);
        if(options) {
            for(var i = 0; i < options.length; i++) {
                select.add(new Option(options[i]));
            }
        }
        select.addEventListener("change", handler);
        return select;
    },

    createCheckbox: function(className, labelText, parent, style, handler) {
        var label = this.createElement("label", className, parent, style);
        label.textContent = labelText;
        var checkbox = this.createInput("checkbox", className, null, style, "change", handler);
        label.insertBefore(checkbox, label.firstChild);
        return checkbox;
    },

    createSpan: function(className, text, parent, style) {
        var span = this.createElement("span", className, parent, style);
        if(text) {
            span.innerHTML = text;
        }
    }


});