#!/bin/bash

if ! command -v mdbook > /dev/null; then
    source ./scripts/download-mdbook.sh
    mdbook() {
        ./bin/mdbook "$@"
    }
fi

# mdbook serve content/20-hours-to-golang -p 3333 --open
mdbook serve content -p 3333 --open
