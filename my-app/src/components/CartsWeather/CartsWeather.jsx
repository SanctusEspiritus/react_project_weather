import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import {
  deleteCityCartInStore
} from "../../redux/weather-reducer";
import { Cart } from "./Cart/Cart";
import style from "./CartsWeather.module.css";

class CartsWeather extends React.Component {
  state = {
    cities: [],
  };

  componentDidMount() {
    let cities = localStorage.getItem("cities");
    if (localStorage.getItem("cities") !== null) {
      cities = JSON.parse(cities);
      this.props.addCityInState(cities);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cities !== this.props.cities) {
      this.setCitiesState(this.props.cities);
    }
  }

  setCitiesState = (propsCities) => {
    if (
      propsCities.length > 0 ||
      propsCities.length !== this.state.cities.length
    ) {
      let arrayCities = [];
      propsCities.forEach((city) => arrayCities.push(city));
      this.setState(() => {
        return {
          cities: []
        };
      });
      arrayCities.forEach((city) => this.state.cities.push(city));
      localStorage.setItem("cities", JSON.stringify(this.state.cities));
    }
  };

  addCityCart = (data) => {
    this.props.addCityInState(data.city);
  };

  updateCityCart = (cityName) => {
    this.props.updateCityWeather(cityName, true);
  };

  deleteCityCart = (objCity) => {
    this.props.deleteCityCartSTR(objCity);
  };

  render() {
    return (
      <div>
        <FormAddCityRedux onSubmit={this.addCityCart} />
        <div className={style.cartsWeather}>
          {this.props.cities.map((city) => (
            <Cart
              key={city.id}
              city={city}
              updateCityCart={this.updateCityCart}
              deleteCityCart={this.deleteCityCart}
            />
          ))}
        </div>
      </div>
    );
  }
}

const formAddCity = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={style.formAddCity}>
      <Field name={"city"} component={"input"} placeholder={"Write city..."} />
      <button>Add city</button>
    </form>
  );
};

const FormAddCityRedux = reduxForm({ form: "addCity" })(formAddCity);

let mapStateToProps = (state) => {
  return {
    cities: state.weather.cities,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addCityInState: (cities) => { dispatch({type: 'ADD_CITIES', cities}) },
    updateCityWeather: (cities, update) => { dispatch({type: 'UPDATES_CITIES', cities, update}) },
    deleteCityCartSTR: (objCity) => { dispatch(deleteCityCartInStore(objCity)) }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(CartsWeather);
