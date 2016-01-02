#! /bin/bash
r.js -o build.js
cp glc-min.js ../app/

rm -rf ../docs
mkdir ../docs

pandoc docs/index.md -f markdown -t html5 -s -o ../docs/index.html -H docs/main.css
pandoc docs/intro.md -f markdown -t html5 -s -o ../docs/intro.html -H docs/main.css
pandoc docs/objects.md -f markdown -t html5 -s -o ../docs/objects.html -H docs/main.css
pandoc docs/properties.md -f markdown -t html5 -s -o ../docs/properties.html -H docs/main.css
pandoc docs/styles.md -f markdown -t html5 -s -o ../docs/styles.html -H docs/main.css
pandoc docs/tips.md -f markdown -t html5 -s -o ../docs/tips.html -H docs/main.css

cp -R docs/images ../docs/
