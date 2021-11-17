import { useState, useCallback } from "react";

function GetWeather(props) {
	const [display, setDisplay] = useState({});
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	const fetchWeather = async (query) => {
		setLoading(true);
		console.log(query);
		const appid = "599f9ab00f5ffd6eeb1a6bf54606a714";
		try {
			const response = await fetch(
				`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appid}`
			);
			setLoading(false);

			if (!response.ok) {
				setError(true);
				console.log("error");
				throw new Error("Something went wrong!");
			}

			const data = await response.json();
			console.log(data);

			const displayWeather = {
				city: data.name,
				weather: data.weather[0].main,
				temp: data.main.temp,
			};
			setDisplay(displayWeather);
		} catch (error) {
			console.log(error);
		}
	};


	if (props.location.length > 0) {
		fetchWeather(props.location);
	}

	let show;

	if (!error && display) {
		show = (
			<div>
				<h1>{display.city}</h1>
				<p>{display.weather} </p>
				<p>{display.temp} </p>
			</div>
		);
	}

	if (error) {
		show = <p>Error</p>;
	}

	if (loading) {
		show = <p>Loading...</p>;
	}

	return <div>{show}</div>;
}

export default GetWeather;
