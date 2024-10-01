import Base from "./Base";
import { Rol } from "./enums/Rol";

export default interface Usuario extends Base{
    username: string,
    rol: Rol | null,
}