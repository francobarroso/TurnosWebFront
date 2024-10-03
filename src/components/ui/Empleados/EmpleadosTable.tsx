import { IconButton, TableCell, TableRow } from "@mui/material";
import EmpleadoDto from "../../../types/EmpleadoDto";
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from "react";
import EmpleadosModal from "./EmpleadosModal";

interface EmpleadosTableProps {
    empleado: EmpleadoDto;
    index: number;
}

const EmpleadosTable: React.FC<EmpleadosTableProps> = ({ empleado, index }) => {
    const [open, setOpen] = useState(false);
    const [windowDimension, setWindowDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const detectDimension = () => {
        setWindowDimension({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useEffect(() => {
        window.addEventListener('resize', detectDimension)
        return () => {
            window.removeEventListener('resize', detectDimension)
        }
    }, [windowDimension]);

    return (
        <>
            <TableRow key={index}>
                <TableCell align="center">{empleado.nombre} {empleado.apellido}</TableCell>
                <TableCell align="center">{empleado.usuario?.rol}</TableCell>
                {windowDimension.width > 800 &&
                    <TableCell align="center">{empleado.usuario?.username}</TableCell>
                }
                <TableCell align="center">
                    <IconButton onClick={() => setOpen(!open)}>
                        <InfoIcon color="primary"/>
                    </IconButton>
                </TableCell>
            </TableRow>
            <EmpleadosModal open={open} empleado={empleado} onClose={() => setOpen(!open)}/>
        </>
    )
};

export default EmpleadosTable;