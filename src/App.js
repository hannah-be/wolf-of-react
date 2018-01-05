import React, { Component } from 'react';
import logo from './piggy-bank.png';
import './App.css';
import StockInfo from './components/StockInfo'

class App extends Component {
  render() {
    return <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Share Prices</h1>
        </header>
        <StockInfo 
            symbol="NFLX"
            companyName="Netflix Inc."
            primaryExchange="Nasdaq Global Select"
            latestPrice={188.15}
            latestSource='Close'
            week52High={204.38}
            week52Low={113.95}
        />

        <small>
          <p>Icon made by <a href="http://www.freepik.com" title="Freepik">
            Freepik
          </a> from <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>. Licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">
            CC 3.0 BY
          </a></p>
        </small>
      </div>;
  }
}

export default App;
