const assert = require('assert'),
  ganache = require('ganache-cli'),
  Web3 = require('web3'),
  provider = ganache.provider(),
  web3 = new Web3(provider),
  { interface, bytecode } = require('../compile')

  let accounts, inbox;

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: ['Joel was here!']})
      .send({ from: accounts[0], gas: '1000000'})
  })

  describe('Inbox', () => {
    it ('deploys contract', () => {
      console.log(inbox)
    })

    it('has default message', async () => {
      const message = await inbox.methods.message().call()

      assert.equal(message,'Joel was here!')
    })

    it('can change message', async () => {
      await inbox.methods.setMessage('Goodbye!').send({ from: accounts[0]})

      const message = await inbox.methods.message().call()

      assert.equal(message,'Goodbye!')
    })
  })