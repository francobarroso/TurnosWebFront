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
    fechaTurno: '',
    horaTurno: '',
    servicio: null,
    nombre: '',
    apellido: '',
    email: '',
    monto: null,
    terminado: false
};

function Turnos() {
    const [turnos, setTurnos] = useState<TurnoDto[]>([]);
    const [open, setOpen] = useState(false);
    const [windowDimension, setWindowDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const mockTurnos = [
        {
            id: 1,
            eliminado: false,
            fechaTurno: '2024-04-12',
            horaTurno: '08:08',
            servicio: { id: 2, eliminado: false, denominacion: 'Manicura', precio: 1200 },
            nombre: 'Steve',
            apellido: 'Carlson',
            email: 'nicholas20@day.com',
            monto: 1795,
            terminado: true
        },
        {
            id: 2,
            eliminado: false,
            fechaTurno: '2024-09-21',
            horaTurno: '01:17',
            servicio: { id: 1, eliminado: false, denominacion: 'Corte de Cabello', precio: 1500 },
            nombre: 'Christopher',
            apellido: 'Rice',
            email: 'chloe17@gmail.com',
            monto: 1596,
            terminado: false
        },
        {
            id: 3,
            eliminado: false,
            fechaTurno: '2024-09-21',
            horaTurno: '01:17',
            servicio: { id: 1, eliminado: false, denominacion: 'Corte de Cabello', precio: 1500 },
            nombre: 'Christopher',
            apellido: 'Rice',
            email: 'chloe17@gmail.com',
            monto: 1596,
            terminado: false
        },
        {
            id: 4,
            eliminado: false,
            fechaTurno: '2024-09-21',
            horaTurno: '01:17',
            servicio: { id: 1, eliminado: false, denominacion: 'Corte de Cabello', precio: 1500 },
            nombre: 'Christopher',
            apellido: 'Rice',
            email: 'chloe17@gmail.com',
            monto: 1596,
            terminado: false
        },
        {
            id: 5,
            eliminado: false,
            fechaTurno: '2024-09-21',
            horaTurno: '01:17',
            servicio: { id: 1, eliminado: false, denominacion: 'Corte de Cabello', precio: 1500 },
            nombre: 'Christopher',
            apellido: 'Rice',
            email: 'chloe17@gmail.com',
            monto: 1596,
            terminado: false
        },
        {
            id: 6,
            eliminado: false,
            fechaTurno: '2024-09-21',
            horaTurno: '01:17',
            servicio: { id: 1, eliminado: false, denominacion: 'Corte de Cabello', precio: 1500 },
            nombre: 'Christopher',
            apellido: 'Rice',
            email: 'chloe17@gmail.com',
            monto: 1596,
            terminado: false
        },
        {
            id: 7,
            eliminado: false,
            fechaTurno: '2024-09-21',
            horaTurno: '01:17',
            servicio: { id: 1, eliminado: false, denominacion: 'Corte de Cabello', precio: 1500 },
            nombre: 'Christopher',
            apellido: 'Rice',
            email: 'chloe17@gmail.com',
            monto: 1596,
            terminado: false
        },
        {
            id: 8,
            eliminado: false,
            fechaTurno: '2024-09-21',
            horaTurno: '01:17',
            servicio: { id: 1, eliminado: false, denominacion: 'Corte de Cabello', precio: 1500 },
            nombre: 'Christopher',
            apellido: 'Rice',
            email: 'chloe17@gmail.com',
            monto: 1596,
            terminado: false
        },
        {
            id: 9,
            eliminado: false,
            fechaTurno: '2024-09-21',
            horaTurno: '01:17',
            servicio: { id: 1, eliminado: false, denominacion: 'Corte de Cabello', precio: 1500 },
            nombre: 'Christopher',
            apellido: 'Rice',
            email: 'chloe17@gmail.com',
            monto: 1596,
            terminado: false
        },
        {
            id: 10,
            eliminado: false,
            fechaTurno: '2024-09-21',
            horaTurno: '01:17',
            servicio: { id: 1, eliminado: false, denominacion: 'Corte de Cabello', precio: 1500 },
            nombre: 'Christopher',
            apellido: 'Rice',
            email: 'chloe17@gmail.com',
            monto: 1596,
            terminado: false
        },
        {
            id: 10,
            eliminado: false,
            fechaTurno: '2024-09-21',
            horaTurno: '01:17',
            servicio: { id: 1, eliminado: false, denominacion: 'Corte de Cabello', precio: 1500 },
            nombre: 'Christopher',
            apellido: 'Rice',
            email: 'chloe17@gmail.com',
            monto: 1596,
            terminado: false
        },
        {
            id: 11,
            eliminado: false,
            fechaTurno: '2024-09-21',
            horaTurno: '01:17',
            servicio: { id: 1, eliminado: false, denominacion: 'Corte de Cabello', precio: 1500 },
            nombre: 'Christopher',
            apellido: 'Rice',
            email: 'chloe17@gmail.com',
            monto: 1596,
            terminado: false
        },
        {
            id: 12,
            eliminado: false,
            fechaTurno: '2024-09-21',
            horaTurno: '01:17',
            servicio: { id: 1, eliminado: false, denominacion: 'Corte de Cabello', precio: 1500 },
            nombre: 'Christopher',
            apellido: 'Rice',
            email: 'chloe17@gmail.com',
            monto: 1596,
            terminado: false
        }
        // ... (continues up to id: 30)
    ];

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
    }, [windowDimension])

    const handleGenerarTurno = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            const turnos = await TurnoGetAll();
            setTurnos((prevTurnos) => {
                if (JSON.stringify(prevTurnos) !== JSON.stringify(turnos)) {
                    return turnos;
                }
                return prevTurnos;
            });
        }

        fetchData();
    }, [])

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
                <TableContainer component={Paper} style={{ flex: "1", marginBottom: '10px', marginTop: '20px', backgroundColor: "#c5c5c5", borderRadius: "20px" }}>
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
                            {mockTurnos.map((turno, index) => (
                                <TurnoTable turno={turno} index={index} />
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