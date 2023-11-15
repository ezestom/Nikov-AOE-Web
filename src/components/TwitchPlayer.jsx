import { useState, useEffect } from "react";

const TwitchPlayer = () => {
	const [isLive, setIsLive] = useState(false);

	useEffect(() => {
		const checkLiveStatus = async () => {
			try {
				const response = await fetch(
					"https://api.twitch.tv/helix/streams?user_login=nicov_",
					{
						headers: {
							"Client-ID": "q6batx0epp608isickayubi39itsckt",
						},
					}
				);

				const data = await response.json();

				// Verificar si el canal está en vivo
				setIsLive(data.data.length > 0);
			} catch (error) {
				console.error(
					"Error al obtener información del canal de Twitch:",
					error
				);
				// Tratar el error según tus necesidades
			}
		};

		checkLiveStatus();
	}, []); // Se ejecuta solo una vez al montar el componente

	return (
		<section className="w-full h-full">
			{isLive ? (
				<iframe
					src="https://player.twitch.tv/?channel=nicov_&parent=localhost"
					frameBorder="0"
					allowFullScreen="true"
					scrolling="no"
					style={{
						width: "100%",
						aspectRatio: "16/9",
						borderRadius: "8px",
						height: "100%",
					}}></iframe>
			) : (
				<div>El canal no está en vivo.</div>
			)}
		</section>
	);
};

export default TwitchPlayer;
