#!/bin/bash
VERSION=$1

if [ ! $VERSION ]; then
	echo "Usage: sh $0 <version>"
	exit 1;
fi

echo "Update bower-form-builder version to v$VERSION"
gulp build

if [ -d bower-form-builder/ ]; then
	echo "bower-form-builder directory found."
	cd bower-form-builder
	git pull origin master
	echo "Repository pulled from source."
else
	echo "bower-form-builder directory not found."
	git clone https://github.com/shelfi/bower-form-builder
	echo "Repository cloned from source."
	cd bower-form-builder
fi

cp ../dist/shelfi-form-builder.js shelfi-form-builder.js
cp ../dist/shelfi-form-builder.min.js shelfi-form-builder.min.js

git add -A
git commit -m "Release v$VERSION"
git tag "v$VERSION"
git push origin master

#bower register shelfi-form-builder git://github.com/shelfi/bower-form-builder.git
echo "Succesfully"