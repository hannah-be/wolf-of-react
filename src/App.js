import React, { Component } from 'react';
import file from './piggy-bank.png';
import StockInfo from './components/StockInfo'
import StockLogo from './components/StockLogo'
import { Table, TableRow } from './components/ChartTable'
import NewsItem from './components/NewsItem'
import SearchItem from './components/SearchItem'
import { loadQuoteForStock, loadQuoteForStockLogo, loadRecentNewsForStock, loadChartForStock } from './api/iex'
import './App.css';
import { fetchCurrentTime } from './api/worldclock'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

class App extends Component {
  state = {
    error: null,
    enteredSymbol: "MSFT",
    quote: null,
    logo: null,
    logoerror: null,
    searchHistory: [],
    newsItems: [],
    chartResults: [],
    time: ""
  };

  // The first time our component is rendered this method is called
  componentDidMount() {
    this.loadQuote();
  }

  loadQuote = () => {
    // Getting the string that the user has entered from the state
    const { enteredSymbol, searchHistory } = this.state;
    // when the button is clicked, it reads the value (enteredSymbol) and accesses the API

    // Everytime the app re-renders it adds the entered symbol to the search history
    this.setState({
      searchHistory: searchHistory.concat([enteredSymbol])
    })

    loadQuoteForStock(enteredSymbol)
      .then(quote => {
        this.setState({ quote: quote, error: null }); // clear error
      })
      .catch(error => {
        if (error.response.status === 404) {
          error = new Error(`The stock symbol '${enteredSymbol}' does not exist.`)
        }
        this.setState({ error: error });
        console.log("Error loading quote", error);
      });
    loadQuoteForStockLogo(enteredSymbol)
      .then(logo => {
        this.setState({ logo: logo, logoerror: null });
      })
      .catch(error => {
        this.setState({ logoerror: error });
        console.log("error getting logo image: ", error.message);
      });

    loadChartForStock(enteredSymbol)
      .then(chartResult => {
        this.setState({ chartResults: chartResult, error: null });
      })
      .catch(error => {
        if (error.response.status === 404) {
          error = new Error(`The stock symbol '${enteredSymbol}' does not exist`);
        }
        this.setState({ error: error });
        console.error("Error loading quote: ", error);
      });
    loadRecentNewsForStock(enteredSymbol)
      .then(newsItem => {
        this.setState({ newsItems: newsItem, error: null })
      })
      .catch(error => {
        if (error.response.status === 404) {
          error = new Error(`The stock symbol '${enteredSymbol}' does not exist`)
        }
        this.setState({ error: error })
        console.error("Error loading quote: ", error)
      }
    )
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

  onMouseEnterClearForm = event => {
    this.setState({
      enteredSymbol: ''
    });
  }

  // Render is called whenever the state changes
  render() {
    const { error, enteredSymbol, quote, logoerror, logo, newsItems, searchHistory, chartResults, time } = this.state;

    return <div className="App">
        <header className="App-header">
          <img src={file} className="App-logo" alt="logo" />
          <h1 className="App-title">React Share Prices</h1>
        </header>
        <label>
          <input value={enteredSymbol} placeholder={enteredSymbol} aria-label="Symbol" onChange={this.onChangeEnteredSymbol} onKeyDown={this.onKeyDownPressEnter} onClick={this.onMouseEnterClearForm} />
          <button className="ml-1" onClick={this.loadQuote}>
            Load Quote
          </button>
        </label>
        {!!logoerror && <p>{logoerror.message}</p>}
        {!!error && <p>{error.message}</p>}
        <StockLogo {...logo} />
        {!!quote ? <StockInfo {...quote} /> : <p>Loading...</p> // Tell the component that all of 'quote's' key value pairs will also be it's key value pairs
        }
        <br />
        <div className="performance item">
        <h2>Performance</h2>
        <LineChart className="LineChart" width={1000} height={400} data={chartResults} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="label" height={60} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="high" stroke="#7F3C8D" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="low" stroke="#11A579" />
          <Line type="monotone" dataKey="open" stroke="#3969AC" />
          <Line type="monotone" dataKey="close" stroke="#F2B701" />
        </LineChart>
        </div>
        <div className="table item">
        <h2>Six Week Table</h2>
        <Table>
          {!!chartResults.length > 0 &&
            chartResults.map(row => <TableRow key={row.call} {...row} />)}
        </Table>
        </div>
        <div className="news item">
        <h2>Latest News</h2>
        <ol>
          {!!newsItems.length > 0 &&
            newsItems.map(item => <NewsItem key={item.call} {...item} />)}
        </ol>
        </div>
        <h6>Timestamp: {time}</h6>
        <h2>Search History</h2>
        <ol>
          {!!searchHistory.length > 0 &&
            searchHistory.map(item => (
              <SearchItem key={item.call} item={item} />
            ))}
        </ol>
      </div>;
  }
}

export default App;
