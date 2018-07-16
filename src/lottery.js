import web3 from './web3';

// The Address of the instance of Contract Lottery in Rinkeby
// Network which is deployed in "lottery" folder.
const address = '0x10995A8F1c0285bb950Fc395241412D0634012b6';

// The ABI data of the instance of Contract Lottery in Rinkeby
// Network which is deployed in "lottery" folder.
const abi = [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

// Create a local copy of the instance of the contract lottery
// deployed in Rinkeby in lottery folder.
// And then export it
export default new web3.eth.Contract(abi, address);
