const assert = require('assert');
const secura = require('../index');


describe('Unit Tests', ()=>{
    const password = 'what$up^EvEry1';
    it('Generates the hashed password and Validates it', ()=>{
        return secura.generatePassword(password)
                     .then(hash=>{
                         secura.validatePassword(password, hash)
                                .then(isMatch=>{
                                    assert.equal(isMatch, true);
                                })
                    })
    });

    it('Checks if generated password contains all the required values', ()=>{
        return secura.generatePassword(password)
                     .then(hash=>{
                         var hashed = hash.split('$');
                         assert.equal(hashed.length, 4);
                    })
    });
});
