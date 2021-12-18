(function(){
function print(...args) { console.log(...args); }
function eq(a, b) { return a == b; }
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function each(it, cb) { return [].forEach.call(it, cb) }
function concat(...strs) { return "".concat(...strs); }
function split(str, sep) { return str.split(sep); }
function _if(cond, then, otherwise) { return cond ? then() : otherwise(); }

print("Hello, world");
print("3 + 5 =", add(3, 5));
var hello = subject => {
  print(concat("Hello, ", subject));
  print(concat("Hello, ", subject));
};
var doIt = () => print("Do it!");
var doIt = _0 => print("Do it!");
doIt();
// My Comment
hello("Brother");
var classmates = split("Jerry Jordan Johnny Jack Jeffery", " ");
each(classmates, peep => print(concat("Hello ", peep)));
var fib = n => _if(eq(n, 1), () => 1, () => _if(eq(n, 2), () => 1, () => add(fib(subtract(n, 1)), fib(subtract(n, 2)))));
print(fib(9));
})()