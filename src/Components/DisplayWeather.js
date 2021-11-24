import { useEffect } from "react";
import useRequest from "../hooks/useRequest";
import classes from "./DisplayWeather.module.css";

function DisplayWeather(props) {
	const { display, loading, error, fetchWeather } = useRequest();

	useEffect(() => {
		fetchWeather(props.get);
	}, [fetchWeather, props.get]);

	let show;

	if (loading) {
		show = <p>Loading...</p>;
	}
	if (display && !loading && !error) {
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
