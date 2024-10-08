import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import colorConfigs from "../configs/colorConfig";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from '@mui/icons-material/People';
import { useEffect, useState } from "react";
import styles from './Empleados.module.css';
import EmpleadosModal from "../components/ui/Empleados/EmpleadosModal";
import { EmpleadoGetAll } from "../services/EmpleadoService";
import EmpleadoDto from "../types/EmpleadoDto";
import EmpleadosTable from "../components/ui/Empleados/EmpleadosTable";

const emptyEmpleado = {
    id: null,
    eliminado: false,
    nombre: "",
    apellido: "",
    usuario: {
        id: null,
        eliminado: false,
        username: "",
        rol: null
    },
    horarios: [
        {
            id: null,
            eliminado: false,
            horaInicio: "",
            horaFin: "",
            dias: []
        }
    ],
    negocio: {
        id: 1,
        eliminado: false,
        denominacion: "",
        horario: ""
    }
}

function Empleados() {
    const [empleados, setEmpleados] = useState<EmpleadoDto[]>([]);
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

    useEffect(() => {
        const fetchData = async () => {
            const empleados = await EmpleadoGetAll();
            setEmpleados(empleados);
        }

        fetchData();
    }, []);

    const handleClose = async () => {
        setOpen(!open);
        const empleados = await EmpleadoGetAll();
        setEmpleados(empleados);
    }

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
                        className={styles.button}
                        onClick={() => setOpen(!open)}
                    >
                        <AddIcon /> {windowDimension.width > 800 && <span>Agregar Empleado</span>}
                    </Button>
                    <Stack direction="column" alignItems="flex-end">
                        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                            <PeopleIcon /> 3
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: "18px" }}>
                            Empleados
                        </Typography>
                    </Stack>
                </Box>
                <TableContainer component={Paper} style={{ flex: "1", marginBottom: '10px', marginTop: '20px', backgroundColor: "#c5c5c5", borderRadius: "20px" }}>
                    <Table sx={{ minHeight: "0" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Nombre</TableCell>
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Rol</TableCell>
                                {windowDimension.width > 800 &&
                                    <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Username</TableCell>
                                }
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {empleados.map((empleado, index) => (
                                <EmpleadosTable key={index} empleado={empleado} index={index}/>
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <EmpleadosModal open={open} empleado={emptyEmpleado} onClose={handleClose} />
        </>
    )
}

export default Empleados;