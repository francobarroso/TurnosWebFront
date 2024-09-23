import Servicio from "../types/Servicio";

const apiUrl = import.meta.env.VITE_API_SERVER_URL;

export async function ServicioGetAll(){
	const urlServer = `${apiUrl}/servicio`;
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json'
		},
        mode: 'cors'
	});
	return await response.json() as Servicio[];
}