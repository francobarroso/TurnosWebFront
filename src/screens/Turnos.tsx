import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MonitorIcon from '@mui/icons-material/Monitor';
import colorConfigs from "../configs/colorConfig";
import { useEffect, useState } from "react";
import { TurnoGetAll } from "../services/TurnoService";
import TurnoDto from "../types/TurnoDto";
import TurnoTable from "../components/ui/Turnos/TurnosTable";
import TurnoModal from "../components/ui/Turnos/TurnoModal";

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
                    sx={{
                        backgroundColor: "#c5c5c5",
                        borderRadius: "20px",
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        sx={{ ...colorConfigs.buttonStyles }}
                        onClick={handleGenerarTurno}
                    >
                        Generar Turno
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
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Tipo de Turno</TableCell>
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {turnos.map((turno, index) => (
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