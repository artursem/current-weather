import { useRef, useState } from "react";

function PickLocation(props) {
	const locationInput = useRef("");
    const handleSubmit = () => {
		const location = locationInput.current.value;
        if (location.length > 0) {
            props.onSearch(location)
        }
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="search" ref={locationInput} placeholder="Search"></input>
			<button type="submit">ok</button>
		</form>
	);
}

export default PickLocation;
