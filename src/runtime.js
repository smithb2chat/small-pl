function print(...args) { console.log(...args); }
function eq(a, b) { return a == b; }
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function each(it, cb) { return [].forEach.call(it, cb) }
function concat(...strs) { return "".concat(...strs); }
function split(str, sep) { return str.split(sep); }
function _if(cond, then, otherwise) { return cond ? then() : otherwise(); }
