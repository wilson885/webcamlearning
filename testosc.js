/*const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/example', (req, res) => {
  res.send(`Full name is:${req.body.fname} ${req.body.lname}.`);
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});*/
sendosc();
function sendosc()
{
  const { Client } = require('node-osc');
  const client = new Client('127.0.0.1', 3333);
  client.send('/oscAddress', 200, () => {
    client.close();
  });
}