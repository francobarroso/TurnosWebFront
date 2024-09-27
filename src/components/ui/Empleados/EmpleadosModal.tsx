import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import Empleado from "../../../types/Empleado";
import styles from './Empleados.module.css';
import { useEffect, useState } from "react";
import { Rol } from "../../../types/enums/Rol";
import colorConfigs from "../../../configs/colorConfig";
import CloseIcon from '@mui/icons-material/Close';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';

interface EmpleadoModalProps {
    open: boolean;
    onClose: () => void;
    empleado: Empleado;
}

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const EmpleadosModal: React.FC<EmpleadoModalProps> = ({ open, onClose, empleado }) => {
    const [currentEmpleado, setCurrentEmpleado] = useState<Empleado>({ ...empleado });
    const roles = Object.values(Rol).map((rol) => capitalizeFirstLetter(rol));
    const [selectedRol, setSelectedRol] = useState<Rol | null>(null);
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

    const handleClose = () => {
        onClose();
        setCurrentEmpleado({ ...empleado });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const maxLength: Record<string, number> = {
            nombre: 25,
            apellido: 25,
            email: 50
        };

        if (value.length > maxLength[name]) {
            return;
        }

        setCurrentEmpleado(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box className={styles.modal}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="nombre"
                        value={currentEmpleado.nombre}
                        onChange={handleChange}
                        margin="normal"
                        className={styles.textField}
                        size="small"
                    />
                    <TextField
                        fullWidth
                        label="Apellido"
                        name="apellido"
                        value={currentEmpleado.apellido}
                        onChange={handleChange}
                        margin="normal"
                        className={styles.textField}
                        size="small"
                    />
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={currentEmpleado.usuario?.username}
                        onChange={handleChange}
                        margin="normal"
                        className={styles.textField}
                        size="small"
                    />
                    <Autocomplete
                        options={roles} // Array de opciones
                        value={selectedRol}
                        onChange={(_, newValue) => setSelectedRol(newValue as Rol)} // Al seleccionar un valor
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                size="small"
                                label="Seleccionar Rol"
                                margin="normal"
                                fullWidth
                                variant="outlined"
                            />}
                        className={styles.autocomplete}
                    />
                    <CloseIcon onClick={handleClose} className={styles.closeButton} />
                    <Box mt={2} className={styles.horario}>
                        <Box mb={3} className={styles.horarioHead}>
                            <span className={styles.horarioTitle}>Agregar Horario</span>
                            <DataSaverOnIcon className={styles.addIcon} />
                        </Box>
                        <Box className={styles.dias}>
                            <Button className={styles.diasButton} variant="outlined">{windowDimension.width > 800 ? "Lunes" : "L"}</Button>
                            <Button className={styles.diasButton} variant="outlined">{windowDimension.width > 800 ? "Martes" : "M"}</Button>
                            <Button className={styles.diasButton} variant="outlined">{windowDimension.width > 800 ? "Miercoles" : "M"}</Button>
                            <Button className={styles.diasButton} variant="outlined">{windowDimension.width > 800 ? "Jueves" : "J"}</Button>
                            <Button className={styles.diasButton} variant="outlined">{windowDimension.width > 800 ? "Viernes" : "V"}</Button>
                            <Button className={styles.diasButton} variant="outlined">{windowDimension.width > 800 ? "Sabado" : "S"}</Button>
                            <Button className={styles.diasButton} variant="outlined">{windowDimension.width > 800 ? "Domingo" : "D"}</Button>
                        </Box>
                        <Box mt={2} className={styles.form}>
                            <TextField
                                fullWidth
                                label="Hora Inicio"
                                type="time"
                                name="horaInicio"

                                onChange={handleChange}
                                margin="normal"
                                className={styles.horaForm}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Hora Fin"
                                type="time"
                                name="horaFin"

                                onChange={handleChange}
                                margin="normal"
                                className={styles.horaForm}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                    </Box>
                    <Box className={styles.buttonContainer}>
                        <Button variant="contained" sx={{ ...colorConfigs.buttonStyles }} className={styles.button}>Agregar</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default EmpleadosModal;