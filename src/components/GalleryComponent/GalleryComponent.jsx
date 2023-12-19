import { useState, useEffect } from "react";
import "./GalleryComponent.css";

const images = [
	"https://static-cdn.jtvnw.net/cf_vods/dgeft87wbj63p/4e57f6b2a2a3b3e982b9_nili_aoe_79686960877_9065345201//thumb/thumb1766066160-640x360.jpg",
	"https://i.ytimg.com/vi/YNuqq-PEVbo/hqdefault.jpg?v=624f6dde",
	"https://i.ytimg.com/vi/c_Dws6e5JJM/maxresdefault.jpg",
	"https://pbs.twimg.com/media/F44dc9XXUAA5u6V.jpg",
	"https://i.ytimg.com/vi/Ghq4ql45z8Y/maxresdefault.jpg",
	"https://i.ytimg.com/vi/3AVBhB3lga4/maxresdefault.jpg",
	"https://www.aoezone.net/data/groups/Photos/o/10/21357/84d05c113d352bb688df1d45152a5dae.jpg",
	"https://www.aoezone.net/data/groups/Photos/o/10/21357/292dd3437037bbc1403694e1d7990a36.jpg",

	"https://i.ytimg.com/vi/qwxW8ds9qgY/maxresdefault.jpg",
];

const loadImage = (path) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = path;
		img.onload = () => {
			resolve(img);
		};
		img.onerror = (e) => {
			reject(e);
		};
	});
};

const GalleryComponent = () => {
	const [activeLink, setActiveLink] = useState(0);
	const [skipViewTransitions, setSkipViewTransitions] = useState(false);

	const handleClick = async (index) => {
		setActiveLink(index);
		const url = images[index];
		const img = await loadImage(url);
		document.querySelector(".gallery__large img").setAttribute("src", url);
	};

	useEffect(() => {
		const galleryLinks = document.querySelectorAll(".gallery__previews a");
		galleryLinks.forEach((link, index) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				if (!document.startViewTransition || skipViewTransitions) {
					handleClick(index);
				} else {
					const curImage = document.querySelector(
						".gallery__previews a.active img"
					);
					const newImage = link.querySelector("img");
					const largeImage = document.querySelector(
						".gallery__large img"
					);

					newImage.style.viewTransitionName = "grow";
					largeImage.style.viewTransitionName = "shrink";

					const t = document.startViewTransition(async () => {
						largeImage.style.viewTransitionName = "grow";
						curImage.style.viewTransitionName = "shrink";
						newImage.style.viewTransitionName = "none";
						handleClick(index);
					});

					t.finished.then(() => {
						curImage.style.viewTransitionName = "none";
						newImage.style.viewTransitionName = "none";
						largeImage.style.viewTransitionName = "none";
					});
				}
			});
		});
	}, [skipViewTransitions]);

	return (
		<div className="gallery">
			<div className="gallery__large">
				<img
					src={images[activeLink]}
					alt=""
					title=""
					width="222"
					height="184"
					draggable="false"
				/>
			</div>
			<ul className="gallery__previews">
				{images.map((imageUrl, index) => (
					<li key={index} className="list-item">
						<a
							href="#"
							className={index === activeLink ? "active" : ""}>
							<img
								src={imageUrl}
								alt=""
								title=""
								width="222"
								height="184"
								draggable="false"
							/>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default GalleryComponent;
