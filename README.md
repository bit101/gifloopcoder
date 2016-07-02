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

### optional:
- [pandoc](http://pandoc.org/) if you will be building documentation.
- [electron](http://electron.atom.io/) if you want to compile a standalone executable for your platform. You'll need to set the path to your electron install and project `src` path in `Gruntfile.js`

### Add project dependencies:
- `npm-install`

### Build commands:
- `npm run clean` deletes the `app` and `docs` directories.
- `npm run build` builds the app into the `app` directory.
- `npm run buildx` or `npm start` builds the app and launches it in the default browser.
- `npm run docs` builds all the docs into the `docs` directory.
- `npm run docsx` builds the docs and launches them in the default browser.
- `npm run default` cleans and builds both the app and the docs.
