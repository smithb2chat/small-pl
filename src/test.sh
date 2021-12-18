#!/bin/bash

npm run gen:parser
echo "input -> $2"
nearley-test --start "$1" --input "$2" ./small.grammar.js