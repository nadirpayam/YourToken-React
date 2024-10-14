import React, { Component } from "react";
import YourToken from "../YourToken";
import styles from "../Wallet.module.css";
import web3 from "../Web3";

class Token extends Component {
  state = {
    name: "",
    symbol: "",
    totalSupply: "",
    message: "",
    connectWalletText: "Cüzdana Bağlan",
    address: "",
    addressBalance: "",
    receiverAddress: "",
    mount: 0,
  };
  async componentDidMount() {
    const name = await YourToken.methods.name().call();
    const symbol = await YourToken.methods.symbol().call();
    const totalSupply2 = await YourToken.methods.totalSupply().call();
    let totalSupply3 = Number(totalSupply2);
    let totalSupply = totalSupply3.toLocaleString();
    this.setState({ name, symbol, totalSupply });
  }

  connectWallet = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ connectWalletText: "Bağlanıyor..." });
    this.setState({ address: accounts[0] });
    const balance1 = await YourToken.methods.balanceOf(accounts[0]).call();
    let balance2 = Number(balance1);
    let balance = balance2.toLocaleString();
    console.log(typeof balance);
    this.setState({ connectWalletText: "Cüzdana Bağlan" });
    this.setState({ addressBalance: balance });
  };
  transferToken = async () => {
    this.setState({ message: "Transferin başarılı olması bekleniyor..." });
    await YourToken.methods
      .transfer(this.state.receiverAddress, this.state.mount)
      .send({
        from: "0xBfAa28cE526db554cfb4d3f2a768f3064e02740D", // kim gönderiyor parayı
        gasLimit: "3000000",
      });
    this.setState({
      message: "Transfer başarılı!",
    });
  };

  render() {
    return (
      <div>
        <h2 className={styles.tokenName}>Your Token Transfer Sayfası</h2>
        <div className={styles.walletCard}>
          <h3>Token Adı: {this.state.name}</h3>
          <h3>Token Sembolü: {this.state.symbol}</h3>
          <h3>Toplam Arz: {this.state.totalSupply} </h3>
        </div>

        <div className={styles.btnWrapper}>
          <button className={styles.button6} onClick={this.connectWallet}>
            {this.state.connectWalletText}
          </button>
        </div>

        <div className="p">
          <div className={styles.addressWrapper}>
            <h3>Adres: {this.state.address}</h3>
            <h3>Miktar: {this.state.addressBalance}</h3>
          </div>
        </div>

        <div className={styles.interactionsCard}>
          <div>
            <h2 className={styles.header}>YOUR TOKEN TRANSFERİ</h2>
            <input
              type="text"
              value={this.senderAddress}
              className={styles.addressInput}
              onChange={(event) =>
                this.setState({ receiverAddress: event.target.value })
              }
              placeholder="Alıcı Adresi giriniz"
            />{" "}
            <br></br>
            <input
              type="text"
              value={this.mount}
              className={styles.addressInput}
              onChange={(event) => this.setState({ mount: event.target.value })}
              placeholder="Göndermek istediğiniz Your Token miktarını giriniz"
            />
          </div>
          <div className={styles.btnWrapper}>
            <button className={styles.button6} onClick={this.transferToken}>
              Bağış Token'ını Gönder
            </button>
          </div>
        </div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default Token;
