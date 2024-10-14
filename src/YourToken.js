import web3 from "./Web3";

const address = "";

const abi = [];

export default new web3.eth.Contract(abi, address);