const wallet = require('truffle-hdwallet-provider'),
  { interface, bytecode } = require('./compile'),
  Web3 = require('web3'),
  provider = new wallet(
    'rough ripple child catalog winter nuclear blast total unaware pelican thing slight',
    'https://rinkeby.infura.io/JRVjDFsbJgQNX3DMMGvd'
  ),
  web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Joel Pablo was here :P']})
    .send({ gas: '1000000', from: accounts[0]})

    console.log('Contract deployed to ', result.options.address)
}

deploy()
