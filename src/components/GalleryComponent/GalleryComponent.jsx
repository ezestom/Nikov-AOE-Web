import { useState, useEffect } from "react";
import "./GalleryComponent.css";

const images = [
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToUXz5SXuvsrdwp7dIMj2CDX5Orwkyj3_wzbBap6O2AcEpEhpZckVqxiHWs1ACkBc45Yk&usqp=CAU",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx_3daVedhSag0wOs7knOQESrBwmCnV5aU-g&usqp=CAU",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToUXz5SXuvsrdwp7dIMj2CDX5Orwkyj3_wzbBap6O2AcEpEhpZckVqxiHWs1ACkBc45Yk&usqp=CAU",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx_3daVedhSag0wOs7knOQESrBwmCnV5aU-g&usqp=CAU",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToUXz5SXuvsrdwp7dIMj2CDX5Orwkyj3_wzbBap6O2AcEpEhpZckVqxiHWs1ACkBc45Yk&usqp=CAU",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx_3daVedhSag0wOs7knOQESrBwmCnV5aU-g&usqp=CAU",
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
