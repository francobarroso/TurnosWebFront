import Base from "./Base";
import Servicio from "./Servicio";

export default interface TurnoDto extends Base{
    fechaTurno: string,
    horaTurno: string,
    nombre: string,
    apellido: string,
    servicio: Servicio,
    terminado: boolean
}