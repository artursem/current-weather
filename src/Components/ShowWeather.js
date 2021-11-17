import { useState, useCallback } from "react";
import GetWeather from "./GetWeather";
import PickLocation from "./PickLocation";

function ShowWeather() {
	const [location, setLocation] = useState("");

	const handleSearch = (location) => {
		setLocation(location);
	};

	return (
		<div>
			<PickLocation onSearch={handleSearch} />
			{location && <GetWeather location={location} />}
		</div>
	);
}

export default ShowWeather;
