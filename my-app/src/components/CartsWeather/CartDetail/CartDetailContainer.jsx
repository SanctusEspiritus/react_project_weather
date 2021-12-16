import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { findCityOnHourly } from "../../../commonFunc/common-func";
import { CartWeatherDetail } from "./CartDetail";

const CartWeatherDetailContainer = (props) => {
  const location = useLocation();
  const dataCity = location.state.city;

  let cityWeatherHourly = findCityOnHourly(dataCity.coord.lat, dataCity.coord.lon, props.hourlyWeatherCities);
  return <CartWeatherDetail dataCity={dataCity} cityWeatherHourly={cityWeatherHourly}/>;

};

const mapDispatchToProps = (state) => ({
  hourlyWeatherCities: state.weather.hourlyWeatherCities,
});

export default connect(mapDispatchToProps)(
  CartWeatherDetailContainer
);
