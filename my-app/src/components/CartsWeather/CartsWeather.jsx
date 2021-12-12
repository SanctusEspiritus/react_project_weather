import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getCityWeatherDetail } from "../../redux/weather-reducer";
import { Cart } from "./Cart/Cart";
import style from "./CartsWeather.module.css";


class CartsWeather extends React.Component {

    componentDidMount() {
        this.props.getCityWeatherDetail("Kyiv");
        this.props.getCityWeatherDetail("Sumy");
    }

    componentDidUpdate() {
        
    }

    render() {
        return (
            <div className={style.cartsWeather}>
                {
                    this.props.sities.map(sity =>
                        <Cart cityName={sity.name}
                            weatherIcon={`http://openweathermap.org/img/w/${sity.weather.icon}.png`}
                            weatherMain={sity.weather.main}
                            weatherTemp={sity.main.temp}
                            weatherDescription={sity.weather.description} />)}
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        sities: state.weather.sities
    }
}

export default compose(
    connect(mapStateToProps, { getCityWeatherDetail }))
    (CartsWeather);