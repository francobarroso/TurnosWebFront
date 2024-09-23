import Base from "./Base";
import { TipoTurno } from "./enums/TipoTurno";

export default interface TurnoDto extends Base{
    fechaTurno: string,
    horaTurno: string,
    tipo: TipoTurno,
    nombre: string,
    apellido: string
}