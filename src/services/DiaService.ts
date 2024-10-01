import Dia from "../types/Dia";

const apiUrl = import.meta.env.VITE_API_SERVER_URL;

export async function DiaGetAll() {
	const urlServer = `${apiUrl}/dia`;
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
		
		return await response.json() as Dia[];
	} catch (error) {
		console.error('Error fetching dia:', error);
		throw error;
	}
}