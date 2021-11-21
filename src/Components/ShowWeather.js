import { useState, useCallback, useEffect } from "react";
import DisplayWeather from "./DisplayWeather";
import PickLocation from "./PickLocation";

function ShowWeather() {
	const [location, setLocation] = useState("");
	const handleSearch = (location) => {
		setLocation(location);
	};

	return (
		<div>
			<PickLocation onSearch={handleSearch} />
			{location.length>0 && <DisplayWeather get={location} />}
		</div>
	);
}

export default ShowWeather;
