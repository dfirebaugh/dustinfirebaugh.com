#!/bin/bash

if ! command -v mdbook
then
    source ./scripts/download-mdbook.sh
    alias mdbook=bin/mdbook
fi

# mdbook serve content/20-hours-to-golang -p 3333 --open
./bin/mdbook serve content -p 3333 --open
