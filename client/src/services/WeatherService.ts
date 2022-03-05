import axios from "axios";
//TODO: Security Issue: Move token into .dotenv or some place not visible committed code
const TOKEN = "869682540ad02efbb61556be9435da6370477c60";
const BASE_URL = "https://api.waqi.info/feed/";

export default {
  getAQI(location: object) {
    return axios(`${BASE_URL}${location["city"]}/?token=${TOKEN}`);
  },
};
