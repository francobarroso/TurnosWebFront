import Base from "./Base";
import Dia from "./Dia";

export default interface HorarioDetalles extends Base{
    horaInicio: string,
    horaFin: string
    dias: Dia[];
}