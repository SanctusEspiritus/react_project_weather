import { objSity } from "../commonFunc/common-func";
import { weatherAPI } from "../DAL/api";

const ADD_CITY_WEATHER = "weather-reducer/ADD-CITY-WEATHER";

let initialState = {
    sities: []
}

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CITY_WEATHER: {
            return {
                ...state,
                sities: [...state.sities, objSity(action.data)]
            }
        }
        default:
            return state;
    }
}

export const addCityInState = (data) => ({ type: ADD_CITY_WEATHER, data: data.data });

export const getCityWeatherDetail = (city) => async (dispatch) => {
    let data = await weatherAPI.getCityWeather(city);
    dispatch(addCityInState(data));
};

export default weatherReducer;