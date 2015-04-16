#!/bin/bash
echo Starting
gulp build
git checkout gh-pages
cp -r dist/* .
git add -A
git commit -m "Pages updated automatically"
git push origin gh-pages
echo Succesfully