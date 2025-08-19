export function parseDateTime(input: number | string): Date {
	if (typeof input === "number") {
		// assume unix timestamp (seconds)
		return new Date(input * 1000);
	}
	// assume datetime string
	return new Date(input.replace(" ", "T"));
}

export function parseTimeForDate(baseDate: Date, timeStr: string): Date {
	// Example: baseDate = 2025-08-19, timeStr = "06:48 AM"
	const [hhmm, modifier] = timeStr.split(" ");
	const time = hhmm.split(":").map(Number);
	let hours = time[0];
	const minutes = time[1];

	if (modifier.toLowerCase() === "pm" && hours < 12) hours += 12;
	if (modifier.toLowerCase() === "am" && hours === 12) hours = 0;

	const d = new Date(baseDate);
	d.setHours(hours, minutes, 0, 0);
	return d;
}
