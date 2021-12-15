import React from 'react';
import { useLocation } from "react-router";
import { NavLink } from 'react-router-dom';
import style from "./CartDetail.module.css"
export const CartWeatherDetail = () => {

    const location = useLocation();
    const dataCity = location.state.city;

    return (
        <div className={style.weather_detail}>
            <div>Country: {dataCity.sys.country}</div>
            <div>City: {dataCity.name}</div>
            <div className={style.weather_desc}>
                <img src={`http://openweathermap.org/img/w/${dataCity.weather.icon}.png`} alt={"weather"}/> {dataCity.weather.description}
            </div>
            <div>Wind direction: {dataCity.wind.deg}°</div>
            <div>Wind gust: {dataCity.wind.gust} meters per second</div>
            <div>Wind speed: {dataCity.wind.speed} meters per second</div>
            <div>Temperature: {dataCity.main.temp}°</div>
            <div>Temperature feels like: {dataCity.main.feels_like}°</div>
            <div>Humidity: {dataCity.main.humidity}%</div>
            <div>Atmospheric pressure: {dataCity.main.pressure} hPa</div>
            <div>Maximum temperature: {dataCity.main.temp_max}°</div>
            <div>Minimum temperature: {dataCity.main.temp_min}°</div>
            <div>Clouds: {dataCity.clouds.all}%</div>
            <div>Sunrise time: {dataCity.sys.sunrise} </div>
            <div>Sunset time: {dataCity.sys.sunset} </div>
            <NavLink to={"/"}>Back</NavLink>
        </div>
    );

}
