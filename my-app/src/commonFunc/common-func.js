export const objSity = (data) => {
    return {
        name: data.name,
        id: data.id,
        weather: {
            main: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon
        },
        main: {
            temp: roundTheNumber(data.main.temp),
            feels_like: roundTheNumber(data.main.feels_like),
            temp_min: roundTheNumber(data.main.temp_min),
            temp_max: roundTheNumber(data.main.temp_max),
            pressure: data.main.pressure,
            humidity: data.main.humidity
        },
        visibility: data.visibility,
        wind: {
            speed: data.wind.speed,
            deg: data.wind.deg,
            gust: data.wind.gust
        },
        clouds: {
            all: data.clouds.all
        },
        sys: {
            id: data.sys.id,
            country: data.sys.country,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset
        }
    }
}

const roundTheNumber = (num) => {
    return Math.round(num);
}