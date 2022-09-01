#!/bin/bash


if ! command -v mdbok
then
    source ./scripts/download-mdbook.sh
    alias mdbook=bin/mdbook
fi

mkdir -p .dist/

mdbook build ./content -d ../.dist/

GIT_REPO_URL=$(git config --get remote.origin.url)

cd .dist
git init .
git remote add github $GIT_REPO_URL
git checkout -b gh-pages
git add .
git commit -am "gh-pages deploy"
git push github gh-pages --force
cd ../
