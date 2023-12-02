export function Youtube() {
	/* add an amazing animation to the social icons and put inside const*/

	return (
		<article class="youtube relative flex flex-col items-center h-full w-full">
			<span class="absolute text-sm font-medium text-yellow-500">
				Nicov Best Highlights
			</span>
			<iframe
				style={{ borderRadius: "8px", height: "100%", width: "100%" }}
				src="https://www.youtube.com/embed/jF2R-DS6ApI?si=1x1CkZ4cci5ibE93&amp;controls=0&amp;start=10&mute=1&autoplay=1"
				title="YouTube video player"
				// frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen></iframe>
		</article>
	);
}
