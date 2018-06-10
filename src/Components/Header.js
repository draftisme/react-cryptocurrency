import React, { Component } from 'react';
import Logo from '../logo.png';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            filter: ''
        }
    }   

    handleInput(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const {coinList} = this.props;
        const {filter} = this.state;
        const coinFilter = [];
        // console.log(filter);
        for(let coin of coinList){
            if(coin.name.toUpperCase().indexOf(filter.toUpperCase()) > -1){
                coinFilter.push(coin);
            }      
        }
        this.props.loadCoinList(coinFilter);
    }

    render(){
        return (
            <div id="header">
                <div id="logo">
                    <img src={Logo} alt="Logo" onClick={() => this.props.loadCoinList(this.props.coinList)} />
                </div>
                <div id="sort">
                    <label>sort by: </label>
                    <select>
                        <option value="ascending">ascending</option>
                        <option value="descending">descending</option>
                    </select>
                    <button>name</button>
                    <button>price</button>
                    <button>rank</button>
                </div>
                <div>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <input 
                            type="text" 
                            name="filter" 
                            value={this.state.name}
                            id="filter" 
                            placeholder="search find name..."
                            onChange={(e) => this.handleInput(e)}    
                        />
                    </form>
                </div>        
            </div>
        )
    }
}

export default Header;