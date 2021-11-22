import { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import PickLocation from "./PickLocation";
import classes from "./ShowWeather.module.css";

function ShowWeather() {
	const [location, setLocation] = useState({});
	const handleSearch = (location) => {
		setLocation(location);
	};

	return (
		<div className={classes.card}>
			<PickLocation onSearch={handleSearch} />
			{location && <DisplayWeather get={location} />}
		</div>
	);
}

export default ShowWeather;
