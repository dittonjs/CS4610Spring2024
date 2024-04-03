import wasmModule from "./composeApp.mjs"

function fib(n) {
    if (n == 1) return 1;
    if (n == 2) return 2;
    return fib(n-1) + fib(n-2);
}

console.time("fibjs")
fib(47)
console.timeEnd("fibjs")
console.time("fibwasm")
wasmModule.fib(47)
console.timeEnd("fibwasm")

console.log(wasmModule.doMath(10,4));