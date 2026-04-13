# ciphex

> Lightweight text encryption & decryption using affine cipher — works in Node.js and the browser.

[![npm version](https://img.shields.io/npm/v/ciphex.svg)](https://www.npmjs.com/package/ciphex)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
<img src="https://img.shields.io/npm/dw/ciphex" /> 

---

## What is ciphex?

**ciphex** implements the [affine cipher](https://en.wikipedia.org/wiki/Affine_cipher) — a classical substitution cipher that maps each character using:

```
E(x) = (a·x + b) mod 96
D(x) = a⁻¹ · (x - b) mod 96
```

where `b` is a shift key and `a` is a multiplicative key coprime to 96.

It operates on all 96 printable ASCII characters (space → `~`), making it suitable for encrypting plain text strings.

---

## Repository Structure

```bash
├── CONTRIBUTING.md     # Contribution file,
├── LICENSE             # License file.
├── README.md           # Documentation.
├── index.js            # Entry script file.
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

```js
const { encrypt, decrypt, generateKeys } = require("ciphex");

const keys = generateKeys(); // [b, a] — random valid key pair
const cipher = encrypt("hello!", keys);
const plain = decrypt(cipher, keys); // "hello!"

console.log(keys); // e.g. [42, 17]
console.log(cipher); // encrypted string
console.log(plain); // hello!
```

> **Important:** You must use the same `keys` array for both `encrypt` and `decrypt`. Store or transmit keys securely alongside your ciphertext if needed.

---

## API

### `generateKeys()`

Returns a `[b, a]` key pair where:

- `b` — any integer in `[0, 95]`
- `a` — any integer in `[1, 95]` that is **coprime to 96** (i.e., has a modular inverse)

### `encrypt(text, keys)`

- `text` — plaintext string (printable ASCII only)
- `keys` — `[b, a]` from `generateKeys()`
- Returns the encrypted string, or `null` if `text` is `null`

### `decrypt(text, keys)`

- `text` — previously encrypted string
- `keys` — same `[b, a]` used during encryption
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

## Limitations

- **Not cryptographically secure.** The affine cipher is a classical/educational cipher and is trivially breakable via frequency analysis. Do not use it to protect sensitive data.
- Only printable ASCII (codes 32–127) is supported.
- Key space is small (~32 × 96 = 3,072 possible key pairs).

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for open issues, good first tasks, and the contribution workflow.

---

## License

[MIT](LICENSE) © Rohan S Mirjankar
