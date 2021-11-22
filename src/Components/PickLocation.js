import { useRef } from "react";

function PickLocation(props) {
	const locationInput = useRef("");
	const handleSubmit = (event) => {
		event.preventDefault();
		const location = locationInput.current.value;
		if (location.length > 0) {
			props.onSearch({
				method: 'city',
				city: location,
				lat: null,
				lon: null
			});
		}
	};

	const getCurrentPosition = () => {
		const success = (position) => {
			props.onSearch({
				method: 'geo',
				city: '',
				lat: position.coords.latitude,
				lon: position.coords.longitude
			});
		};
		navigator.geolocation.getCurrentPosition(success)
	} 

	return (
		<form onSubmit={handleSubmit}>
			<input type="search" ref={locationInput} placeholder="Search"></input>
			<button type="submit">ok</button>
			<button type="button" onClick={getCurrentPosition} >local</button>
		</form>
	);
}

export default PickLocation;
