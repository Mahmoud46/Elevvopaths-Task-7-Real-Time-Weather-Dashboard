export function getWeatherRecommendation(tempCelsius: number): string {
	if (tempCelsius <= 0) {
		return "It’s freezing outside, so bundle up in a thick coat, gloves, and a hat, and try not to stay out too long.";
	} else if (tempCelsius > 0 && tempCelsius <= 10) {
		return "It’s quite chilly today, so a warm jacket or sweater will keep you comfortable, especially if you’ll be outdoors for a while.";
	} else if (tempCelsius > 10 && tempCelsius <= 20) {
		return "The weather is cool, so a light jacket or hoodie should be just right, and it’s a nice time for a walk outside.";
	} else if (tempCelsius > 20 && tempCelsius <= 28) {
		return "It’s mild and pleasant outside, perfect for a t-shirt and jeans, and you can enjoy being outdoors comfortably.";
	} else if (tempCelsius > 28 && tempCelsius <= 35) {
		return "It’s getting hot, so wear light clothes to stay cool and don’t forget to drink plenty of water during the day.";
	} else {
		return "The heat is extreme, so it’s best to stay indoors if you can and keep yourself hydrated with lots of water.";
	}
}
