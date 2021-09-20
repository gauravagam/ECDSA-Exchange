import { createSignature } from "./sign";
import { verify } from "./verification";

const server = "http://localhost:3042";

document.getElementById("exchange-address").addEventListener('input', ({ target: {value} }) => {
  if(value === "") {
    document.getElementById("balance").innerHTML = 0;
    return;
  }

  fetch(`${server}/balance/${value}`).then((response) => {
    return response.json();
  }).then(({ balance }) => {
    document.getElementById("balance").innerHTML = balance;
  });
});

document.getElementById("transfer-amount").addEventListener('click', () => {
  const sender = document.getElementById("exchange-address").value;
  const amount = document.getElementById("send-amount").value;
  const recipient = document.getElementById("recipient").value;
  fetch(`${server}/getPrivateKey/${sender}`,{ headers: { 'Content-Type': 'application/json' }})
    .then(function (response){
      return response.json();
    }).then(respJson=>{
      createSignature(respJson.privateKey,async(signature)=>{
        const isSignVerified = await verify(sender,signature);
        if (isSignVerified) {
          const body = JSON.stringify({
            sender, amount, recipient
          });
  
          const request = new Request(`${server}/send`, { method: 'POST', body });
  
          fetch(request, { headers: { 'Content-Type': 'application/json' } }).then(response => {
            return response.json();
          }).then(({ balance }) => {
            document.getElementById("balance").innerHTML = balance;
          });
        }
      });
    });
});
