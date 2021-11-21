import { useCallback, useEffect, useState } from "react";

function DisplayWeather(props) {
	const [display, setDisplay] = useState({});
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	const fetchWeather = async (query) => {
		setError(null)
		setLoading(true);
		const appid = "599f9ab00f5ffd6eeb1a6bf54606a714";
		try {
			const response = await fetch(
				`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${appid}`
			);

			if (!response.ok) {
				setLoading(false);
				setError(error.message);
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
	};

	useEffect(() => fetchWeather(props.get), [props.get]);

	let show;

	if (loading) {
		show = <p>Loading...</p>;
	}
	if (!loading && !error) {
		show = (
			<section>
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
		show = <p>Something went wrong...</p>
	}

	return show;
}

export default DisplayWeather;
