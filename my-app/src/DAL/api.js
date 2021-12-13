import axios from "axios";

const api_key = "b9e3bb21ac9a42f8677cc7d5d3a02c8a";

const instance = axios.create({
    baseURL: "http://api.openweathermap.org/data/2.5/"
});

export const weatherAPI = {
    
    getCityWeather(city) {
        return instance.get(`/weather?q=${city}&appid=${api_key}&units=metric`)
            .then(response => {
                return response;
            });
    }
    
}