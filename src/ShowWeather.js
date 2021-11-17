import { useState } from "react";
import PickLocation from "./PickLocation";

function ShowWeather() {
	const [location, setLocation] = useState("Wrocław");
	const [weather, setWeather] = useState({});
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	const fetchWeather = async () => {
		const appid = "599f9ab00f5ffd6eeb1a6bf54606a714";
		const response = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=wroclaw&appid=${appid}`
		);
		const data = await response.json();
		setWeather({
			city: data.name,
			weather: data.weather[0].main,
			temp: data.main.temp,
		});
		console.log(data);
		return data;
	};

    const handleSearch = (location) => {
        fetchWeather(location)
    }

	return (
		<div>
			<PickLocation
            onSearch={handleSearch} />
			{/* <button onClick={fetchWeather}>show</button> */}
			<br />
			<h1>{weather.city}</h1>
			<p>{weather.weather}</p>
			<p>{weather.temp}</p>
		</div>
	);
}

export default ShowWeather;
