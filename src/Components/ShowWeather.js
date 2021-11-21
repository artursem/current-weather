import { useState, useCallback } from "react";
import DisplayWeather from "./DisplayWeather";
import PickLocation from "./PickLocation";

function ShowWeather() {
	const [location, setLocation] = useState("");
	const [display, setDisplay] = useState({});
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	const handleSearch = (location) => {
		setLocation(location);
	};

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

			setDisplay({
				city: data.name,
				weather: data.weather[0].main,
				temp: data.main.temp,
			});
		} catch (error) {
			console.log(error);
		}
	};

	if (location.length > 0) {
		console.log("fetch weather ", location);
		fetchWeather(location);
	}

	return (
		<div>
			<PickLocation onSearch={handleSearch} />
			{location && <DisplayWeather show={display} />}
		</div>
	);
}

export default ShowWeather;
