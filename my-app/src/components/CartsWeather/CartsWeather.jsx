import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { getCityWeatherDetail, updateCities } from "../../redux/weather-reducer";
import { Cart } from "./Cart/Cart";
import style from "./CartsWeather.module.css";

class CartsWeather extends React.Component {

    state = {
        cities: []
    }

    componentDidMount() {
        let cities = localStorage.getItem("cities");
        if (localStorage.getItem("cities") !== null) {
            cities = JSON.parse(cities);
            cities.forEach((city) => {this.state.cities.push(city)});
            this.props.updateCities(this.state.cities);
        }
    }

    componentDidUpdate() {
        if (this.state.cities.length !== this.props.cities.length) {
            this.setCitiesState(this.props.cities);
        }
    }

    setCitiesState = (propsCities) => {
        if (propsCities.length > 0) {
            this.state.cities.push(propsCities[propsCities.length - 1]);
            localStorage.setItem('cities', JSON.stringify(this.state.cities));
        }
    };

    addCityCart = (data) => {
        this.props.getCityWeatherDetail(data.city);
    }

    render() {
        return (
            <div>
                <FormAddCityRedux onSubmit={this.addCityCart} />
                <div className={style.cartsWeather}>
                    {
                        this.props.cities.map(sity =>
                            <Cart cityName={sity.name}
                                weatherIcon={`http://openweathermap.org/img/w/${sity.weather.icon}.png`}
                                weatherMain={sity.weather.main}
                                weatherTemp={sity.main.temp}
                                weatherDescription={sity.weather.description} />)
                    }
                </div>
            </div>
        )
    }
}

const formAddCity = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.formAddCity}>
            <Field name={"city"} component={"input"} placeholder={"Write city..."} />
            <button>Add city</button>
        </form>
    )
}

const FormAddCityRedux = reduxForm({ form: "addCity" })(formAddCity);

let mapStateToProps = (state) => {
    return {
        cities: state.weather.cities
    }
}

export default compose(
    connect(mapStateToProps, { getCityWeatherDetail, updateCities }))
    (CartsWeather);