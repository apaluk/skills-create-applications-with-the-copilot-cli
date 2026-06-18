#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 *
 * Supports the following basic arithmetic operations:
 *   - addition       (+)
 *   - subtraction    (-)
 *   - multiplication (*)
 *   - division       (/)
 *   - modulo         (%)
 *   - exponentiation (^)
 *   - square root    (sqrt)
 *
 * Usage: node calculator.js <number> <operator> <number>
 * Example: node calculator.js 10 + 5
 */

const readline = require("readline");

// The four supported operations
const operations = {
  /** Addition: returns the sum of a and b */
  "+": (a, b) => a + b,

  /** Subtraction: returns the difference of a and b */
  "-": (a, b) => a - b,

  /** Multiplication: returns the product of a and b */
  "*": (a, b) => a * b,

  /** Division: returns the quotient of a and b */
  "/": (a, b) => {
    if (b === 0) throw new Error("Division by zero is not allowed");
    return a / b;
  },

  /** Modulo: returns the remainder of a divided by b */
  "%": (a, b) => {
    if (b === 0) throw new Error("Modulo by zero is not allowed");
    return a % b;
  },

  /** Exponentiation: returns base raised to the exponent */
  "^": (a, b) => a ** b,
};

/**
 * Evaluates a single calculation.
 * @param {number} a - The first operand
 * @param {string} op - The operator (+, -, *, /, %, ^)
 * @param {number} b - The second operand
 * @returns {number} The result of the operation
 */
function calculate(a, op, b) {
  /* exported for unit testing */
  if (!operations[op]) {
    throw new Error(
      `Unsupported operator "${op}". Use one of: ${Object.keys(operations).join(", ")}`
    );
  }
  return operations[op](a, b);
}

/** Returns the remainder of a divided by b. */
function modulo(a, b) {
  if (b === 0) throw new Error("Modulo by zero is not allowed");
  return a % b;
}

/** Returns base raised to the power of exponent. */
function power(base, exponent) {
  return base ** exponent;
}

/** Returns the square root of n. Throws for negative input. */
function squareRoot(n) {
  if (n < 0) throw new Error("Square root of a negative number is not allowed");
  return Math.sqrt(n);
}

module.exports = { calculate, modulo, power, squareRoot };

// Only run CLI logic when executed directly (not when imported by tests)
if (require.main === module) {

// If arguments are passed directly, run once and exit
const args = process.argv.slice(2);
if (args.length === 2 && args[0] === "sqrt") {
  const n = parseFloat(args[1]);
  if (isNaN(n)) { console.error("Error: Operand must be a valid number."); process.exit(1); }
  try { console.log(`sqrt(${n}) = ${squareRoot(n)}`); } catch (err) { console.error(`Error: ${err.message}`); process.exit(1); }
  process.exit(0);
}

if (args.length === 3) {
  const a = parseFloat(args[0]);
  const op = args[1];
  const b = parseFloat(args[2]);

  if (isNaN(a) || isNaN(b)) {
    console.error("Error: Both operands must be valid numbers.");
    process.exit(1);
  }

  try {
    const result = calculate(a, op, b);
    console.log(`${a} ${op} ${b} = ${result}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
  process.exit(0);
}

// Interactive REPL mode
console.log("Node.js CLI Calculator");
console.log("Supported operations: + - * /  % (modulo)  ^ (power)  sqrt <n> (square root)");
console.log('Enter a calculation (e.g. 10 + 5, 2 ^ 8, sqrt 16) or type "exit" to quit.\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.prompt();

rl.on("line", (line) => {
  const input = line.trim();
  if (input === "exit" || input === "quit") {
    rl.close();
    return;
  }

  const parts = input.split(/\s+/);

  // Handle unary sqrt command
  if (parts.length === 2 && parts[0] === "sqrt") {
    const n = parseFloat(parts[1]);
    if (isNaN(n)) { console.log("Error: Operand must be a valid number."); rl.prompt(); return; }
    try { console.log(`= ${squareRoot(n)}`); } catch (err) { console.log(`Error: ${err.message}`); }
    rl.prompt();
    return;
  }

  if (parts.length !== 3) {
    console.log("Please enter a valid expression, e.g.: 10 + 5");
    rl.prompt();
    return;
  }

  const a = parseFloat(parts[0]);
  const op = parts[1];
  const b = parseFloat(parts[2]);

  if (isNaN(a) || isNaN(b)) {
    console.log("Error: Both operands must be valid numbers.");
    rl.prompt();
    return;
  }

  try {
    const result = calculate(a, op, b);
    console.log(`= ${result}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }

  rl.prompt();
});

rl.on("close", () => {
  console.log("Goodbye!");
  process.exit(0);
});

} // end require.main === module
