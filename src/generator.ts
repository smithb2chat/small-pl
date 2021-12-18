import fs from "fs/promises";
import path from "path";
import { Small } from "./types";

export async function generateJavaScript(ast: Small.AST): Promise<string> {
  const lib = await runtime_lib();

  return `(function(){
${lib}
${statements(ast)}
})()`;
}

async function runtime_lib() {
  const { dir } = path.parse(process.argv[1]);
  return await fs.readFile(`${dir}/runtime.js`);
}

const createIndenter = () => {
  let level = -1;
  const indent = (text: string) => "  ".repeat(Math.max(0, level)).concat(text);
  indent.inc = () => ++level;
  indent.dec = () => --level;
  indent.block = (text: string) => {
    indent.inc();
    text = indent(text);
    indent.dec();
    return text;
  };

  return indent;
};

const indent = createIndenter();

function statements(token: Small.Statements) {
  indent.inc();
  const st = token.map(statement).map(indent).join("\n");
  indent.dec();
  return st;
}

function statement(token: Small.Statement) {
  switch (token.type) {
    case "var_assignment":
      return `${var_assignment(token)};`;
    case "comment":
      return comment(token);
    default:
      return `${expression(token)};`;
  }
}

function var_assignment(token: Small.VarAssigment) {
  return `var ${token.name} = ${expression(token.value)}`;
}

function var_reference(token: Small.VarReference) {
  return `${token.name}`;
}

function expression(token: Small.Expression) {
  switch (token.type) {
    case "function_call":
      return function_call(token);
    case "function_lambda":
      return function_lambda(token);
    case "var_reference":
      return var_reference(token);
    default:
      return primitive(token);
  }
}

function function_lambda(token: Small.FunctionLambda): string {
  let argumentList: string;
  if ((token.args || 0) === 0) argumentList = "()";
  else if (token.args?.length === 1) argumentList = expand_args(token.args);
  else argumentList = `(${expand_args(token.args!)})`;

  return `${argumentList} => ${block(token.block)}`;
}

function function_call(token: Small.FunctionCall) {
  const name = token.name === "if" ? "_if" : token.name;

  return `${name}(${expand_args(token.args)})`;
}

function expand_args(token?: Small.Arguments): string {
  return (token || [])
    ?.map((arg, n) => {
      if (arg.type === "placeholder") return placeholder(n);
      return expression(arg);
    })
    .join(", ");
}

function block(token: Small.Block) {
  if (Array.isArray(token)) {
    return `{\n${statements(token)}\n${indent("}")}`;
  }
  return expression(token);
}

function placeholder(n: number) {
  return `_${n}`;
}

function primitive(token: Small.Primitive) {
  switch (token.type) {
    case "number":
      return token.value.toString();
    case "string":
      return JSON.stringify(token.value);
  }
}

function comment(token: Small.Comment) {
  return `// ${token.text}`;
}
