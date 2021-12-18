# Small Lang

This is my solution to proposal language challenge:
https://github.com/airportyh/smallang

Thanks a lot to Sr **[Toby Ho](https://tobyho.com/index.html)** for your awesome videos about compilers. 😁

# Usage

First run `$ npm install` inside of `/small-pl` dir.

And compile your `small` source code.

```bash
# transpile small to js
$ npm run transpile example/example.small
# execute the result
$ node example/example.js
```

# TODO

- [x] parser

  - [x] define moo lexer
    - [x] number literal
    - [x] string literal
    - [x] assignment operator
    - [x] identifier
    - [x] parans
    - [x] braces
    - [x] fat arrow
    - [x] whitespace
    - [x] newline
    - [x] new: placeholder
  - [x] make a parse.js that creates .ast files
  - [x] variable assignment
  - [x] function call
  - [x] multiple lines
  - [x] lambda function
  - [x] comments

- [x] generator

  - [x] make a generate.js that creates .js files
  - [x] variable assignment
  - [x] function call
  - [x] runtime functions
  - [x] lambda function
  - [x] comments

- [] code challenges
