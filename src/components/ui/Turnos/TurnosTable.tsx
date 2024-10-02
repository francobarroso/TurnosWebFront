import { Button, TableCell, TableRow } from "@mui/material";
import colorConfigs from "../../../configs/colorConfig";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TurnoDto from "../../../types/TurnoDto";
import { TurnoUpdate } from "../../../services/TurnoService";
import { useState } from "react";

interface TurnoTableProps {
    turno: TurnoDto;
    index: number;
}

const TurnoTable: React.FC<TurnoTableProps> = ({ turno, index }) => {
    const [renderKey, setRenderKey] = useState(0);

    const refreshGrid = () => {
        setRenderKey(prevKey => prevKey + 1);
    }

    const handleFinsh = async () => {
        turno.terminado = true;
        await TurnoUpdate(turno);
        refreshGrid();
    }

    return (
        <>
            <TableRow key={`${index}-${renderKey}`}>
                <TableCell align="center">
                    {new Date(turno.fechaTurno).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        timeZone: 'UTC'
                    })}</TableCell>
                <TableCell align="center">
                    {turno.horaTurno
                        ? `${turno.horaTurno.slice(0, 5)}hs`
                        : 'Hora no disponible'}
                </TableCell>
                <TableCell align="center">{turno.nombre} {turno.apellido}</TableCell>
                <TableCell align="center">{turno.servicio?.denominacion === "Corte" ? "Corte" : "Corte y Barba"}</TableCell>
                <TableCell align="center">
                    {turno.terminado === true ? (
                        <CheckCircleOutlineIcon color="success" />
                    ) : (
                        <Button variant="contained" sx={{ ...colorConfigs.buttonStyles }} onClick={handleFinsh}>{<CheckCircleIcon />}</Button>
                    )}
                </TableCell>
            </TableRow>
        </>
    )
};

export default TurnoTable;