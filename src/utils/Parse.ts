export function parseTime(timeStr: string): number {
	const [time, modifier] = timeStr.split(" ");
	const time_temp = time.split(":").map(Number);
	let hours = time_temp[0];
	const minutes = time_temp[1];

	if (modifier.toLowerCase() === "pm" && hours !== 12) {
		hours += 12;
	}
	if (modifier.toLowerCase() === "am" && hours === 12) {
		hours = 0;
	}

	const now = new Date();
	now.setHours(hours, minutes, 0, 0);
	return now.getTime();
}
