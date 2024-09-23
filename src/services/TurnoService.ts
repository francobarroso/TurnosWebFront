import TurnoDto from "../types/TurnoDto";

const apiUrl = import.meta.env.VITE_API_SERVER_URL;

export async function TurnoGetAll(){
	const urlServer = `${apiUrl}/turno`;
	const response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json'
		},
        mode: 'cors'
	});
	return await response.json() as TurnoDto[];
}