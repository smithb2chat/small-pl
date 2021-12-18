const moo = require("moo");
const { drop } = require("ramda");

const lexer = moo.compile({
  number: {
    match: /[-+]?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][-+]?\d+)?/,
    value: Number,
  },
  string: {
    match: /"(?:\\[\\nrvtbf]|\\u[0-9a-fA-F]{4}|[^\n\\"])*"/,
    value: JSON.parse,
  },
  fat_arrow: "=>",
  assignment_operator: "=",
  identifier: /[a-zA-Z][\w']*/,
  lparen: "(",
  rparen: ")",
  lbrace: "{",
  rbrace: "}",
  placeholder: "_",
  comment: { match: /-- .*?$/, value: drop(3) },
  ws: / +/,
  NL: {
    match: /[\n\r]+/,
    lineBreaks: true,
  },
});

module.exports = lexer;
