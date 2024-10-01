import Base from "./Base";
import Horario from "./Horario";
import Negocio from "./Negocio";
import Usuario from "./Usuario";

export default interface Empleado extends Base{
    nombre: string,
    apellido: string,
    usuario: Usuario | null,
    horario: Horario,
    negocio: Negocio
}