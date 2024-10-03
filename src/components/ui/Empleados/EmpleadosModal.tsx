import { Autocomplete, Box, Button, IconButton, Modal, TextField } from "@mui/material";
import Empleado from "../../../types/Empleado";
import styles from './Empleados.module.css';
import { useEffect, useState } from "react";
import { Rol } from "../../../types/enums/Rol";
import colorConfigs from "../../../configs/colorConfig";
import CloseIcon from '@mui/icons-material/Close';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import Dia from "../../../types/Dia";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DiaGetAll } from "../../../services/DiaService";
import { EmpleadoCreate, EmpleadoUpdate } from "../../../services/EmpleadoService";
import React from "react";
import EmpleadoDto from "../../../types/EmpleadoDto";

interface EmpleadoModalProps {
    open: boolean;
    onClose: (updatedEmpleado?: EmpleadoDto) => void;
    empleado: Empleado | EmpleadoDto;
}

const emptyDetalles = {
    id: null,
    eliminado: false,
    horaInicio: "",
    horaFin: "",
    dias: []
}

const EmpleadosModal: React.FC<EmpleadoModalProps> = ({ open, onClose, empleado }) => {
    const [currentEmpleado, setCurrentEmpleado] = useState<Empleado | EmpleadoDto>({ ...empleado });
    const roles = Object.values(Rol).map((rol) => rol as Rol);
    const [dias, setDias] = useState<Dia[]>([]);
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

    const handleChangeDetalles = (i: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurrentEmpleado(prev => ({
            ...prev,
            horarios: prev.horarios.map((detalle, index) =>
                index === i ? { ...detalle, [name]: value } : detalle
            )
        }));
    }

    const handleChangeUsuario = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string, newValue?: string | null) => {
        if (typeof e === 'string') {
            const name = e;
            setCurrentEmpleado(prev => ({
                ...prev,
                usuario: { ...prev.usuario, [name]: newValue as Rol }
            }));
        } else {
            const { name, value } = e.target;
            setCurrentEmpleado(prev => ({
                ...prev,
                usuario: { ...prev.usuario, [name]: value }
            }));
        }
    }

    const handleDayClick = (dia: Dia, i: number) => {
        setCurrentEmpleado(prev => {
            const newHorarios = [...prev.horarios]; //Copiar Array de horarios actual
            const currentDias = newHorarios[i].dias; //Guardar dias del horario i

            newHorarios[i] = {
                ...newHorarios[i],
                dias: currentDias.some(d => d.id === dia.id) //Verifica que el dia clickeado exista
                    ? currentDias.filter(d => d.id !== dia.id) //Si existe se remueve del array de dias del horario i
                    : [...currentDias, dia] //Caso contrario se agrega al array de dias del horario i
            };

            return {
                ...prev,
                horarios: newHorarios //Actualiza el array de horarios en el estado del empleado
            }
        });
    };

    const handleAgregarHorario = () => {
        setCurrentEmpleado(prev => ({
            ...prev,
            horarios: [...prev.horarios, emptyDetalles]
        }));
    };

    const handleEliminarDetalle = (i: number) => {
        const newHorarios = currentEmpleado.horarios.filter((_, index) => index !== i);
        setCurrentEmpleado(prev => ({
            ...prev, horarios: newHorarios
        }));
    }

    useEffect(() => {
        window.addEventListener('resize', detectDimension)
        return () => {
            window.removeEventListener('resize', detectDimension)
        }
    }, [windowDimension]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await DiaGetAll();
            setDias(data);
        }

        fetchData();
    }, []);

    const handleClose = () => {
        onClose();
        setCurrentEmpleado({ ...empleado });
    }

    const handleSubmit = async () => {
        console.log(currentEmpleado);

        if (empleado.id !== null) {
            await EmpleadoUpdate(currentEmpleado);
        } else {
            await EmpleadoCreate(currentEmpleado);
        }
        
        handleClose();
    }

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
                        value={currentEmpleado.usuario.username}
                        onChange={handleChangeUsuario}
                        margin="normal"
                        className={styles.textField}
                        size="small"
                    />
                    <Autocomplete
                        options={roles}
                        value={currentEmpleado.usuario.rol}
                        onChange={(_, newValue) => handleChangeUsuario('rol', newValue)}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                size="small"
                                name="rol"
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
                            <DataSaverOnIcon className={styles.addIcon} onClick={handleAgregarHorario} />
                        </Box>
                        {currentEmpleado.horarios
                            .sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
                            .map((detalle, index) => (
                                <React.Fragment key={index}>
                                    <Box className={styles.dias}>
                                        {dias.map(dia => (
                                            <Button
                                                key={dia.id}
                                                className={styles.diasButton}
                                                variant="outlined"
                                                onClick={() => handleDayClick(dia, index)}
                                                style={{
                                                    backgroundColor: detalle.dias.some(d => d.id === dia.id) ? '#a32929' : 'transparent',
                                                    color: detalle.dias.some(d => d.id === dia.id) ? '#fff' : '#842121',
                                                    borderColor: detalle.dias.some(d => d.id === dia.id) ? '#fff' : '#842121',
                                                }}
                                            >
                                                {windowDimension.width > 800 ? dia.denominacion : dia.denominacion.charAt(0)}
                                            </Button>
                                        ))}
                                    </Box>
                                    <Box mt={2} className={styles.form} mb={4}>
                                        <TextField
                                            fullWidth
                                            label="Hora Inicio"
                                            type="time"
                                            name="horaInicio"
                                            value={detalle.horaInicio}
                                            onChange={(e) => handleChangeDetalles(index, e)}
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
                                            value={detalle.horaFin}
                                            onChange={(e) => handleChangeDetalles(index, e)}
                                            margin="normal"
                                            className={styles.horaForm}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <IconButton
                                            className={styles.horaForm}
                                            disabled={index === 0}
                                            onClick={() => handleEliminarDetalle(index)}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Box>
                                </React.Fragment>
                            ))}
                    </Box>
                    <Box className={styles.buttonContainer}>
                        <Button
                            variant="contained"
                            sx={{ ...colorConfigs.buttonStyles }}
                            className={styles.button}
                            onClick={handleSubmit}>
                            {empleado.id !== null ? "Actualizar" : "Agregar"}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default EmpleadosModal;