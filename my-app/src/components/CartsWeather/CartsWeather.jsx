import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { getCityWeatherDetail, updateCities, deleteCityCartInStore } from "../../redux/weather-reducer";
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

    componentDidUpdate(prevProps) {
        if (prevProps.cities !== this.props.cities) {
            this.setCitiesState(this.props.cities);
        }
    }

    setCitiesState = (propsCities) => {
        if (propsCities.length > 0 || propsCities.length !== this.state.cities.length) {
            let arrayCities = [];
            propsCities.forEach(city => arrayCities.push(city));
            this.state.cities.length = 0;
            arrayCities.forEach(city => this.state.cities.push(city));
            localStorage.setItem('cities', JSON.stringify(this.state.cities));
        }
    };

    addCityCart = (data) => {
        this.props.getCityWeatherDetail(data.city);
    }

    updateCityCart = (cityName) => {
        this.props.getCityWeatherDetail(cityName, true);
    }

    deleteCityCart = (objCity) => {
        this.props.deleteCityCartInStore(objCity);
    }

    render() {
        return (
            <div>
                <FormAddCityRedux onSubmit={this.addCityCart} />
                <div className={style.cartsWeather}>
                    {
                        this.props.cities.map(city =>
                            <Cart key={city.id}
                                city={city}
                                updateCityCart={this.updateCityCart}
                                deleteCityCart={this.deleteCityCart} />)
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
    connect(mapStateToProps, { getCityWeatherDetail, updateCities, deleteCityCartInStore }))
    (CartsWeather);