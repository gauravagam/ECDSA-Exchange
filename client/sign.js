const EC =  require("elliptic").ec;
const ec = new EC("secp256k1");
const SHA256 = require('crypto-js/sha256');

module.exports = {
    createSignature: (privateKey,callBack) =>{
        try {
            const key = ec.keyFromPrivate(privateKey);
            const message = "this is the verification";
            const messageHash = SHA256(message).toString();
            const signature = key.sign(`0x${messageHash}`);
            return callBack(signature.toDER());
        } catch (error) {
            console.error('inside createSignature ',error);
            throw error;
        }
    }
}