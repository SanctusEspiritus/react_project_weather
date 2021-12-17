import axios from "axios";

const api_key = "5698c7e16bc8064cc89e10aaee2d3afd";

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
