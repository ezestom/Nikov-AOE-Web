const Button = ({ url, name }) => {
	const handleClick = () => {
		window.location.href = url;
	};

	return (
		<div className="absolute bottom-2 w-screen flex justify-center">
			<a
				onClick={handleClick}
				className="relative inline-flex  overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-1 focus:ring-slate-100 focus:ring-offset-1 focus:ring-offset-slate-50">
				<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
				<span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-3 py-2 text-sm font-medium text-white backdrop-blur-3xl">
					{name}
				</span>
			</a>
		</div>
	);
};

export default Button;
