import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  // ES5 syntex.
  /*
  constructor(props) {
    super(props);
    this.state = {manger: ''};
  }
  */

  // ES2016 Syntex
  // It is automatically put inside the contructor.
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  // This function is called by App automatically
  // after render() is called.
  async componentDidMount() {
    // Do not need to call call({from: accounts[0]})
    // because Metamask automatically uses this account.
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    // balance is an object, in unit of Wei.
    const balance = await web3.eth.getBalance(lottery.options.address);
    //this.setState({manager: manager, players: players});
    // ES6 syntex:
    this.setState({manager, players, balance});
  }

  onSubmit = async (event) => {
    //Prevent event submits itself.
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message:  'Waiting on transaction sucess...'});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message: 'You have been entered!'});
  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success...'});
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    this.setState({message: 'A winner has been picked!'});
  } 

  render() {
    console.log(web3.version);
    // Use Promise to print out accounts
    web3.eth.getAccounts()
      .then(console.log);

    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value = {this.state.value}
              onChange = {event => this.setState({value: event.target.value})}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
          <h4>Ready to pick a winner?</h4>
          <button onClick = {this.onClick}>
            Pick a winner!
          </button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
