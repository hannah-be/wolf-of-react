This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# React Share Prices
Learning how to use react with APIs.

## Setup
- create react-app
- create StockInfo.js component
- add state, and get that state to render
- `yarn add axios` to install axios: Promise based HTTP client for the browser and node.js 
- create `api` folder within `src` and add a file for grabbing the API data - in this case, from IEX: `iex.js`
- follow axios documentation to setup get requests
- use `componentDidMount()` to get the data to render when loaded

## Add user input field
1. Get the input field to render
2. Add the input data to state
3. Get the state to respond to user interaction

##Set challenges to work through
1. Load and display logo for symbol using: https://iextrading.com/developer/docs/#logo
2. Add a history of previously loaded quotes
3. Add list of recent news using: https://iextrading.com/developer/docs/#news
4. Add 6 month table using: https://iextrading.com/developer/docs/#chart
5. Add 6 month chart using: https://iextrading.com/developer/docs/#chart
   Nice charting library in React: http://recharts.org/#/en-US/guide/getting-started
