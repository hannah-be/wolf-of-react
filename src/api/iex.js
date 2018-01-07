import axios from 'axios'

const api = axios.create({
  baseURL: "https://api.iextrading.com/1.0/stock/"
});

// Wrap .get in a function so it doesn't execute immediately on loading
export function loadQuoteForStock(symbol) {
  return api.get(`${symbol}/quote`)
    .then(res => {
      return res.data
    });
}