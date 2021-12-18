export namespace Small {
  export type AST = Statements;

  export type Statements = Statement[];

  export type Statement = VarAssigment | Expression | Comment;

  export type VarAssigment = {
    type: "var_assignment";
    name: string;
    start: TextPosition;
    end: TextPosition;
    value: Expression;
  };

  export type Expression =
    | Primitive
    | VarReference
    | FunctionLambda
    | FunctionCall;

  export type VarReference = {
    type: "var_reference";
    name: string;
    start: TextPosition;
    end: TextPosition;
  };

  export type FunctionLambda = {
    type: "function_lambda";
    args?: Arguments;
    block: Block;
  };

  export type FunctionCall = {
    type: "function_call";
    name: string;
    start: TextPosition;
    end: TextPosition;
    args?: Arguments;
  };

  export type Arguments = Argument[] | null;

  export type Argument = Expression | Placeholder;

  export type Placeholder = {
    type: "placeholder";
    start: TextPosition;
    end: TextPosition;
  };

  export type Block = Statements | Expression;

  export type Primitive =
    | {
        type: "number";
        value: number;
        start: TextPosition;
        end: TextPosition;
      }
    | {
        type: "string";
        value: string;
        start: TextPosition;
        end: TextPosition;
      };

  export type Comment = {
    type: "comment";
    text: string;
  };

  export type TextPosition = { line: number; col: number };
}
