import React, { Component } from 'react';
import file from './piggy-bank.png';
import StockInfo from './components/StockInfo'
import StockLogo from './components/StockLogo'
import { loadQuoteForStock, loadQuoteForStockLogo, loadRecentNewsForStock, loadChartForStock } from './api/iex'
import './App.css';
import { fetchCurrentTime } from './api/worldclock'


class App extends Component {
  state = {
    error: null,
    enteredSymbol: "MSFT",
    quote: null,
    logo: null,
    logoerror: null,
    time: ""
  };

  // The first time our component is rendered this method is called
  componentDidMount() {
    this.loadQuote();
  }

  loadQuote = () => {
    // Getting the string that the user has entered from the state
    const { enteredSymbol } = this.state;
    // when the button is clicked, it reads the value (enteredSymbol) and accesses the API
    loadQuoteForStockLogo(enteredSymbol)
      .then(logo => {
        this.setState({ logo: logo, logoerror: null });
      })
      .catch(error => {
        this.setState({ logoerror: error });
        console.log("error getting logo image: ", error.message);
      });
    loadQuoteForStock(enteredSymbol)
      .then(quote => {
        this.setState({
          quote: quote,
          error: null // clear error
        });
      })
      .catch(error => {
        if (error.response.status === 404) {
          error = new Error(
            `The stock symbol ${enteredSymbol} does not exist.`
          );
        }
        this.setState({ error: error });
        console.log("Error loading quote", error);
      });
    fetchCurrentTime().then(time => {
      this.setState({
        time
      });
    });
  };

  onChangeEnteredSymbol = event => {
    const input = event.target;
    const value = input.value.trim().toUpperCase(); // The entered text from the selected field
    // Text will be all caps and have no white space
    // Change state to reflect the new value
    // We don't need to do anything that relies on the previous state so we just set the value to the new value
    this.setState({
      enteredSymbol: value
    });
  };

  // To load quote when 'enter/return' is pressed
  onKeyDownPressEnter = event => {
    if (event.keyCode === 13) {
      this.loadQuote();
    }
  };

  // Render is called whenever the state changes
  render() {
    const { error, enteredSymbol, quote, logoerror, logo, time } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={file} className="App-logo" alt="logo" />
          <h1 className="App-title">React Share Prices</h1>
        </header>
        <label>
          <input
            value={enteredSymbol}
            placeholder={enteredSymbol}
            aria-label="Symbol"
            onChange={this.onChangeEnteredSymbol}
            onKeyDown={this.onKeyDownPressEnter}
          />
          <button className="ml-1" onClick={this.loadQuote}>
            Load Quote
          </button>
        </label>
        {!!logoerror && <p>{logoerror.message}</p>}
        {!!error && <p>{error.message}</p>}
        <StockLogo {...logo} />
        {!!quote ? (
          <StockInfo // Tell the component that all of 'quote's' key value pairs will also be it's key value pairs
            {...quote}
          />
        ) : (
          <p>Loading...</p>
        )
        }
        <h6>Timestamp: {time}</h6>
      </div>
    );
  }
}

export default App;
