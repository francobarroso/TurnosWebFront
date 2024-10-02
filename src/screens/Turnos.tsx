import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MonitorIcon from '@mui/icons-material/Monitor';
import colorConfigs from "../configs/colorConfig";
import { useEffect, useState } from "react";
import { TurnoGetAll } from "../services/TurnoService";
import TurnoDto from "../types/TurnoDto";
import TurnoTable from "../components/ui/Turnos/TurnosTable";
import TurnoModal from "../components/ui/Turnos/TurnoModal";
import styles from './Turno.module.css';

const emptyTurno = {
    id: null,
    eliminado: false,
    fechaTurno: new Date().toISOString().split('T')[0],
    horaTurno: '',
    servicio: null,
    nombre: '',
    apellido: '',
    email: '',
    monto: null,
    terminado: false,
    empleado: {
        id: 1,
        eliminado: false,
        nombre: "Franco",
        apellido: "Barroso",
        usuario: null
    }
};

function Turnos() {
    const [turnos, setTurnos] = useState<TurnoDto[]>([]);
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

    const handleGenerarTurno = () => {
        setOpen(true);
    }

    const handleClose = async () => {
        setOpen(false);
        const turnos = await TurnoGetAll();
        setTurnos(turnos);
    }

    useEffect(() => {
        const fetchData = async () => {
            const turnos = await TurnoGetAll();
            setTurnos(turnos);
        }

        fetchData();
    }, []);

    return (
        <>
            <Box>
                <Box
                    mt={0}
                    className={styles.head}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ ...colorConfigs.buttonStyles }}
                        onClick={handleGenerarTurno}
                        className={styles.button}
                    >
                        <AddIcon />{windowDimension.width > 800 && <span>Agendar Turno</span>}
                    </Button>
                    <Stack direction="column" alignItems="flex-end">
                        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                            <MonitorIcon /> 20
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: "18px" }}>
                            Turnos
                        </Typography>
                    </Stack>
                </Box>
                <TableContainer component={Paper} className={styles.table}>
                    <Table sx={{ minHeight: "0" }}>
                        <TableHead >
                            <TableRow>
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Fecha</TableCell>
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Hora</TableCell>
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Nombre</TableCell>
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Servicio</TableCell>
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {turnos.map((turno, index) => (
                                <TurnoTable key={index} turno={turno} index={index} />
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TurnoModal open={open} onClose={handleClose} turno={emptyTurno} />
            </Box>
        </>
    )
}

export default Turnos;