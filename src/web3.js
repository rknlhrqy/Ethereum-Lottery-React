import Web3 from 'web3';

// initiate a instance of Web3. This install is using the
// current provider injected by Metamask who is using
// web3 v0.20
const web3 = new Web3(window.web3.currentProvider);

export default web3;
