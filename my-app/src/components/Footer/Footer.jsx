import style from "./Footer.module.css";
import heart from "../../images/heart.png";

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <span>Powered by the</span>
      <img src={heart} alt={"heart"} />
    </footer>
  );
};
