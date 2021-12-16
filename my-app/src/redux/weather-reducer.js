import {
  checkAndAddCityInState,
  deleteCityWeatherInStore,
  objSity,
  setHourlyWeatherCity,
  updateCityWeatherInState,
} from "../commonFunc/common-func";
import { weatherAPI } from "../DAL/api";

const ADD_CITY_WEATHER = "weather-reducer/ADD-CITY-WEATHER";
const UPDATE_CITY_WEATHER = "weather-reducer/UPDATE_CITY_WEATHER";
const DELETE_CITY_WEATHER = "weather-reducer/DELETE_CITY_WEATHER";
const ADD_OR_UPDATE_WEATHER_HOURLY =
  "weather-reducer/ADD_OR_UPDATE_WEATHER_HOURLY";

let initialState = {
  cities: [],
  hourlyWeatherCities: [],
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY_WEATHER: {
      return {
        ...state,
        cities: checkAndAddCityInState(state, action.data),
      };
    }
    case UPDATE_CITY_WEATHER: {
      return {
        ...state,
        cities: updateCityWeatherInState(
          state.cities,
          action.data,
          "id",
          objSity
        ),
      };
    }
    case DELETE_CITY_WEATHER: {
      return {
        ...state,
        cities: deleteCityWeatherInStore(state, action.objCityUp),
      };
    }
    case ADD_OR_UPDATE_WEATHER_HOURLY: {
      return {
        ...state,
        hourlyWeatherCities: setHourlyWeatherCity(state, action.data),
      };
    }
    default:
      return state;
  }
};

const addCityInState = (data) => ({ type: ADD_CITY_WEATHER, data: data.data });
const updateCityWeather = (data) => ({
  type: UPDATE_CITY_WEATHER,
  data: data.data,
});
const addOrUpdateHourlyCityWeather = (data) => ({
  type: ADD_OR_UPDATE_WEATHER_HOURLY,
  data: data.data,
});

export const deleteCityCartInStore = (objCityUp) => ({
  type: DELETE_CITY_WEATHER,
  objCityUp,
});

export const getCityWeatherDetail =
  (city, update = false) =>
  async (dispatch) => {
    if (typeof city === "object") {
      for (let i = 0; i < city.length; i++) {
        let data = await weatherAPI.getCityWeather(city[i].name);
        dispatch(addCityInState(data));
        getCityWeatherHourly(data.data.coord.lat, data.data.coord.lon);
      }
    } else {
      let data = await weatherAPI.getCityWeather(city);
      if (!update) {
        dispatch(addCityInState(data));
        getCityWeatherHourly(data.data.coord.lat, data.data.coord.lon);
      } else {
        dispatch(updateCityWeather(data));
        getCityWeatherHourly(data.data.coord.lat, data.data.coord.lon);
      }
    }
  };

const getCityWeatherHourly = (lat, lon) => async (dispatch) => {
  let data = await weatherAPI.getCityHourWeather(lat, lon);
  // The request always returns 2 days in advance, even if the parameter is set
  // so we exclude the data from the array of objects for another 1 day.
  data.data.hourly.splice(0, 24);
  dispatch(addOrUpdateHourlyCityWeather(data));
};

export default weatherReducer;
