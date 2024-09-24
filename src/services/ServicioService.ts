import Servicio from "../types/Servicio";

const apiUrl = import.meta.env.VITE_API_SERVER_URL;

export async function ServicioGetAll() {
	const urlServer = `${apiUrl}/servicio`;
	try {
		const response = await fetch(urlServer, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json'
			},
			mode: 'cors'
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		return await response.json() as Servicio[];
	} catch (error) {
		console.error('Error fetching servicios:', error);
		throw error;
	}
}