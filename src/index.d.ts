// index.d.ts
interface GenerateOptions {
  length?: number;
  symbols?: boolean;
  readable?: boolean;
}

declare function generatePassword(options?: GenerateOptions): string;

export = generatePassword;
