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
            },

            // commands for testing electron app. Replace with path to electron install + path to src folder on local machine
            mac: {
                command: "/Users/keithpeters/Desktop/electron-v0.36.3-darwin-x64/Electron.app/Contents/MacOS/Electron /Users/keithpeters/Dropbox/Projects/gifloopcoder/gifloopcoder/src/"
            },
            pc: {
                command: "c:/Users/keith/Dropbox/projects/electron/glc-windows/GIFLoopCoder.exe c:/Users/keith/Dropbox/Projects/gifloopcoder/gifloopcoder/src/"
            },
            linux: {
                command: "~/Desktop/electron/electron ~/Dropbox/Projects/gifloopcoder/gifloopcoder/src/"
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
        }
    });

    grunt.registerTask("default", ["clean", "build", "docs"]);

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
        grunt.file.recurse("src/icons/", function(file, rootdir, subdir, filename) {
            grunt.file.copy(file, "app/icons/" + filename);
        });
        grunt.file.recurse("src/styles/", function(file, rootdir, subdir, filename) {
            grunt.file.copy(file, "app/styles/" + filename);
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

    grunt.registerTask("standalone", function() {
        grunt.task.run("requirejs");
        grunt.file.copy("app/glc-min.js", "standalone/glc-min.js");

        grunt.file.recurse("src/icons/", function(file, rootdir, subdir, filename) {
            grunt.file.copy(file, "standalone/icons/" + filename);
        });
        grunt.file.recurse("src/styles/", function(file, rootdir, subdir, filename) {
            grunt.file.copy(file, "standalone/styles/" + filename);
        });

        grunt.task.run("exec:electron");
    });

};
