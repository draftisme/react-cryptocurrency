import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Coin from './Components/Coin';

const API_URL = 'https://api.coinmarketcap.com/v1/ticker/?limit=2000';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      coinList: [],
      sortBy: 'ascending'
    }

    this.originList = [];
  }

  componentDidMount(){
    fetch(API_URL, { 
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      this.originList = [...data];
      const coinList = this.originList;
      this.setState({coinList});
    })
    .catch(err => console.log(err))
  }

  loadOriginList = (coinList) => {
    this.setState({coinList});
  }  

  handleInput = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {filter} = this.state;
    let coinList = this.originList;
    coinList = coinList.filter(coin => coin.name.toUpperCase().indexOf(filter.toUpperCase()) > -1); 
    this.setState({coinList});
  }

  handleSorting = (btnType) => {
    const { sortBy } = this.state;
    const coinList = this.state.coinList.sort((a, b) => {
      if(btnType === "name"){
        a = a[btnType].toUpperCase();
        b = b[btnType].toUpperCase();
        let num;
        if(sortBy === "ascending"){
          if(a < b) num = -1;
          if(a > b) num = 1;
          return num;
        } else {
          if(a > b) num = -1;
          if(a < b) num = 1;
          return num;
        }
      } else {
        a = Number(a[btnType]);
        b = Number(b[btnType]);
        
        if(sortBy === "ascending")
          return a - b;
        else 
          return b - a;
      }
    })

    this.setState({coinList});
  }

  render() {
    let renderCoin = this.state.coinList.map((coin, i) => <Coin key={i} coin={coin} />);
    
    return (
      <div>
        {/* {this.state.originList.length > 0 && <Header coinList={this.state.originList} loadCoinList={this.loadCoinList} />} */}
        
        <Header 
          handleInput={this.handleInput} 
          handleSubmit={this.handleSubmit}
          loadOriginList={this.loadOriginList}
          handleSorting={this.handleSorting}
        />

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
