#!/bin/bash

if ! command -v mdbook
then
    source ./scripts/download-mdbook.sh
    alias mdbook=bin/mdbook
fi

mkdir -p .dist/web/

./bin/mdbook build ./content -d ../.dist/web/
./bin/mdbook build ./books/20-hours-to-golang -d ../../.dist/web/books/20-hours-to-golang
