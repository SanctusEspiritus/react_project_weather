import { reducer as formReducer } from "redux-form";
import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weather-reducer";

let reducer = {
    weather: weatherReducer,
    form: formReducer,
}

let store = configureStore({
    reducer
});

export default store;