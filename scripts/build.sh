#!/bin/bash

if ! command -v mdbook > /dev/null; then
    source ./scripts/download-mdbook.sh
    mdbook() {
        ./bin/mdbook "$@"
    }
fi

mkdir -p .dist/web/

mdbook build ./content -d ../.dist/web/
mdbook build ./books/20-hours-to-golang -d ../../.dist/web/books/20-hours-to-golang
