import { NavLink } from "react-router-dom";
import style from "./Cart.module.css";

export const Cart = (props) => {
  
  return (
    <div className={`${style.parent_cart} ${style.anim_show}`}>
      <button
        onClick={() => {
          props.deleteCityCart(props.city);
        }}
        className={`${style.btn_update} ${style.btn_delete}`}
      >
        Delete city weather
      </button>
      <NavLink to={"/weather_detail"} state={{ city: props.city }}>
        <div className={style.cart}>
          <div className={style.cityName}>{props.city.name}</div>
          <div className={style.weatherMain}>
            <span className={style.weatherIcon}>
              <img
                src={`http://openweathermap.org/img/w/${props.city.weather.icon}.png`}
                alt={"weather icon"}
              />
            </span>
            <span className={style.weatherMain}>{props.city.weather.main}</span>
          </div>
          <div className={style.weatherDescription}>
            Decription: {props.city.weather.description}
          </div>
          <div className={style.weatherTemp}>
            Temperature: {props.city.main.temp} &#xb0;
          </div>
        </div>
      </NavLink>
      <button
        className={style.btn_update}
        onClick={() => {
          props.updateCityCart(props.city.name);
        }}
      >
        Update weather in city
      </button>
    </div>
  );
};
