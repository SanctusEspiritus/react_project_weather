import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import weatherReducer from "./weather-reducer";
import {reducer as formReducer} from "redux-form";

let reducers = combineReducers({
    weather: weatherReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;