const objSity = (data) => {
  return {
    name: data.name,
    id: data.id,
    weather: {
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    },
    main: {
      temp: roundTheNumber(data.main.temp),
      feels_like: roundTheNumber(data.main.feels_like),
      temp_min: roundTheNumber(data.main.temp_min),
      temp_max: roundTheNumber(data.main.temp_max),
      pressure: data.main.pressure,
      humidity: data.main.humidity,
    },
    visibility: data.visibility,
    wind: {
      speed: data.wind.speed,
      deg: data.wind.deg,
      gust: data.wind.gust,
    },
    clouds: {
      all: data.clouds.all,
    },
    sys: {
      id: data.sys.id,
      country: data.sys.country,
      sunrise: setUTCTime(data.sys.sunrise),
      sunset: setUTCTime(data.sys.sunset),
    },
  };
};

const cityInState = (state, objCity) =>
  state.cities.find((city) => city.name === objCity.name);

const roundTheNumber = (num) => {
  return Math.round(num);
};

const setUTCTime = (timeUtc) => {
  const sec = timeUtc;
  const date = new Date(sec * 1000);
  return date.toLocaleTimeString();
};

export const updateCityWeatherInState = (state, objCity) => {
  return state.cities.map((city) => {
    if (city.id === objCity.id) {
      city = objSity(objCity);
    }
    return city;
  });
};

export const checkAndAddCityInState = (state, objCity) => {
  if (!cityInState(state, objCity)) {
    return [...state.cities, objSity(objCity)];
  } else {
    return updateCityWeatherInState(state, objCity);
  }
};

export const deleteCityWeatherInStore = (state, objCity) => {
  return state.cities.filter((city) => city !== objCity);
};
