/**
 * Generates a secure random password with customizable options.
 * 
 * @param {Object} options - Configuration options for password generation
 * @param {number} [options.length=12] - Length of the generated password (minimum 1, maximum 1000)
 * @param {boolean} [options.symbols=true] - Whether to include special symbols in the password
 * @param {boolean} [options.readable=false] - Whether to exclude easily confused characters (O, 0, I, l, 1, |)
 * 
 * @returns {string} A randomly generated password string
 * 
 * @throws {Error} When invalid options are provided or crypto API is unavailable
 * 
 * @example
 * // Generate a basic 12-character password with symbols
 * generatePassword(); // Returns something like "Kj#mN9$pL2@x"
 * 
 * @example
 * // Generate a 16-character password without symbols
 * generatePassword({ length: 16, symbols: false }); // Returns something like "aBcDeFgHiJkLmNoP"
 * 
 * @example
 * // Generate a readable 8-character password
 * generatePassword({ length: 8, readable: true }); // Returns something like "aBcDeFgH"
 */
function generatePassword(options = {}) {
  // Input validation and sanitization
  if (options === null || typeof options !== 'object') {
    throw new Error('Options must be an object');
  }

  // Destructure options with default values
  const { length = 12, symbols = true, readable = false } = options;

  // Validate length parameter
  if (typeof length !== 'number' || !Number.isInteger(length)) {
    throw new Error('Length must be an integer');
  }
  
  if (length < 1) {
    throw new Error('Password length must be at least 1 character');
  }
  
  if (length > 1000) {
    throw new Error('Password length cannot exceed 1000 characters for security reasons');
  }

  // Validate boolean parameters
  if (typeof symbols !== 'boolean') {
    throw new Error('Symbols option must be a boolean');
  }
  
  if (typeof readable !== 'boolean') {
    throw new Error('Readable option must be a boolean');
  }

  // Security check: Ensure crypto API is available
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    throw new Error('Cryptographically secure random number generator is not available. This function requires a secure environment.');
  }

  // Define character sets for password generation
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";
  const syms = "!@#$%^&*()_+{}[]<>?,.";

  // Start with letters and numbers as the base charset
  let charset = letters + nums;
  
  // Add symbols to charset if symbols option is enabled
  if (symbols) charset += syms;
  
  // Remove easily confused characters if readable option is enabled
  // This removes: O (letter O), 0 (zero), I (letter I), l (lowercase L), 1 (one), | (pipe)
  if (readable) charset = charset.replace(/[O0Il1|]/g, "");

  // Security check: Ensure charset is not empty after filtering
  if (charset.length === 0) {
    throw new Error('No characters available for password generation after applying filters');
  }

  // Security check: Ensure charset has sufficient entropy
  if (charset.length < 10) {
    throw new Error('Character set is too small for secure password generation');
  }

  // Generate the password character by character
  let password = "";
  let attempts = 0;
  const maxAttempts = length * 10; // Prevent infinite loops

  for (let i = 0; i < length; i++) {
    attempts++;
    if (attempts > maxAttempts) {
      throw new Error('Failed to generate password after maximum attempts. This may indicate a system issue.');
    }

    try {
      // Use crypto.getRandomValues for cryptographically secure random numbers
      // This is more secure than Math.random() for password generation
      const randomArray = crypto.getRandomValues(new Uint32Array(1));
      const randIndex = randomArray[0] % charset.length;
      password += charset.charAt(randIndex);
    } catch (error) {
      throw new Error(`Failed to generate secure random number: ${error.message}`);
    }
  }

  // Output validation: Ensure password meets requirements
  if (password.length !== length) {
    throw new Error(`Generated password length (${password.length}) does not match requested length (${length})`);
  }

  // Security check: Ensure password contains characters from the charset
  for (let char of password) {
    if (!charset.includes(char)) {
      throw new Error('Generated password contains invalid characters');
    }
  }

  // Additional security validation for readable mode
  if (readable) {
    const confusingChars = /[O0Il1|]/;
    if (confusingChars.test(password)) {
      throw new Error('Generated password contains confusing characters despite readable mode being enabled');
    }
  }

  return password;
}

export default generatePassword;
