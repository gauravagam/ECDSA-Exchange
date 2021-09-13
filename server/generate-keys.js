const EC =  require("elliptic").ec;
const ec = new EC("secp256k1");

let accounts = [];
for(let i=0;i<3;i++){
    let key = ec.genKeyPair();
    accounts.push({privateKey: key.getPrivate().toString(16), publicKey: key.getPublic().encode('hex'), balance: 100});
}
console.log("Available accounts\n==================");
accounts.forEach((account,index)=>console.log(`(${index}) ${account.publicKey}`));

console.log("Private Keys\n==================");
accounts.forEach((account,index)=>console.log(`(${index}) ${account.privateKey}`));