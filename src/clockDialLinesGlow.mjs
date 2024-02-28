(() => {
	const url = document.location.search;
	const searchParams = new URLSearchParams(url);
	const minutes = searchParams.get("time") || 50; // default 50 minutes
	const countdownElement = document.querySelector(".countdown");
	const totalTimeInSeconds = minutes * 60;

	// Function to update the dial markers based on the remaining time
	function updateDialMarkers() {
		// Get the remaining time in seconds
		const remainingTimeInSeconds = getRemainingTimeInSeconds();

		// Calculate the percentage completed
		const percentageCompleted =
			((totalTimeInSeconds - remainingTimeInSeconds) / totalTimeInSeconds) *
			100;

		// Loop through each dial line and set the data-glow attribute based on the percentage
		const dialLines = document.querySelectorAll(".dial-line");
		dialLines.forEach((dialLine, index) => {
			const rotationDegree = (index * 6) % 360; // Each dial line is rotated by 6 degrees
			dialLine.dataset.glow =
				rotationDegree <= percentageCompleted ? "true" : "false";
		});
	}

	// Function to get the remaining time in seconds
	function getRemainingTimeInSeconds() {
		const [minutes, seconds] = countdownElement.textContent
			.split(":")
			.map(Number);
		return minutes * 60 + seconds;
	}

	// Update the dial markers initially and then set an interval to update them every second
	updateDialMarkers();
	setInterval(updateDialMarkers, 1000);
})();
