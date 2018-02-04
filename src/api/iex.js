import axios from 'axios'

const api = axios.create({
  baseURL: "https://api.iextrading.com/1.0/stock/"
});

// Wrap .get in a function so it doesn't execute immediately on loading
export const loadQuoteForStock = (symbol) => {
  return api.get(`${symbol}/quote`)
    .then(res => {
//this is like going down a level because what we get returned is one level above what we wanted, ie, this gives us the json data instead of an object comprising that data
      return res.data;
    });
}

export const loadQuoteForStockLogo = (symbol) => {
  return api.get(`${symbol}/logo`)
    .then(res => res.data);
}

export const loadRecentNewsForStock = (symbol) => {
  return api.get(`${symbol}/news/last/5`)
    .then(res => res.data)
}

export const loadChartForStock = (symbol) => {
  return api.get(`${symbol}/chart/1m`)
    .then(res => res.data)
}