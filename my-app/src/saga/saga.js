import { put, takeEvery, call } from "redux-saga/effects";
import { weatherAPI } from "../DAL/api";
import { addCityInState, addOrUpdateHourlyCityWeather, updateCityWeather } from "../redux/weather-reducer";

function* sagaGetCityWeatherDetail(action) {
    debugger
    if (typeof action.cities === "object") {
        for (let i = 0; i < action.cities.length; i++) {
            let data = yield call(weatherAPI.getCityWeather, action.cities[i].name);
            yield put(addCityInState(data));
        }
    } else {
        let data = yield call(weatherAPI.getCityWeather, action.cities);
        if (!action.update) {
            yield put(addCityInState(data));
        } else {
            yield put(updateCityWeather(data));
        }
    }
}

function* sagaGetHourlyWeather(action) {
    debugger
    let dataHourly = yield call(weatherAPI.getCityHourWeather, action.lat, action.lon);
    dataHourly.data.hourly.splice(0, 24);
    yield put(addOrUpdateHourlyCityWeather(dataHourly));
}

function* sagasWeatherWatcher() {
    yield takeEvery("ADD_CITIES", sagaGetCityWeatherDetail);
    yield takeEvery("UPDATES_CITIES", sagaGetCityWeatherDetail);
    yield takeEvery("ADD_HOURLY", sagaGetHourlyWeather);
}

export default sagasWeatherWatcher;