const cryptoJs = require('crypto-js');

//Some constants which have been used below. 

const defaultIterations = 1000;
const defaultKeySize = 512/128;
const defaultSaltLen = 16;
const algorithmName = 'pbkdf2'

/**
 * Returns a promise of a random string of specified length <= 128
 * @param  {number} Length of random string
 * @returns {Promise<string>} promise of random string
 */

 var genRandom = (randomStringLength) => new Promise((resolve, reject)=>{
    if(randomStringLength > 128) randomStringLength = 128;

    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~'.split('');
    let final = '';
    let tempSaltLength = 0;
    let iter = 1000;

    if(typeof(final) !== 'string') reject(new Error("Check the data type of final"));

    while(tempSaltLength < iter){
        var random = Math.ceil(Math.random()*1000)%characters.length;
        final += characters[random];
        tempSaltLength++;
    }

    let finalSalt = cryptoJs.SHA512(final).toString();
    final = '';
    for(var i = 0; i < randomStringLength; i++){
        final += finalSalt[i];
    }
    resolve(final);
 });

 
/**
 * Generates a Hashed Password to be stored in the database.
 * @param {string} plaintext The password to be hashed.
 * @returns {Promise<string>} Resolves the final hashed password which is of 61 digits
 */

exports.generatePassword = (password) => new Promise((resolve, reject)=>{
    genRandom(defaultSaltLen).then(mySalt=>{
        var hashedString = '';
        hashedString += mySalt + '$';
        hashedString += algorithmName + '$';
        hashedString += defaultIterations + '$';
        var hash = cryptoJs.PBKDF2(password, mySalt, {keySize: defaultKeySize, iterations: defaultIterations}).toString();
        hashedString += hash;
        resolve(hashedString);
    });
});


/**
 * 
 * @param {string} password The password entered 
 * @param {string} hash The password stored in the database
 * @returns {Promise<boolean>} Resolves to True if password entered matches the one in database
 */

exports.validatePassword = (password, hash) => new Promise((resolve, reject)=>{
    var hashed = hash.split('$');
    var salt = hashed[0];
    var algoUsed = hashed[1];
    var iterations = hashed[2];
    var hashedValue = hashed[3];

    var passwordHashed = cryptoJs.PBKDF2(password, salt, {keySize: defaultKeySize, iterations: iterations}).toString();
    resolve(passwordHashed===hashedValue);
})

module.exports;

