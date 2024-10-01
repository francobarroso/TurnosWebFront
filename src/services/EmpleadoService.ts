import Empleado from "../types/Empleado";
import EmpleadoDto from "../types/EmpleadoDto";

const apiUrl = import.meta.env.VITE_API_SERVER_URL;

export async function EmpleadoCreate(empleado: Empleado) {
	const urlServer = `${apiUrl}/empleado`;
	try {
		const response = await fetch(urlServer, {
			method: 'POST',
            body: JSON.stringify(empleado),
			headers: {
				'Content-type': 'application/json'
			},
			mode: 'cors'
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}
		
		return await response.json() as Empleado;
	} catch (error) {
		console.error('Error fetching dia:', error);
		throw error;
	}
}

export async function EmpleadoGetAll() {
	const urlServer = `${apiUrl}/empleado`;
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
		
		return await response.json() as EmpleadoDto[];
	} catch (error) {
		console.error('Error fetching dia:', error);
		throw error;
	}
}