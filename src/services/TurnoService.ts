import Turno from "../types/Turno";
import TurnoDto from "../types/TurnoDto";

const apiUrl = import.meta.env.VITE_API_SERVER_URL;

export async function TurnoGetAll() {
	const urlServer = `${apiUrl}/turno`;
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
		
		return await response.json() as TurnoDto[];
	} catch (error) {
		console.error('Error fetching turnos:', error);
		throw error;
	}
}

export async function TurnoCreate(turno: Turno) {
	const urlServer = `${apiUrl}/turno`;
	try {
		const response = await fetch(urlServer, {
			method: 'POST',
			body: JSON.stringify(turno),
			headers: {
				'Content-type': 'application/json'
			},
			mode: 'cors'
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}
		
		return await response.json() as Turno;
	} catch (error) {
		console.error('Error fetching turnos:', error);
		throw error;
	}
}

export async function TurnoUpdate(turno: TurnoDto) {
	const urlServer = `${apiUrl}/turno/${turno.id}`;
	try {
		const response = await fetch(urlServer, {
			method: 'PUT',
			body: JSON.stringify(turno),
			headers: {
				'Content-type': 'application/json'
			},
			mode: 'cors'
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}
		
		return await response.json() as Turno;
	} catch (error) {
		console.error('Error fetching turnos:', error);
		throw error;
	}
}