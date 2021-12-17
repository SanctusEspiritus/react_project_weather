import React from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import CartsWeather from "./components/CartsWeather/CartsWeather";
import CartWeatherDetailContainer from "./components/CartsWeather/CartDetail/CartDetailContainer";

const App = () => {
  return (
    <div className="pageWeather">
      <div className="pageWeather_container">
        <Header />
        <div className="cartsWeather">
          <Routes>
            <Route path="/" element={<CartsWeather />} />
            <Route path="/weather_detail" element={<CartWeatherDetailContainer />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
