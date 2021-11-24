import { useState, useCallback } from "react";

const useRequest = () => {
	const [display, setDisplay] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const fetchWeather = useCallback(async (query) => {
		setError(false);
		const appid = "599f9ab00f5ffd6eeb1a6bf54606a714";
		try {
			let response;
			if (query.method === "city") {
				setLoading(true);
				response = await fetch(
					`http://api.openweathermap.org/data/2.5/weather?q=${query.city}&appid=${appid}`
				);
			} else if (query.method === "geo") {
				setLoading(true);
				response = await fetch(
					`http://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&appid=${appid}`
				);
			}

			if (!response.ok) {
				setLoading(false);
				setError(true);
				throw new Error("No valid response");
			}
			const data = await response.json();
			setLoading(false);
			setDisplay({
				city: data.name,
				weather: data.weather[0].main,
				temp: `${(data.main.temp - 272).toFixed(0)}°C`,
				icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
			});
		} catch (error) {
			// setError(true)
		}
	}, []);
	return { display, loading, error, fetchWeather };
};

export default useRequest;
