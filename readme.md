# 🔐 secure-password-generator

The **simplest and smartest** CLI + API tool to generate secure passwords — instantly.  
Built for developers who care about **security, usability**, and **speed**.

---

## 🚀 Features

- ✅ **Super Secure** — Uses Node.js `crypto.randomInt()` (cryptographically strong)
- 🧪 **CLI + API Support** — Generate from terminal or within your code
- 🧠 **Readable Mode** — Excludes confusing characters like `O0Il1|`
- 🎛 **Customizable** — Set length, toggle symbols, and readability
- 📋 **Clipboard Support** — Auto-copy password in CLI
- 🌈 **Modern CLI UX** — Beautiful banner, colors, intuitive design

---

## 🧠 Why This Package?
**Unlike alternatives like generate-password, this tool:**
- ✅ Provides both CLI and API in one clean install
- ✅ Uses secure randomness (no Math.random)
- ✅ Offers a readable mode for user-friendly onboarding
- ✅ Copies passwords to clipboard automatically
- ✅ Has zero config, beautiful UX, and instant usage

---

## 📦 Installation

### 📁 For CLI Use (Global)

```bash
npm install -g @zerowillreborn/secure-password-generator
```
### Now you can use:
```bash
secure-pass --help
Example:
secure-pass --length 16 --symbols --readable
```

### 📁 For API Use in Projects
```bash
npm install @zerowillreborn/secure-password-generator
```
### 🧑‍💻 API Usage
```bash
import generatePassword from '@zerowillreborn/secure-password-generator';

const password = generatePassword({
  length: 16,
  symbols: true,
  readable: true
});

console.log(password); // 'abc$XyZ09LMn!pqR'
```
> ✅ Fully ESM-compatible, no external dependencies

## 📚 API Reference

```bash
generatePassword(options?: {
  length?: number;      // Default: 12
  symbols?: boolean;    // Include special characters, default: true
  readable?: boolean;   // Remove ambiguous characters, default: false
}): string
```

## 🔐 How It Works
**This package uses Node's native crypto.randomInt() for true secure random number generation. Unlike other tools, we never use Math.random().**

# 👨‍💻 Author
**Achal Chaudhary**
**achal.psolver@gmail.com**