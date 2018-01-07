import axios from 'axios'

const api = axios.create({
  baseURL: "https://api.iextrading.com/1.0/stock/"
});

// Wrap .get in a function so it doesn't execute immediately on loading
export function loadQuoteForStock(symbol) {
  return api.get(`${symbol}/quote`)
    .then(res => {
//this is like going down a level because what we get returned is one level above what we wanted, ie, this gives us the json data instead of an object comprising that data
      return res.data;
    });
}