import { createAction, createReducer } from "@reduxjs/toolkit";
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


const addCityInState = createAction(ADD_CITY_WEATHER);
const updateCityWeather = createAction(UPDATE_CITY_WEATHER);
const addOrUpdateHourlyCityWeather = createAction(ADD_OR_UPDATE_WEATHER_HOURLY);
export const deleteCityCartInStore = createAction(DELETE_CITY_WEATHER);

const weatherReducer = createReducer({
    cities: [],
    hourlyWeatherCities: [],
}, (builder) => {
    builder.addCase(addCityInState, (state, action) => {
        state.cities = checkAndAddCityInState(state, action.payload.data);
    }).addCase(updateCityWeather, (state, action) => {
        state.cities = updateCityWeatherInState(
            state.cities,
            action.payload.data,
            "id",
            objSity
        );
    }).addCase(addOrUpdateHourlyCityWeather, (state, action) => {
        state.hourlyWeatherCities = setHourlyWeatherCity(state, action.payload.data);
    }).addCase(deleteCityCartInStore, (state, action) => {
        state.cities = deleteCityWeatherInStore(state, action.payload);
    }).addDefaultCase((state, action) => {})
})

export const getCityWeatherDetail =
    (city, update = false) =>
    async(dispatch) => {
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

export const getHourlyWeather = (lat, lon) => async(dispatch) => {
    let dataHourly = await weatherAPI.getCityHourWeather(lat, lon);
    dataHourly.data.hourly.splice(0, 24);
    dispatch(addOrUpdateHourlyCityWeather(dataHourly));
};

export default weatherReducer;