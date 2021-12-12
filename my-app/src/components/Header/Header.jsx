import style from "./Header.module.css";
import logo from "../../images/weather_logo.png"


export const Header = (props) => {
    return (
        <header className={style.header}>
            <div className={style.header_logo}><img src={logo} /></div>
            <div className={style.header_info}>Current weather information by city</div>
        </header>
    );
}