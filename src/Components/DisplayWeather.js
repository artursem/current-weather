function DisplayWeather(props) {
	console.log('test!');
	return (
		<div>
			<div>{props.show.city}</div>
			<div>{props.show.weather}</div>
			<div>{props.show.temperature}</div>
		</div>
	);
}

export default DisplayWeather;
