import assert from "assert";
import generatePassword from "../src/index.js";

const pass = generatePassword({ length: 16 });
assert.strictEqual(pass.length, 16);
console.log("✅ Length Test Passed");

const noSymbols = generatePassword({ length: 12, symbols: false });
assert.ok(!/[!@#$%^&*]/.test(noSymbols));
console.log("✅ Symbols Exclusion Test Passed");
