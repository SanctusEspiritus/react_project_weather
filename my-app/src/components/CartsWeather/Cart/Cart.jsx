import { NavLink } from "react-router-dom";
import style from "./Cart.module.css";

export const Cart = (props) => {
    return (
        <NavLink to={"/weather_detail"}>
            <div className={style.cart}>
                <div className={style.cityName}>{props.cityName}</div>
                <div className={style.weatherMain}>
                    <span className={style.weatherIcon}><img src={props.weatherIcon} /></span>
                    <span className={style.weatherMain}>{props.weatherMain}</span>
                </div>
                <div className={style.weatherDescription}>Decription: {props.weatherDescription}</div>
                <div className={style.weatherTemp}>Temperature: {props.weatherTemp} &#xb0;</div>
            </div>
        </NavLink>
    );
}