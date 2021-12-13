import { objSity } from "../commonFunc/common-func";
import { weatherAPI } from "../DAL/api";

const ADD_CITY_WEATHER = "weather-reducer/ADD-CITY-WEATHER";
const UPDATE_CITIES = "weather-reduce/UPDATE_CITIES";

let initialState = {
    cities: []
}

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CITY_WEATHER: {
            return {
                ...state,
                cities: [...state.cities, objSity(action.data)]
            }
        }
        case UPDATE_CITIES: {
            return {
                ...state,
                cities: action.cities
            }
        }
        default:
            return state;
    }
}

const addCityInState = (data) => ({ type: ADD_CITY_WEATHER, data: data.data });
export const updateCities = (cities) => ({ type: UPDATE_CITIES, cities });

export const getCityWeatherDetail = (city) => async (dispatch) => {
    let data = await weatherAPI.getCityWeather(city);
    dispatch(addCityInState(data));
};

export default weatherReducer;