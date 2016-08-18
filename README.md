# gifloopcoder
HTML/JS Library/App for coding looping gif animations.

## Usage
See the [documentation](http://gifloopcoder.com/docs)

## Build
If you make any changes to the source code, you can run the app directly from `index_src.html` in the `src` directory, which will have your changes. 

To compile any changes into `glc-min.js` in the app directory, follow these steps.

### Install the build tools on your system:
- [node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- grunt-cli `npm install -g grunt-cli`

### optional:
- [pandoc](http://pandoc.org/) if you will be building documentation.
- [electron](http://electron.atom.io/) if you want to compile a standalone executable for your platform. You'll need to set the path to your electron install and project `src` path in `Gruntfile.js`

### Add project dependencies:
- `npm-install`

### Grunt commands:
- `grunt clean` deletes the `app` and `docs` directories.
- `grunt build` builds the app into the `app` directory.
- `grunt buildx` builds the app and launches it in the default browser.
- `grunt docs` builds all the docs into the `docs` directory.
- `grunt docsx` builds the docs and launches them in the default browser.
- `grunt` cleans and builds both the app and the docs
