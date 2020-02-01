import SimplexNoise from "./Noise";

const logos = [
	require("../../assets/palestre/logo_1.jpg"),
	require("../../assets/palestre/logo_2.jpg"),
	require("../../assets/palestre/logo_3.jpg"),
	require("../../assets/palestre/logo_4.jpg")
];

function singlePoint(i = 0) {
	let k = i;
	if (k > 10) {
		k = i % 10;
	}

	const latR = new SimplexNoise().noise(0, k) * 0.009;
	const lngR = new SimplexNoise().noise(0, k) * 0.009;

	let latE = 45.465317 + latR;
	let lngE = 9.189441 + lngR;

	return {
		id: i,
		title: "Marker " + i,
		logo: logos[0],
		latlng: {
			latitude: latE,
			longitude: lngE
		},
		address: `Via Santa Margherita, 10 Milano`,
		description:
			"La Sala Pesi di 1200 mq. è un'area interamente dedicata al movimento per la tonificazione e per l'allenamento cardiovascolare. La sala pesi offre una vasta gamma di attrezzi per soddisfare tutte le esigenze ed i desideri delle persone. Chi desidera sviluppare e potenziare la muscola- tura troverà entusiasmanti le attrezzature della linea \"Pure\" di Techno- gym; chi ama mantenersi in forma senza lunghi ed intensi allenamenti può utilizzare oltre 60 attrezzi per la tonificazione di ultima generazione. Le oltre 45 macchine per il cardiofitness disponibili in sala pesi rendono immediato l'incremento della resistenza agli sforzi prolungati, allenando il cuore e riducendo gli eventuali grassi in eccesso. La Sala Pesi di 1200 mq. è un'area interamente dedicata al movimento per la tonificazione e per l'allenamento cardiovascolare. La sala pesi offre una vasta gamma di attrezzi per soddisfare tutte le esigenze ed i desideri delle persone. Chi desidera sviluppare e potenziare la muscola- tura troverà entusiasmanti le attrezzature della linea \"Pure\" di Techno- gym; chi ama mantenersi in forma senza lunghi ed intensi allenamenti può utilizzare oltre 60 attrezzi per la tonificazione di ultima generazione. Le oltre 45 macchine per il cardiofitness disponibili in sala pesi rendono immediato l'incremento della resistenza agli sforzi prolungati, allenando il cuore e riducendo gli eventuali grassi in eccesso.",
		images: [
			{ id: 1, img: require("../../assets/palestre/gallery_1.jpg") },
			{ id: 2, img: require("../../assets/palestre/gallery_2.jpg") },
			{ id: 3, img: require("../../assets/palestre/gallery_3.jpg") },
			{ id: 4, img: require("../../assets/palestre/gallery_1.jpg") },
			{ id: 5, img: require("../../assets/palestre/gallery_2.jpg") },
			{ id: 6, img: require("../../assets/palestre/gallery_3.jpg") }
		]
	};
}

let Marker = [];
const QUANTITY = 50;

for (let i = 0; i < QUANTITY; i++) {
	Marker.push(singlePoint(i));
}

export default Marker;
