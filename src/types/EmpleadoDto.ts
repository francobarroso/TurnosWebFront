import Base from "./Base";
import Usuario from "./Usuario";

export default interface EmpleadoDto extends Base{
    nombre: string,
    apellido: string,
    usuario: Usuario | null,
}