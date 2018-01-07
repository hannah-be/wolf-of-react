import React, { Component } from 'react';
import logo from './piggy-bank.png';
import './App.css';
import StockInfo from './components/StockInfo'
import Time from './components/Time'
import { loadQuoteForStock } from './api/iex'
// import { fetchCurrentTime } from './api/worldclock'


class App extends Component {
  state = {
    error: null,
    quote: null,
    time: ''
  };

  // setInterval(() => {
  //       duration = moment.duration(
  //         duration.asMilliseconds() - interval,
  //         'milliseconds'
  //       )

  componentDidMount() {
    loadQuoteForStock("smsft")
      .then(quote => {
        this.setState({ quote: quote });
    }).catch((error) => {
      if (error.response.status === 404) {
        error = new Error("That stock symbol does not exist.")
      }
      this.setState({ error: error })
      console.log("Error loading quote", error)
    })

  //   fetchCurrentTime()
  //     .then(res => {
  //       this.intervalId = setInterval(() => fetchCurrentTime(
  //         this.setState({ time: res.currentDateTime })
          
  //       ), 10000);
  //       console.log("time", this.state.time)
  //     });
  //   // this.fetchCurrentTime();
  //   // this.setState({ countdownText: months + days + hours + mins + secs })
  //   //   }, interval)
  }


  render() {
    const { error, quote, time } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Share Prices</h1>
        </header>
        <Time utc={time} />
        {
          !!error && 
            <p>{ error.message }</p>
        }
        {!!quote ? (
          <StockInfo
            // Tell the component that all of 'quote's' key value pairs will also be it's key value pairs
            {...quote}
            // Equivalent to:
            // symbol={ quote.symbol }
            // companyName={ quote.companyName }
            // primaryExchange={ quote.primaryExchange }
            // latestPrice={ quote.latestPrice }
            // latestSource={ quote.latestSource }
            // week52High={ quote.week52High }
            //  week52Low={ quote.week52Low }
          />
        ) : (
          <p>Loading...</p>
        )}
        <small>
          <p>
            Icon made by{" "}
            <a href="http://www.freepik.com" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>. Licensed by{" "}
            <a
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0"
            >
              CC 3.0 BY
            </a>
          </p>
        </small>
      </div>
    );
  }
}

export default App;
