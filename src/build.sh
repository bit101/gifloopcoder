#! /bin/bash
r.js -o build.js
cp glc-min.js ../app/

rm -rf ../app/docs
mkdir ../app/docs

pandoc docs/index.md -f markdown -t html5 -s -o ../app/docs/index.html -H docs/main.css
pandoc docs/intro.md -f markdown -t html5 -s -o ../app/docs/intro.html -H docs/main.css
pandoc docs/objects.md -f markdown -t html5 -s -o ../app/docs/objects.html -H docs/main.css
pandoc docs/properties.md -f markdown -t html5 -s -o ../app/docs/properties.html -H docs/main.css
pandoc docs/styles.md -f markdown -t html5 -s -o ../app/docs/styles.html -H docs/main.css
pandoc docs/tips.md -f markdown -t html5 -s -o ../app/docs/tips.html -H docs/main.css

cp docs/images ../app/docs/ -r