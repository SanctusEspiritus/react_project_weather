import {
  checkAndAddCityInState,
  deleteCityWeatherInStore,
  updateCityWeatherInState,
} from "../commonFunc/common-func";
import { weatherAPI } from "../DAL/api";

const ADD_CITY_WEATHER = "weather-reducer/ADD-CITY-WEATHER";
const UPDATE_CITY_WEATHER = "weather-reduce/UPDATE_CITY_WEATHER";
const DELETE_CITY_WEATHER = "weather-reduce/DELETE_CITY_WEATHER";

let initialState = {
  cities: [],
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
        cities: updateCityWeatherInState(state, action.data),
      };
    }
    case DELETE_CITY_WEATHER: {
      return {
        ...state,
        cities: deleteCityWeatherInStore(state, action.objCity),
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
export const deleteCityCartInStore = (objCity) => ({
  type: DELETE_CITY_WEATHER,
  objCity,
});

export const getCityWeatherDetail =
  (city, update = false) =>
  async (dispatch) => {
    if (typeof city === "object") {
      for (let i = 0; i < city.length; i++) {
        let data = await weatherAPI.getCityWeather(city[i].name);
        dispatch(addCityInState(data));
      }
    } else {
      let data = await weatherAPI.getCityWeather(city);
      if (!update) {
        dispatch(addCityInState(data));
      } else {
        dispatch(updateCityWeather(data));
      }
    }
  };

export default weatherReducer;
