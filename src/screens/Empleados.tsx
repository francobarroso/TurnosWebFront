import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import colorConfigs from "../configs/colorConfig";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from '@mui/icons-material/People';
import { useEffect, useState } from "react";
import styles from './Empleados.module.css';
import EmpleadosModal from "../components/ui/Empleados/EmpleadosModal";

const emptyEmpleado = {
    id: null,
    eliminado: false,
    nombre: "",
    apellido: "",
    usuario: null,
    horario: null
}

function Empleados() {
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
                        <TableHead >
                            <TableRow>
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Nombre</TableCell>
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Apellido</TableCell>
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Rol</TableCell>
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Username</TableCell>
                                <TableCell style={{ color: 'black', fontWeight: 'bold' }} align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <EmpleadosModal open={open} empleado={emptyEmpleado} onClose={() => setOpen(!open)}/>
        </>
    )
}

export default Empleados;