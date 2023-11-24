export function Language() {
	const handleClick = () => {
		localStorage.setItem("language", "en")
			? localStorage.getItem("language")
			: localStorage.setItem("language", "es");
		console.log(localStorage.getItem("language"));
	};

	return (
		<a onClick={handleClick} >
			change language
		</a>
	);
}
