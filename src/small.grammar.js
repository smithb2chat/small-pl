// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
 
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
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "small", "symbols": ["_", "statements", "_"], "postprocess": nth(1)},
    {"name": "statements", "symbols": ["statement", "__", "statements"], "postprocess": pipe(props([0, 2]), unnest)},
    {"name": "statements", "symbols": ["statement"], "postprocess": id},
    {"name": "statement", "symbols": ["var_assignment"], "postprocess": id},
    {"name": "statement", "symbols": ["expression"], "postprocess": id},
    {"name": "statement", "symbols": ["comment"], "postprocess": id},
    {"name": "var_assignment", "symbols": ["identifier", "__", "assignment_operator", "__", "expression"], "postprocess":  
        ([identifier,,,,expression]) => ({ 
          type: "var_assignment",
          name: identifier.name,
          start: identifier.start,
          end: identifier.end,
          value: expression,
        }) 
             },
    {"name": "expression", "symbols": ["primitive"], "postprocess": id},
    {"name": "expression", "symbols": ["var_reference"], "postprocess": id},
    {"name": "expression", "symbols": ["function_lambda"], "postprocess": id},
    {"name": "expression", "symbols": ["function_call"], "postprocess": id},
    {"name": "function_lambda$ebnf$1", "symbols": ["arguments"], "postprocess": id},
    {"name": "function_lambda$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "function_lambda", "symbols": ["lparen", "_", "function_lambda$ebnf$1", "_", "rparen", "_", "fat_arrow", "_", "block"], "postprocess":  
        ([,,args,,,,,,block]) => ({
          type: "function_lambda",
          args,
          block
        })
           },
    {"name": "function_lambda", "symbols": ["argument", "_", "fat_arrow", "_", "block"], "postprocess":  
        ([arg,,,,block]) => ({
          type: "function_lambda",
          args: [arg],
          block,
        })
           },
    {"name": "function_call$ebnf$1", "symbols": ["arguments"], "postprocess": id},
    {"name": "function_call$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "function_call", "symbols": ["var_reference", "lparen", "_", "function_call$ebnf$1", "_", "rparen"], "postprocess":  
        ([var_reference,,,args]) => ({
          type: "function_call",
          name: var_reference.name,
          start: var_reference.start,
          end: var_reference.end,
          args
        })
             },
    {"name": "arguments", "symbols": ["argument", "__", "arguments"], "postprocess": pipe(props([0, 2]), unnest)},
    {"name": "arguments", "symbols": ["argument"]},
    {"name": "argument", "symbols": ["expression"], "postprocess": id},
    {"name": "argument", "symbols": ["placeholder"], "postprocess": id},
    {"name": "block", "symbols": ["lbrace", "_", "statements", "_", "rbrace"], "postprocess": nth(2)},
    {"name": "block", "symbols": ["expression"], "postprocess": id},
    {"name": "primitive", "symbols": ["number"], "postprocess": id},
    {"name": "primitive", "symbols": ["string"], "postprocess": id},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": mapTokenId},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": mapTokenId},
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess":  
        pipe(mapTokenId, ({ type, value, start, end }) => ({
          type, 
          name: value, 
          start, 
          end
        })) 
          },
    {"name": "var_reference", "symbols": ["identifier"], "postprocess":  
        ([{ name, start, end }]) => ({
          type: "var_reference",
          name,
          start, 
          end
        })
          },
    {"name": "assignment_operator", "symbols": [(lexer.has("assignment_operator") ? {type: "assignment_operator"} : assignment_operator)], "postprocess": id},
    {"name": "fat_arrow", "symbols": [(lexer.has("fat_arrow") ? {type: "fat_arrow"} : fat_arrow)], "postprocess": id},
    {"name": "lparen", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen)], "postprocess": mapTokenId},
    {"name": "rparen", "symbols": [(lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": mapTokenId},
    {"name": "lbrace", "symbols": [(lexer.has("lbrace") ? {type: "lbrace"} : lbrace)], "postprocess": id},
    {"name": "rbrace", "symbols": [(lexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess": id},
    {"name": "placeholder", "symbols": [(lexer.has("placeholder") ? {type: "placeholder"} : placeholder)], "postprocess":  
        pipe(mapTokenId, omit(['value'])) 
          },
    {"name": "comment", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess":  
        pipe(mapTokenId, ({ type, value, start, end }) => ({
          type, 
          text: value, 
          start, 
          end
        }))
          },
    {"name": "NL", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": id},
    {"name": "ws", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "_", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws), "_"], "postprocess": nil},
    {"name": "_", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL), "_"], "postprocess": nil},
    {"name": "_", "symbols": [], "postprocess": nil},
    {"name": "__", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws), "__"], "postprocess": nil},
    {"name": "__", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL), "__"], "postprocess": nil},
    {"name": "__", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": nil},
    {"name": "__", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": nil}
]
  , ParserStart: "small"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
