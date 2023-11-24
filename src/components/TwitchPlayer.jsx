import { useState, useEffect } from "react";
import { Youtube } from "./Youtube.jsx";

const TwitchPlayer = () => {
	const [isLive, setIsLive] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

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
				setError("No se pudo cargar el canal de Twitch.");
			} finally {
				setIsLoading(false);
			}
		};

		checkLiveStatus();
	}, []); // Se ejecuta solo una vez al montar el componente

	return (
		<section className="w-full h-full">
			{isLive ? <TwitchIframe channel="nicov_" /> : <Youtube />}
		</section>
	);
};

const TwitchIframe = ({ channel }) => (
	<iframe
		src={`https://player.twitch.tv/?channel=${channel}&parent=localhost`}
		frameBorder="0"
		allowFullScreen={true}
		style={{
			width: "100%",
			aspectRatio: "16/9",
			borderRadius: "8px",
			height: "100%",
		}}></iframe>
);

export default TwitchPlayer;
