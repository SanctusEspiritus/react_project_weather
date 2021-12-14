import { checkAndAddCityInState, deleteCityWeatherInStore, updateCityWeatherInState } from "../commonFunc/common-func";
import { weatherAPI } from "../DAL/api";

const ADD_CITY_WEATHER = "weather-reducer/ADD-CITY-WEATHER";
const UPDATE_CITIES = "weather-reduce/UPDATE_CITIES";
const UPDATE_CITY_WEATHER = "weather-reduce/UPDATE_CITY_WEATHER";
const DELETE_CITY_WEATHER = "weather-reduce/DELETE_CITY_WEATHER";

let initialState = {
    cities: []
}

const weatherReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ADD_CITY_WEATHER: {
            return {
                ...state,
                cities: checkAndAddCityInState(state, action.data)
            }
        }
        case UPDATE_CITIES: {
            return {
                ...state,
                cities: action.cities
            }
        }
        case UPDATE_CITY_WEATHER: {
            return {
                ...state,
                cities: updateCityWeatherInState(state, action.data)
            }
        }
        case DELETE_CITY_WEATHER: {
            return {
                ...state,
                cities: deleteCityWeatherInStore(state, action.objCity)
            }
        }
        default:
            return state;
    }
}

const addCityInState = (data) => ({ type: ADD_CITY_WEATHER, data: data.data });
export const updateCities = (cities) => ({ type: UPDATE_CITIES, cities });
const updateCityWeather = (data) => ({ type: UPDATE_CITY_WEATHER, data: data.data });
export const deleteCityCartInStore = (objCity) => ({type: DELETE_CITY_WEATHER, objCity});

export const getCityWeatherDetail = (city, update = false) => async (dispatch) => {
    let data = await weatherAPI.getCityWeather(city);
    if (!update) {
        dispatch(addCityInState(data));
    } else {
        dispatch(updateCityWeather(data));
    }
};

export default weatherReducer;