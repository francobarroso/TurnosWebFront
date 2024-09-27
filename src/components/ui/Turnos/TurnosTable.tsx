import { Button, TableCell, TableRow } from "@mui/material";
import colorConfigs from "../../../configs/colorConfig";
import Turno from "../../../types/Turno";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface TurnoTableProps {
    turno: Turno;
    index: number;
}

const TurnoTable: React.FC<TurnoTableProps> = ({ turno, index }) => {

    return (
        <>
            <TableRow key={index}>
                <TableCell align="center">{turno.fechaTurno}</TableCell>
                <TableCell align="center">{turno.horaTurno}hs</TableCell>
                <TableCell align="center">{turno.nombre} {turno.apellido}</TableCell>
                <TableCell align="center">{turno.servicio?.denominacion === "Corte" ? "Corte" : "Corte y Barba"}</TableCell>
                <TableCell align="center">
                    {turno.terminado === true ? (
                        <CheckCircleOutlineIcon color="success"/>
                    ) : (
                        <Button variant="contained" sx={{...colorConfigs.buttonStyles}}>{<CheckCircleIcon />}</Button>
                    )}
                </TableCell>
            </TableRow>
        </>
    )
};

export default TurnoTable;