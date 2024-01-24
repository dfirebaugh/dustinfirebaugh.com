#!/bin/bash

source ./scripts/build.sh

GIT_REPO_URL=$(git config --get remote.origin.url)

cd .dist/web/
git init .
git remote add github $GIT_REPO_URL
git checkout -b gh-pages
git add .
git commit -am "gh-pages deploy"
git push github gh-pages --force
cd ../..
