@{% 
  const lexer = require("./lexer") 
  const R = require("ramda");
  for (let prop of Object.getOwnPropertyNames(R)) {
    global[prop] = R[prop];
  }
  const nil = always(undefined);

  const tokenStart = ({ line, col }) => ({
    line, col: col
  })

  const tokenEnd = ({ line, col, text }) => ({
    line, col: text.length
  })

  const mapToken = (token) => ({
    type: token.type, 
    value: token.value, 
    start: tokenStart(token),
    end: tokenEnd(token)
  })

  const mapTokenId = pipe(nth(0), mapToken)
%}

@lexer lexer

small -> _ statements _ {% nth(1) %}

statements 
  -> statement __ statements  {% pipe(props([0, 2]), unnest) %}
   | statement                 {% id %}

statement
  -> var_assignment     {% id %}
   | expression         {% id %}
   | comment            {% id %}

var_assignment
  -> identifier __ assignment_operator __ expression {% 
      ([identifier,,,,expression]) => ({ 
        type: "var_assignment",
        name: identifier.name,
        start: identifier.start,
        end: identifier.end,
        value: expression,
      }) 
     %}

expression
  -> primitive        {% id %}
   | var_reference    {% id %}
   | function_lambda  {% id %}
   | function_call    {% id %}

function_lambda
  -> lparen _ arguments:? _ rparen _ fat_arrow _ block {% 
      ([,,args,,,,,,block]) => ({
        type: "function_lambda",
        args,
        block
      })
   %}
   | argument _ fat_arrow _ block {% 
      ([arg,,,,block]) => ({
        type: "function_lambda",
        args: [arg],
        block,
      })
   %}

function_call
  -> var_reference lparen _ arguments:? _ rparen {% 
      ([var_reference,,,args]) => ({
        type: "function_call",
        name: var_reference.name,
        start: var_reference.start,
        end: var_reference.end,
        args
      })
     %}

arguments
  -> argument __ arguments {% pipe(props([0, 2]), unnest) %}
   | argument               

argument
  -> expression   {% id %}
   | placeholder  {% id %}

block
  -> lbrace _ statements _ rbrace {% nth(2) %}
   | expression {% id %}

primitive
  -> number {% id %}
   | string {% id %}

number -> %number {% mapTokenId %}

string -> %string {% mapTokenId %}

identifier 
  -> %identifier {% 
    pipe(mapTokenId, ({ type, value, start, end }) => ({
      type, 
      name: value, 
      start, 
      end
    })) 
  %}

var_reference 
  -> identifier {% 
    ([{ name, start, end }]) => ({
      type: "var_reference",
      name,
      start, 
      end
    })
  %}

assignment_operator -> %assignment_operator {% id %}

fat_arrow -> %fat_arrow {% id %}

lparen -> %lparen {% mapTokenId %}

rparen -> %rparen {% mapTokenId %}

lbrace -> %lbrace {% id %}

rbrace -> %rbrace {% id %}

placeholder 
  -> %placeholder {% 
    pipe(mapTokenId, omit(['value'])) 
  %}

comment 
  -> %comment {% 
    pipe(mapTokenId, ({ type, value, start, end }) => ({
      type, 
      text: value, 
      start, 
      end
    }))
  %}

NL -> %NL {% id %}

ws -> %ws {% id %}

_ -> %ws _ {% nil %}
   | %NL _ {% nil %}
   | null  {% nil %}

__ -> %ws __  {% nil %}
    | %NL __  {% nil %}
    | %ws     {% nil %}
    | %NL     {% nil %}