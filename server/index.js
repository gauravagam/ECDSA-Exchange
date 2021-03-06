const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const keyGenerater = require('./generate-keys');

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

let balances = {
  // "1": 100,
  // "2": 50,
  // "3": 75,
}
let accounts = keyGenerater.generateKeys();
accounts.forEach(account=>balances[account.publicKey]=100);
console.log('balances',balances)
app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const {sender, recipient, amount} = req.body;
  balances[sender] -= amount;
  balances[recipient] = (balances[recipient] || 0) + +amount;
  res.send({ balance: balances[sender] });
});

app.get("/getPrivateKey/:publicKey", async (req,res)=>{
  const { publicKey = "" } = req.params;
  console.log('inside getPrivateKey ',publicKey);
  const account = accounts.find((account)=>account.publicKey===publicKey);
  if(account){
    res.send({privateKey: account.privateKey});
  } else {
    res.send({message: "private key not found"})
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
