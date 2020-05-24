# Secura

Storing passwords in plain text can be very dangerous, even using a simple hashing algorithm is prone to attacks. 

Hashing securely and comparing passwords the asynchronous way.
This module returns a promise with the hashed password and also compares it. 

## Usage

Install the module : 

```bash
npm install secura
```

Usage is very simple and straightforward. One need not be a cryptographic expert in order to hash the passwords in the database.

```js
const secura = require('secura');
```

### Generate Password

This converts the user password to a secure hash.

```js
secura.generatePassword(password)
      .then(hash=>{
          //store the hash in the database
      });
```

### Verify Password

This verifies if the password entered by the user matches the hashed password stored in the database.

```js
secura.validatePassword(password, hash)
      .then(isMatch=>{
          //returns true if password matches and false otherwise
      })
```

## Features

- Simple and straightforward to use. No knowledge of cryptography required to hash passwords and compare.
- Every hashed password is 61 digits long.
- Protection from Brute Force & Dictionary Attacks.
- Protection from [Rainbow Table](https://en.wikipedia.org/wiki/Rainbow_table) Attacks.
- Randomly generated salt for every password.
- Extra field is not required for storing salt in the database.
- Uses [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) to compute hash.

## Contributing

- Clone this repository
- Make changes/additions
- Write Unit Tests 
- Send a pull request





