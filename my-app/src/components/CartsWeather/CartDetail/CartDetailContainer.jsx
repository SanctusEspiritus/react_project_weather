import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { findCityOnHourly } from "../../../commonFunc/common-func";
import { getHourlyWeather } from "../../../redux/weather-reducer";
import { CartDetail } from "./CartDetail";

const CartWeatherDetailContainer = (props) => {
  const location = useLocation();
  const dataCity = location.state.city;

  useEffect(() => {
    props.getHourlyWeather(dataCity.coord.lat, dataCity.coord.lon);
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

const mapDispatchToProps = (state) => ({
  hourlyWeatherCities: state.weather.hourlyWeatherCities,
});

export default connect(mapDispatchToProps, { getHourlyWeather })(CartWeatherDetailContainer);
