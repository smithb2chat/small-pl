import nearley from "nearley";
import { Small } from "./types";

const smallGrammar = require("./small.grammar.js");

export function parseSmall(input: string): Small.AST[] {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(smallGrammar));
  parser.feed(input);
  return parser.results;
}
