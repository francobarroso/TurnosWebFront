import Base from "./Base";
import HorarioDetalles from "./HorarioDetalles";

export default interface Horario extends Base{
    detalles: HorarioDetalles[]
}