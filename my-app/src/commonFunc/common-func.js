export const objSity = (data) => {
  return {
    name: data.name,
    id: data.id,
    coord: {
      lon: data.coord.lon,
      lat: data.coord.lat,
    },
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

const objCityHourly = (data) => {
  let newArrayHourly = data.hourly.map((tempHour) => {
    return { temp: roundTheNumber(tempHour.temp) };
  });
  return {
    lat: data.lat,
    lon: data.lon,
    hourly: newArrayHourly,
  };
};

export const findCityOnHourly = (lat, lon, arrayHourlyWeather) => {
  for (let i = 0; i < arrayHourlyWeather.length; i++) {
    if (
      arrayHourlyWeather[i].lat === lat &&
      arrayHourlyWeather[i].lon === lon
    ) {
      return arrayHourlyWeather[i];
    }
  }
};

const cityInState = (state, objCity, parametr) =>
  state.find((city) => city[parametr] === objCity[parametr]);

const roundTheNumber = (num) => {
  return Math.round(num);
};

const setUTCTime = (timeUtc) => {
  const sec = timeUtc;
  const date = new Date(sec * 1000);
  return date.toLocaleTimeString();
};

export const updateCityWeatherInState = (
  array,
  objCityUp,
  parametr,
  method
) => {
  return array.map((city) => {
    if (city[parametr] === objCityUp[parametr]) {
      city = method(objCityUp);
    }
    return city;
  });
};

export const setHourlyWeatherCity = (state, objHourlyWeather) => {
  if (!cityInState(state.hourlyWeatherCities, objHourlyWeather, "lat")) {
    return [...state.hourlyWeatherCities, objCityHourly(objHourlyWeather)];
  } else {
    return updateCityWeatherInState(
      state.hourlyWeatherCities,
      objHourlyWeather,
      "lat",
      objCityHourly
    );
  }
};

export const checkAndAddCityInState = (state, objCityUp) => {
  if (!cityInState(state.cities, objCityUp, "name")) {
    return [...state.cities, objSity(objCityUp)];
  } else {
    return updateCityWeatherInState(state.cities, objCityUp, "id", objSity);
  }
};

export const deleteCityWeatherInStore = (state, objCity) => {
  return state.cities.filter((city) => city !== objCity);
};
