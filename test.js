const { encrypt, decrypt, generateKeys } = require("./index");

sample = "hello world 1 2 3";
keys = generateKeys();
encryptedtext = encrypt(sample, keys);
decryptedtext = decrypt(encryptedtext, keys);
console.log(sample);
console.log(keys);
console.log(encryptedtext);
console.log(decryptedtext);
