# gifloopcoder
HTML/JS Library/App for coding looping gif animations.

## Usage
See the [documentation](http://gifloopcoder.com/docs)

## Build
If you make any changes to the source code, you can run the app directly from `index_src.html` in the `src` directory, which will have your changes. 

To compile any changes into `glc-min.js` in the app directory, follow these steps.

### Install the build tools on your system:
- [npm](https://www.npmjs.com/)
- grunt-cli `npm install -g grunt-cli`
- [Pandoc](http://pandoc.org/) if you will be building documentation.

### Add project dependencies:
- `npm-install`

### Grunt commands:
- `grunt clean` deletes the `app` and `docs` directories.
- `grunt build` builds the app into the `app` directory.
- `grunt docs` builds all the docs into the `docs` directory.
- `grunt` cleans and builds both the app and the docs
- `grunt build_launch` builds the app and launches it in the default browser.
- `grunt docs_launch` builds the docs and launches them in the default browser.