import { useEffect, useState, useCallback } from "react";
import classes from "./DisplayWeather.module.css";

function DisplayWeather(props) {
	const [display, setDisplay] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const getWeatherByCity = async (query, appid) => {
		return fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${query.city}&appid=${appid}`
		);
	};

	const getWeatherByGeolocation = async (query, appid) => {
		return fetch(
			`http://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&appid=${appid}`
		);
	};

	const fetchWeather = useCallback(async (query) => {
		setError(false);
		const appid = "599f9ab00f5ffd6eeb1a6bf54606a714";
		try {
			let response;
			if (query.method === "city") {
				setLoading(true);
				response = await getWeatherByCity(query, appid);
			} else if (query.method === "geo") {
				setLoading(true);
				response = await getWeatherByGeolocation(query, appid);
			}

			if (!response.ok) {
				setLoading(false);
				setError(true);
				throw new Error("No valid response");
			}
			const data = await response.json();
			console.log(data);

			setLoading(false);
			setDisplay({
				city: data.name,
				weather: data.weather[0].main,
				temp: `${(data.main.temp - 272).toFixed(0)}°C`,
				icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
			});
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => fetchWeather(props.get), [fetchWeather, props.get]);

	let show;

	if (loading) {
		show = <p>Loading...</p>;
	}
	if (!loading && !error) {
		show = (
			<section className={classes.section}>
				<h1>{display.city}</h1>
				<div>{display.weather}</div>
				<div>{display.temp}</div>
				<div>
					<img src={display.icon} alt={display.weather} />{" "}
				</div>
			</section>
		);
	}
	if (error) {
		show = <p>Something went wrong...</p>;
	}

	return show;
}

export default DisplayWeather;
