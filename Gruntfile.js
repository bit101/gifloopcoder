module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-open");

    grunt.config.init({
        exec: {
            make_docs: {
                command: [
                    "pandoc src/docs/index.md -f markdown -t html5 -s -o docs/index.html -H src/docs/main.css",
                    "pandoc src/docs/intro.md -f markdown -t html5 -s -o docs/intro.html -H src/docs/main.css",
                    "pandoc src/docs/objects.md -f markdown -t html5 -s -o docs/objects.html -H src/docs/main.css",
                    "pandoc src/docs/properties.md -f markdown -t html5 -s -o docs/properties.html -H src/docs/main.css",
                    "pandoc src/docs/styles.md -f markdown -t html5 -s -o docs/styles.html -H src/docs/main.css",
                    "pandoc src/docs/tips.md -f markdown -t html5 -s -o docs/tips.html -H src/docs/main.css"
                ].join(" && ")
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: "src/src",
                    paths: {
                        requireLib: "libs/require"
                    },
                    include: "requireLib",
                    name: "glclauncher",
                    out: "app/glc-min.js"
                    // out: "../../electron/glc-windows/resources/app/glc-min.js"
                    // out: "../../electron/glc-linux/resources/app/glc-min.js"
                    // out: "../../electron/glc-osx/GIFLoopCoder.app/Contents/resources/app/glc-min.js"
                }
            }
        },

        open: {
            dev: {
                path: "src/index_src.html"
            },
            build: {
                path: "app/index.html"
            },
            docs: {
                path: "docs/index.html"
            }
        },
        
        standalone: {
            windows: "../../electron/glc-windows/resources/app/",
            linux: "../../electron/glc-linux/resources/app/",
            osx: "../../electron/glc-osx/GIFLoopCoder.app/Contents/resources/app/"
        }
    });

    grunt.registerTask("default", ["clean", "build"]);

    grunt.registerTask("buildx", ["build", "open:build"]);
    grunt.registerTask("docsx", ["docs", "open:docs"]);

    grunt.registerTask("clean", function() {
        if(grunt.file.exists("app")) {
            grunt.file.delete("app");
        }        
        if(grunt.file.exists("docs")) {
            grunt.file.delete("docs");
        }        
    });

    grunt.registerTask("build", function() {
        grunt.task.run("requirejs");
        
        grunt.file.copy("src/index.html", "app/index.html");
        grunt.file.copy("src/index_standalone.html", "app/index_standalone.html");
        grunt.file.copy("src/standalone.js", "app/standalone.js");
        grunt.file.copy("src/package.json", "app/package.json");
        grunt.file.recurse("src/icons/", function(file, rootdir, subdir, filename) {
            grunt.file.copy(file, "app/icons/" + filename);
        });
        grunt.file.recurse("src/styles/", function(file, rootdir, subdir, filename) {
            grunt.file.copy(file, "app/styles/" + filename);
        });

        grunt.file.copy("src/config/template.js", "app/config/template.js");
        grunt.file.recurse("src/config/snippets/", function(file, rootdir, subdir, filename) {
            grunt.file.copy(file, "app/config/snippets/" + filename);
        });

    });

    grunt.registerTask("docs", function() {
        grunt.file.mkdir("docs/images");
        grunt.file.recurse("src/docs/images/", function(file, rootdir, subdir, filename) {
            grunt.file.copy(file, "docs/images/" + filename);
        });
        grunt.file.copy("src/docs/GLCCheatSheet.pdf", "docs/GLCCheatSheet.pdf");
        grunt.task.run("exec:make_docs");
    });


    grunt.registerMultiTask("standalone", function() {
        console.log("copying files to " + this.data);
        var path = this.data;
        if(grunt.file.exists(path)) {
            grunt.file.delete(path, {force: true});
        }
        grunt.file.copy("app/glc-min.js", path + "glc-min.js");
        grunt.file.copy("app/index_standalone.html", path + "index_standalone.html");
        grunt.file.copy("app/standalone.js", path + "standalone.js");
        grunt.file.copy("app/package.json", path + "package.json");
        grunt.file.recurse("app/icons/", function(file, rootdir, subdir, filename) {
            grunt.file.copy(file, path + "icons/" + filename);
        });
        grunt.file.recurse("app/styles/", function(file, rootdir, subdir, filename) {
            grunt.file.copy(file, path + "styles/" + filename);
        });

        grunt.file.copy("app/config/template.js", path + "config/template.js");
        grunt.file.recurse("app/config/snippets/", function(file, rootdir, subdir, filename) {
            grunt.file.copy(file, path + "config/snippets/" + filename);
        });

    });
};
