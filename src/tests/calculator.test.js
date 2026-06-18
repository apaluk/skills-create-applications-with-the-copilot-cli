/**
 * Unit tests for calculator.js
 *
 * Covers all four basic arithmetic operations:
 *   - addition       (+)
 *   - subtraction    (-)
 *   - multiplication (*)
 *   - division       (/)
 *
 * Also tests edge cases such as division by zero and invalid operators.
 */

const { calculate } = require("../calculator");

// ---------------------------------------------------------------------------
// Addition (+)
// ---------------------------------------------------------------------------
describe("Addition (+)", () => {
  test("2 + 3 = 5 (from image example)", () => {
    expect(calculate(2, "+", 3)).toBe(5);
  });

  test("0 + 0 = 0", () => {
    expect(calculate(0, "+", 0)).toBe(0);
  });

  test("negative numbers: -4 + 10 = 6", () => {
    expect(calculate(-4, "+", 10)).toBe(6);
  });

  test("both negative: -3 + -7 = -10", () => {
    expect(calculate(-3, "+", -7)).toBe(-10);
  });

  test("decimals: 1.5 + 2.5 = 4", () => {
    expect(calculate(1.5, "+", 2.5)).toBe(4);
  });

  test("large numbers: 1000000 + 999999 = 1999999", () => {
    expect(calculate(1000000, "+", 999999)).toBe(1999999);
  });
});

// ---------------------------------------------------------------------------
// Subtraction (-)
// ---------------------------------------------------------------------------
describe("Subtraction (-)", () => {
  test("10 - 4 = 6 (from image example)", () => {
    expect(calculate(10, "-", 4)).toBe(6);
  });

  test("0 - 0 = 0", () => {
    expect(calculate(0, "-", 0)).toBe(0);
  });

  test("result is negative: 3 - 10 = -7", () => {
    expect(calculate(3, "-", 10)).toBe(-7);
  });

  test("both negative: -5 - -3 = -2", () => {
    expect(calculate(-5, "-", -3)).toBe(-2);
  });

  test("decimals: 5.5 - 2.5 = 3", () => {
    expect(calculate(5.5, "-", 2.5)).toBe(3);
  });

  test("large numbers: 1000000 - 1 = 999999", () => {
    expect(calculate(1000000, "-", 1)).toBe(999999);
  });
});

// ---------------------------------------------------------------------------
// Multiplication (*)
// ---------------------------------------------------------------------------
describe("Multiplication (*)", () => {
  test("45 * 2 = 90 (from image example)", () => {
    expect(calculate(45, "*", 2)).toBe(90);
  });

  test("multiply by zero: 99 * 0 = 0", () => {
    expect(calculate(99, "*", 0)).toBe(0);
  });

  test("multiply by one: 7 * 1 = 7", () => {
    expect(calculate(7, "*", 1)).toBe(7);
  });

  test("both negative: -3 * -4 = 12", () => {
    expect(calculate(-3, "*", -4)).toBe(12);
  });

  test("mixed sign: -6 * 5 = -30", () => {
    expect(calculate(-6, "*", 5)).toBe(-30);
  });

  test("decimals: 2.5 * 4 = 10", () => {
    expect(calculate(2.5, "*", 4)).toBe(10);
  });
});

// ---------------------------------------------------------------------------
// Division (/)
// ---------------------------------------------------------------------------
describe("Division (/)", () => {
  test("20 / 5 = 4 (from image example)", () => {
    expect(calculate(20, "/", 5)).toBe(4);
  });

  test("0 divided by a number: 0 / 7 = 0", () => {
    expect(calculate(0, "/", 7)).toBe(0);
  });

  test("divides to a decimal: 7 / 2 = 3.5", () => {
    expect(calculate(7, "/", 2)).toBe(3.5);
  });

  test("negative dividend: -10 / 2 = -5", () => {
    expect(calculate(-10, "/", 2)).toBe(-5);
  });

  test("both negative: -9 / -3 = 3", () => {
    expect(calculate(-9, "/", -3)).toBe(3);
  });

  test("large numbers: 1000000 / 1000 = 1000", () => {
    expect(calculate(1000000, "/", 1000)).toBe(1000);
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------
describe("Edge cases", () => {
  test("division by zero throws an error", () => {
    expect(() => calculate(10, "/", 0)).toThrow("Division by zero is not allowed");
  });

  test("unsupported operator throws an error", () => {
    expect(() => calculate(5, "%", 3)).toThrow(/Unsupported operator/);
  });

  test("empty string operator throws an error", () => {
    expect(() => calculate(5, "", 3)).toThrow(/Unsupported operator/);
  });
});
