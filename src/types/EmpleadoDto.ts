import Base from "./Base";
import Horario from "./Horario";
import Usuario from "./Usuario";

export default interface EmpleadoDto extends Base{
    nombre: string,
    apellido: string,
    usuario: Usuario,
    horarios: Horario[]
}