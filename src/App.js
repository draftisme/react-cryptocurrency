import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Coin from './Components/Coin';

const API_URL = 'https://api.coinmarketcap.com/v1/ticker/?limit=2000';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      originList: [], //immutable data 
      coinList: [] //rendered data
    }
  }

  componentDidMount(){
    fetch(API_URL, { 
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      const coinList = [...data];
      const originList = coinList;
      this.setState({originList, coinList});
    })
    .catch(err => console.log(err))
  }

  loadCoinList = (coinList) => {
    this.setState({coinList});
  }  

  render() {
    let renderCoin;
    if(this.state.coinList !== null){
      renderCoin = this.state.coinList.map((coin, i) => <Coin key={i} coin={coin} />);
    }
    return (
      <div>
        <Header coinList={this.state.originList} loadCoinList={this.loadCoinList} />
        <div id="container">
          <div id="count_result">There are currently {this.state.coinList.length} type(s) of cryptocurrency</div>
          <div id="coin_container">
            {renderCoin}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
