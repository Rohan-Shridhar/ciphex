# ciphex

> Lightweight text encryption & decryption combining Vigenère and Affine ciphers — works in Node.js.

[![npm version](https://img.shields.io/npm/v/ciphex.svg)](https://www.npmjs.com/package/ciphex)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![npm downloads](https://img.shields.io/npm/dw/ciphex)](https://www.npmjs.com/package/ciphex)

---

## What is ciphex?

**ciphex** implements a combined **Vigenère and Affine cipher**. It maps each character by first applying a Vigenère shift using a key stored in `key.env`, followed by an Affine transformation (multiplication and addition):

```
E(x) = ((x + v) · a + b) mod 96
D(x) = (a⁻¹ · (x - b) - v) mod 96
```

where `v` is the Vigenère character shift, `b` is the additive shift key, and `a` is a multiplicative key coprime to 96.

It operates on all 96 printable ASCII characters (space → `~`), making it suitable for encrypting plain text strings.

---

## Repository Structure

```bash
├── CONTRIBUTING.md     # Contribution file,
├── LICENSE             # License file.
├── README.md           # Documentation.
├── index.js            # Entry script file.
├── key.env             # Vigenère secret key configuration.
├── package.json        # Node packages & Project's metadata.
└── test.js             # Test script file.
```

---

## Tech stack

- **Language:** JavaScript
- **Runtime:** Node.js

---

## Installation

```bash
npm install ciphex
```

---

## Usage

`ciphex` requires a `key.env` file located in the same directory as the module for the Vigenère cipher base:

**key.env**  
*Create a key.env in your directory and set a string of your chooice as the value of the key.*
```env
key = "SOMETHING"
```

**Code**
```js
const { encrypt, decrypt, generateKeys } = require("ciphex");

const keys = generateKeys(); // [b, a] — random valid key pair
const cipher = encrypt("hello!", keys);
const plain = decrypt(cipher, keys); // "hello!"

console.log(keys); // e.g. [42, 17]
console.log(cipher); // encrypted string
console.log(plain); // hello!
```

> **Important:** You must use the same `keys` array for both `encrypt` and `decrypt`. Store or transmit keys securely alongside your ciphertext if needed. The `key.env` must also map to the same Vigenère key during decryption.

---

## API

### `generateKeys()`

Returns a `[b, a]` key pair where:

- `b` — any integer in `[0, 95]`
- `a` — any integer in `[1, 95]` that is **coprime to 96** (i.e., has a modular inverse)

### `encrypt(text, keys)`

- `text` — plaintext string (printable ASCII only)
- `keys` — `[b, a]` from `generateKeys()`
- Slices the Vigenère key secretly from `key.env`.
- Returns the encrypted string, or `null` if `text` is `null`

### `decrypt(text, keys)`

- `text` — previously encrypted string
- `keys` — same `[b, a]` used during encryption
- Requires the same Vigenère key in `key.env`.
- Returns the decrypted plaintext string, or `null` if `text` is `null`

### `modInverse(a)`

Internal helper — returns the modular inverse of `a` under mod 96. Exported for testing purposes.

---

## Supported Characters

ciphex works on all **96 printable ASCII** characters — character codes 32–127:

```
(space) ! " # $ % & ' ( ) * + , - . / 0–9 : ; < = > ? @
A–Z [ \ ] ^ _ ` a–z { | } ~
```

Characters outside this range (e.g. emojis, unicode accents) are **not supported** and will produce unexpected output.

---


## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for open issues, good first tasks, and the contribution workflow.

---

## License

[MIT](LICENSE) © Rohan S Mirjankar
