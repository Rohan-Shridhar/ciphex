const fs = require("fs");
const path = require("path");

let vigenereKey = "DEFAULT";
try {
  const keyEnvContent = fs.readFileSync(
    path.join(__dirname, "key.env"),
    "utf-8",
  );
  const match = keyEnvContent.match(/key\s*=\s*"([^"]+)"/);
  if (match) {
    vigenereKey = match[1];
  } else {
    const fallbackMatch = keyEnvContent.match(/key\s*=\s*([^\s]+)/);
    if (fallbackMatch) {
      vigenereKey = fallbackMatch[1];
    }
  }
} catch (e) {}

const base = 96;

function generateKeys() {
  const key1 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77,
    78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
  ];
  const key2 = [
    1, 5, 7, 11, 13, 17, 19, 23, 25, 29, 31, 35, 37, 41, 43, 47, 49, 53, 55, 59,
    61, 65, 67, 71, 73, 77, 79, 83, 85, 89, 91, 95,
  ];

  const key = [0, 0];

  key[0] = key1[Math.floor(Math.random() * key1.length)];
  key[1] = key2[Math.floor(Math.random() * key2.length)];

  return key;
}

function modInverse(a) {
  for (let x = 1; x < base; x++) {
    if ((a * x) % base == 1) {
      return x;
    }
  }
  throw new Error("key[1] must be coprime to 96"); // This should never happen
}

function isvalidtext(text) {
  if (text == null) {
    throw new Error("Input cannot be null or undefined");
  }

  if (typeof text !== "string") {
    throw new Error("Input must be a string");
  }
}
function isvalidkeys(keys) {
  if (
    keys == null ||
    !Array.isArray(keys) ||
    keys.length !== 2 ||
    typeof keys[0] !== "number" ||
    typeof keys[1] !== "number"
  ) {
    throw new Error(
      "Keys must be an array of two elements where both elements should be numbers",
    );
  }
}
function valid_coprime_with_base(num) {
  let temp = Math.min(num, base);
  //check for common factors from 2 to min(num, base) if any common factor is found, return false
  for (let i = 2; i <= temp; i++) {
    if (num % i === 0 && base % i === 0) {
      throw new Error(`key[1] must be coprime to 96`);
    }
  }
}

function encrypt(text, keys) {
  isvalidtext(text);
  if (/[^\x20-\x7E]/.test(text)) {
    throw new Error(
      `Input must contain only printable ASCII characters (32–126): ${text}`,
    );
  }
  isvalidkeys(keys);
  valid_coprime_with_base(keys[1]);
  let encryptedtext = "";
  for (let i = 0, j = 0; i < text.length; i++, j++) {
    const char = text.charCodeAt(i) - 32;
    const keyCode = vigenereKey.charCodeAt(j % vigenereKey.length) - 32;

    const vigenereChar = (char + keyCode) % base;
    const encryptedCharCode = (vigenereChar * keys[1] + keys[0]) % base;

    const encryptedChar = String.fromCharCode(encryptedCharCode + 32);
    encryptedtext += encryptedChar;
  }
  return encryptedtext;
}

function decrypt(text, keys) {
  isvalidtext(text);
  isvalidkeys(keys);
  valid_coprime_with_base(keys[1]);
  let decryptedtext = "";
  for (let i = 0, j = 0; i < text.length; i++) {
    const char = text.charCodeAt(i) - 32;
    const keyCode = vigenereKey.charCodeAt(j % vigenereKey.length) - 32;

    let decryptedCharCode =
      ((((char - keys[0]) * modInverse(keys[1])) % base) + base) % base;
    decryptedCharCode = (((decryptedCharCode - keyCode) % base) + base) % base;

    const decryptedChar = String.fromCharCode(decryptedCharCode + 32);
    decryptedtext += decryptedChar;
    j++;
  }
  return decryptedtext;
}

module.exports = { encrypt, decrypt, generateKeys };
