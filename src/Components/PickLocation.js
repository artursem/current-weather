import { useRef } from "react";
import IconArrow from "./UI/IconArrow";
import IconSearch from "./UI/IconSearch";
import classes from "./PickLocation.module.css";

function PickLocation(props) {
	const locationInput = useRef("");
	const handleSubmit = (event) => {
		event.preventDefault();
		const location = locationInput.current.value;
		if (location.length > 0) {
			props.onSearch({
				method: "city",
				city: location,
				lat: null,
				lon: null,
			});
		}
	};

	const getCurrentPosition = () => {
		const success = (position) => {
			props.onSearch({
				method: "geo",
				city: "",
				lat: position.coords.latitude,
				lon: position.coords.longitude,
			});
		};
		navigator.geolocation.getCurrentPosition(success);
	};

	return (
		<form onSubmit={handleSubmit} className={classes.form}>
			<input
				type="search"
				ref={locationInput}
				placeholder="Search"
				className={classes.input}
			></input>
			<button type="submit" className={classes.button}>
				<IconSearch />
			</button>
			<button
				type="button"
				onClick={getCurrentPosition}
				className={classes.button}
			>
				<IconArrow />
			</button>
		</form>
	);
}

export default PickLocation;
