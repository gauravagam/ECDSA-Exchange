const EC =  require("elliptic").ec;
const ec = new EC("secp256k1");
const SHA256 = require('crypto-js/sha256');

module.exports = {
    verify: async (publicKey,signature) => {
        try {
            const key = ec.keyFromPublic(publicKey,'hex');
            const message = "this is the verification";
            const messageHash = SHA256(message).toString();
            return key.verify(`0x${messageHash}`,signature)
        } catch (error) {
            console.error('inside verify ',error);  
            throw error;
        }
    }
}