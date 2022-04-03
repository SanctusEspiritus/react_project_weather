import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { findCityOnHourly } from "../../../commonFunc/common-func";
import { addOrUpdateHourlyCityWeather } from "../../../redux/weather-reducer";
import { CartDetail } from "./CartDetail";

const CartWeatherDetailContainer = (props) => {
  const location = useLocation();
  const dataCity = location.state.city;

  useEffect(() => {
    props.addOrUpdateHourlyCityWeather(dataCity.coord.lat, dataCity.coord.lon);
  });
  
  let cityWeatherHourly = findCityOnHourly(
    dataCity.coord.lat,
    dataCity.coord.lon,
    props.hourlyWeatherCities
  );

  return (
    <CartDetail
      dataCity={dataCity}
      hourlyWeatherCities={cityWeatherHourly}
    />
  );
};

const mapStateToProps = (state) => ({
  hourlyWeatherCities: state.weather.hourlyWeatherCities,
});

let mapDispatchToProps = (dispatch) => {
  return {
    addOrUpdateHourlyCityWeather: (lat, lon) => { dispatch({type: 'ADD_HOURLY', lat, lon})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartWeatherDetailContainer);
