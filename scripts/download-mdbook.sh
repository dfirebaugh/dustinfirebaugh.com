#!/bin/bash

if [ ! -f bin/mdbook ]
then
    echo "downloading mdbook"
    curl -sSL https://github.com/rust-lang/mdBook/releases/download/v0.4.21/mdbook-v0.4.21-x86_64-unknown-linux-gnu.tar.gz
else
    echo "bin/mdbook already exists"
fi
