import axios from 'axios' 

const timeAPI = axios.create({
  baseURL: "http://worldclockapi.com/api/json/utc/now"
});

export function fetchCurrentTime() {
  return timeAPI.get()
  .then(res => {
    return res.data.currentDateTime
  });
}

// getTime() {
//         // let timeAPI = axios.create({ baseURL: `http://worldclockapi.com/api/json/utc/now`})
//         timeAPI.get()
//         .then((res) => {
//             console.log(res)
//         })
//     }