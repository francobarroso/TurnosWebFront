import { Button, TableCell, TableRow } from "@mui/material";
import TurnoDto from "../../../types/TurnoDto";
import { TipoTurno } from "../../../types/enums/TipoTurno";
import colorConfigs from "../../../configs/colorConfig";

interface TurnoTableProps {
    turno: TurnoDto;
    index: number;
}

const TurnoTable: React.FC<TurnoTableProps> = ({ turno, index }) => {

    return (
        <>
            <TableRow key={index}>
                <TableCell align="center">{turno.fechaTurno}</TableCell>
                <TableCell align="center">{turno.horaTurno}hs</TableCell>
                <TableCell align="center">{turno.nombre} {turno.apellido}</TableCell>
                <TableCell align="center">{turno.tipo === TipoTurno.CORTE ? "Corte" : "Corte y Barba"}</TableCell>
                <TableCell align="center">
                    <Button variant="contained" sx={{...colorConfigs.buttonStyles}}>Atendido</Button>
                </TableCell>
            </TableRow>
        </>
    )
};

export default TurnoTable;