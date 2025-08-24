export function getWeatherRecommendation(
	tempCelsius: number,
	description: string,
	humidity: number,
	windSpeed: number,
	uvIndex: number
): string {
	let message = "";

	// 🌡️ Base recommendation by temperature
	if (tempCelsius <= 0) {
		message =
			"It’s freezing outside, so bundle up in a thick coat, gloves, and a hat, and avoid staying out too long.";
	} else if (tempCelsius > 0 && tempCelsius <= 10) {
		message =
			"It’s quite chilly today, so a warm jacket or sweater will keep you comfortable, especially if you’ll be outdoors for a while.";
	} else if (tempCelsius > 10 && tempCelsius <= 20) {
		message =
			"The weather is cool, so a light jacket or hoodie should be just right, and it’s a nice time for a walk outside.";
	} else if (tempCelsius > 20 && tempCelsius <= 28) {
		message =
			"It’s mild and pleasant outside, perfect for a t-shirt and jeans, and you can enjoy being outdoors comfortably.";
	} else if (tempCelsius > 28 && tempCelsius <= 35) {
		message =
			"It’s getting hot, so wear light clothes to stay cool and don’t forget to drink plenty of water during the day.";
	} else {
		message =
			"The heat is extreme, so it’s best to stay indoors if you can and keep yourself hydrated with lots of water.";
	}

	// 🌧️ Adjust by description
	const desc = description.toLowerCase();
	if (desc.includes("rain")) {
		message += " Don’t forget your umbrella and maybe some waterproof shoes.";
	} else if (desc.includes("snow")) {
		message +=
			" Roads and sidewalks may be slippery, so walk carefully and wear boots if possible.";
	} else if (desc.includes("wind")) {
		message += " It’s quite windy, so a windbreaker or snug jacket will help.";
	} else if (desc.includes("storm")) {
		message +=
			" Better to stay indoors until the storm passes for your safety.";
	} else if (desc.includes("fog")) {
		message += " Visibility is low, so be extra cautious if you’re driving.";
	} else if (desc.includes("sunny") || desc.includes("clear")) {
		message += " Enjoy the sunshine, but consider sunglasses for comfort.";
	}

	// 💧 Humidity impact
	if (humidity >= 80 && tempCelsius >= 20) {
		message +=
			" The air feels sticky, so lighter breathable clothes will help.";
	} else if (humidity < 30 && tempCelsius > 10) {
		message +=
			" The air is quite dry, so keeping your skin hydrated would be smart.";
	}

	// 🌬️ Wind impact
	if (windSpeed >= 30) {
		message +=
			" Strong winds are expected, so secure loose items and avoid cycling.";
	} else if (windSpeed >= 15) {
		message +=
			" There’s a noticeable breeze, so a windbreaker might come in handy.";
	}

	// 🌞 UV index
	if (uvIndex >= 8) {
		message +=
			" The sun is very strong — sunscreen and sunglasses are essential.";
	} else if (uvIndex >= 5) {
		message +=
			" UV levels are moderate, so some sun protection is still a good idea.";
	}

	return message;
}
