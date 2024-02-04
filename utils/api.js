import axios from "axios";

export const ak = 'api_key=b908b69cbf1920367b43cf85750d64db';

export const BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTA4YjY5Y2JmMTkyMDM2N2I0M2NmODU3NTBkNjRkYiIsInN1YiI6IjY0ZmRlM2NiZmZjOWRlMGVlMjA4MDI0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jDFpJqCl56dyQkNaEgSac4Y9TWy-kp4Z5ISfTwBew7s';

const headers = {
   Authorization: "bearer " + TMDB_TOKEN,
}

export const fetchDataFromApi = async (url, params) => {
   try {
      const {data} = await axios.get(BASE_URL + url, {
         headers,
         params,
      })
      return data
   } catch(err) {
      console.log(err);
      return err;
   }
}