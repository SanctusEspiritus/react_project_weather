import { createAction, createReducer } from "@reduxjs/toolkit";
import {
    checkAndAddCityInState,
    deleteCityWeatherInStore,
    objSity,
    setHourlyWeatherCity,
    updateCityWeatherInState,
} from "../commonFunc/common-func";

const ADD_CITY_WEATHER = "weather-reducer/ADD-CITY-WEATHER";
const UPDATE_CITY_WEATHER = "weather-reducer/UPDATE_CITY_WEATHER";
const DELETE_CITY_WEATHER = "weather-reducer/DELETE_CITY_WEATHER";
const ADD_OR_UPDATE_WEATHER_HOURLY =
    "weather-reducer/ADD_OR_UPDATE_WEATHER_HOURLY";

const initialState = {
    cities: [],
    hourlyWeatherCities: [],
};

export const addCityInState = createAction(ADD_CITY_WEATHER);
export const updateCityWeather = createAction(UPDATE_CITY_WEATHER);
export const addOrUpdateHourlyCityWeather = createAction(ADD_OR_UPDATE_WEATHER_HOURLY);
export const deleteCityCartInStore = createAction(DELETE_CITY_WEATHER);

const weatherReducer = createReducer(initialState, (builder) => {
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

export default weatherReducer;