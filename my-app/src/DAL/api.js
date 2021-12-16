import axios from "axios";

const api_key = "1bb35dc6b9f68930d3e5d62cc9fa8ae7";

const instance = axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5/",
});

export const weatherAPI = {
  getCityWeather(city) {
    return instance
      .get(`/weather?q=${city}&appid=${api_key}&units=metric`)
      .then((response) => {
        return response;
      });
  },
  getCityHourWeather(lat, lon) {
    return instance
      .get(
        `/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=daily,minutely,alerts,current&cnt=1&appid=${api_key}`
      )
      .then((response) => {
        return response;
      });
  },
};
