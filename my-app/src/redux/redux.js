import { reducer as formReducer } from "redux-form";
import weatherReducer from "./weather-reducer";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, combineReducers, createStore } from "redux";
import sagasWeatherWatcher from "../saga/saga";

const sagaMiddleware = createSagaMiddleware();

let reducers = combineReducers({
    weather: weatherReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagasWeatherWatcher);

export default store;