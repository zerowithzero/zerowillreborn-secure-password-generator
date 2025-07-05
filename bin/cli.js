#!/usr/bin/env node

/**
 * Secure Password Generator CLI
 *
 * This module provides a command-line interface for generating secure passwords
 * with customizable options including length, symbol inclusion, and readability.
 *
 * @author Achal Chaudhary
 * @version 1.0.0
 * @license MIT
 */

import { Command } from "commander";
import chalk from "chalk";
import generatePassword from "../src/index.js";
import clipboard from "clipboardy";
import figlet from "figlet";
import gradient from "gradient-string";

// Initialize the command-line interface using Commander.js
const program = new Command();

// Logo
console.log(
  gradient.pastel.multiline(
    figlet.textSync("SecurePass", {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  )
);

// Configure the CLI program with name, description, and available options
program
  .name("secure-pass")
  .description("Generate secure passwords via CLI with customizable options")
  .version("1.0.0")
  .option("-l, --length <number>", "Length of the password (1-1000)", "12")
  .option("-s, --symbols", "Include special symbols (!@#$%^&* etc.)", false)
  .option(
    "-r, --readable",
    "Exclude confusing characters (O, 0, I, l, 1, |)",
    false
  )
  .option(
    "-v, --verbose",
    "Show detailed information about the generated password",
    false
  )
  .parse(process.argv);

// Extract command-line options
const options = program.opts();

/**
 * Main CLI execution function
 * Generates a password based on user-provided options and displays the result
 */
function main() {
  try {
    // Validate and parse the length option
    const length = parseInt(options.length);
    if (isNaN(length) || length < 1 || length > 1000) {
      console.error(
        chalk.red("❌ Error: Length must be a number between 1 and 1000")
      );
      process.exit(1);
    }

    // Generate password using the core password generation function
    const password = generatePassword({
      length: length,
      symbols: options.symbols,
      readable: options.readable,
    });

    // Display the generated password with appropriate formatting
    displayPassword(password, options);
  } catch (error) {
    // Handle any errors that occur during password generation
    console.error(chalk.red("❌ Error generating password:"));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

/**
 * Displays the generated password with optional verbose information
 *
 * @param {string} password - The generated password to display
 * @param {Object} options - CLI options including verbose flag
 */
function displayPassword(password, options) {
  // Show success message
  console.log(chalk.green("✅ Generated Password:"));

  // Display the password in bold for better visibility
  console.log(chalk.bold(password));

  // Show additional information if verbose mode is enabled
  if (options.verbose) {
    console.log(chalk.cyan("\n📊 Password Details:"));
    console.log(chalk.cyan(`   Length: ${password.length} characters`));
    console.log(
      chalk.cyan(
        `   Contains symbols: ${
          /[!@#$%^&*()_+{}[\]<>?,.]/.test(password) ? "Yes" : "No"
        }`
      )
    );
    console.log(
      chalk.cyan(`   Contains numbers: ${/\d/.test(password) ? "Yes" : "No"}`)
    );
    console.log(
      chalk.cyan(
        `   Contains uppercase: ${/[A-Z]/.test(password) ? "Yes" : "No"}`
      )
    );
    console.log(
      chalk.cyan(
        `   Contains lowercase: ${/[a-z]/.test(password) ? "Yes" : "No"}`
      )
    );

    // Calculate and display entropy information
    const charsetSize = calculateCharsetSize(options);
    const entropy = Math.log2(Math.pow(charsetSize, password.length));
    console.log(chalk.cyan(`   Estimated entropy: ${entropy.toFixed(1)} bits`));

    // Security assessment
    if (entropy >= 128) {
      console.log(chalk.green("   Security: Excellent (128+ bits)"));
    } else if (entropy >= 64) {
      console.log(chalk.yellow("   Security: Good (64+ bits)"));
    } else {
      console.log(chalk.red("   Security: Weak (< 64 bits)"));
    }
  }
  // Copy password
  clipboard.writeSync(password);
  console.log(chalk.yellow("📋 Copied to clipboard!"));

  // Show usage tip
  console.log(chalk.gray("\n💡 Tip: Use --help to see all available options"));
}

/**
 * Calculates the size of the character set used for password generation
 *
 * @param {Object} options - CLI options
 * @returns {number} The number of characters in the charset
 */
function calculateCharsetSize(options) {
  let size = 52; // 26 lowercase + 26 uppercase letters
  size += 10; // 10 digits

  if (options.symbols) {
    size += 18; // 18 special symbols
  }

  if (options.readable) {
    size -= 6; // Remove 6 confusing characters (O, 0, I, l, 1, |)
  }

  return size;
}

// Execute the main function when the script is run
main();
