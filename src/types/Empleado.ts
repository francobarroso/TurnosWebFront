import Base from "./Base";
import Horario from "./Horario";
import Usuario from "./Usuario";

export default interface Empleado extends Base{
    nombre: string,
    apellido: string,
    usuario: Usuario | null,
    horario: Horario[] | null
}