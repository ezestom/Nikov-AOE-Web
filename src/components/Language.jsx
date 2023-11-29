export function Language() {
	const handleClick = () => {
		localStorage.setItem("language", "en")
			? localStorage.getItem("language")
			: localStorage.setItem("language", "es");
		console.log(localStorage.getItem("language"));
	};

	return (
		<>
			<a onClick={handleClick}>
				<input
					checked=""
					type="checkbox"
					id="cb5"
					class="tgl tgl-flip"
				/>
				<label
					for="cb5"
					data-tg-on="Eng"
					data-tg-off="Esp"
					class="tgl-btn"></label>
			</a>
		</>
	);
}
