import React, { Component } from 'react';
import Logo from '../logo.png';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            coinFilter: [],
            filter: '',
            sortBy: 'ascending'
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({coinFilter});
    }

    loadOriginList = () => {
        const coinFilter = this.props.coinList;
        this.props.loadCoinList(coinFilter);
        this.setState({coinFilter});        
    }

    handleSorting(btnType){
        const { sortBy } = this.state;
        switch(btnType){
            case "name":
                this.sortbyFunc(sortBy, "name");
                break;
            case "price":
                this.sortbyFunc(sortBy, "price_usd");
                break;
            case "rank":
                this.sortbyFunc(sortBy, "rank");
                break;
            default:
                break;

        }
    }

    sortbyFunc(sortBy, btnType){
        const {coinFilter} = this.state;
        
        const list = coinFilter.sort((a, b) => {
            if(btnType === "price_usd" || btnType === "rank"){
                a[btnType] = Number(a[btnType]);
                b[btnType] = Number(b[btnType]);
                if(sortBy === "ascending") { 
                    return a[btnType] - b[btnType];
                } else {
                    return b[btnType] - a[btnType];
                }
            } else {
                if(sortBy === "ascending"){
                    if(a[btnType].toUpperCase() < b[btnType].toUpperCase()) return -1;
                    if(a[btnType].toUpperCase() > b[btnType].toUpperCase()) return 1;
                } else{
                    if(a[btnType].toUpperCase() > b[btnType].toUpperCase()) return -1;
                    if(a[btnType].toUpperCase() < b[btnType].toUpperCase()) return 1;
                }
            }
        })        
        this.props.loadCoinList(list);
    }

    render(){
        return (
            <div id="header">
                <div id="logo">
                    <img src={Logo} alt="Logo" onClick={this.loadOriginList} />
                </div>
                <div id="sort">
                    <label>sort by: </label>
                    <select name="sortBy" value={this.state.sortBy} onChange={this.handleInput}>
                        <option value="ascending">ascending</option>
                        <option value="descending">descending</option>
                    </select>
                    <button onClick={() => this.handleSorting("name")}>name</button>
                    <button onClick={() => this.handleSorting("price")}>price</button>
                    <button onClick={() => this.handleSorting("rank")}>rank</button>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="text" 
                            name="filter" 
                            value={this.state.name}
                            id="filter" 
                            placeholder="search find name..."
                            onChange={this.handleInput}    
                        />
                        <button>Filter</button>
                    </form>
                </div>        
            </div>
        )
    }
}

export default Header;