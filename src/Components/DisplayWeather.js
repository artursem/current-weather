import { useCallback, useEffect, useState } from "react";

function DisplayWeather(props) {
	const [display, setDisplay] = useState({});
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	const fetchWeather = async (query) => {
		setLoading(true);
		const appid = "599f9ab00f5ffd6eeb1a6bf54606a714";
		try {
			const response = await fetch(
				`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appid}`
				);
	
				if (!response.ok) {
					setError(true)
					throw new Error('erororororo!')
				}
				const data = await response.json();
				console.log(data);
	
				setDisplay({
					city: data.name,
					weather: data.weather[0].main,
					temp: `${(data.main.temp-272).toFixed(0)}°C`,
				});

		} catch (error) {
			console.log(error);
		}

		};

		useEffect(() => fetchWeather(props.get), [props.get])

	return (
		<div>
			<div>{display.city}</div>
			<div>{display.weather}</div>
			<div>{display.temp}</div>
		</div>
	);
}

export default DisplayWeather;
