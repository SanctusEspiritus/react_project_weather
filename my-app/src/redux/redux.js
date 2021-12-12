import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import weatherReducer from "./weather-reducer";

let reducers = combineReducers({
    weather: weatherReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;