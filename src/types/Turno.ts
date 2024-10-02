import Base from "./Base";
import EmpleadoDto from "./EmpleadoDto";
import Servicio from "./Servicio";

export default interface Turno extends Base{
    fechaTurno: string,
    horaTurno: string,
    servicio: Servicio | null,
    nombre: string,
    apellido: string,
    email: string,
    monto: number | null,
    terminado: boolean,
    empleado: EmpleadoDto
}