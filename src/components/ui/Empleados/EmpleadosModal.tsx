import { Autocomplete, Box, Button, IconButton, Modal, TextField } from "@mui/material";
import Empleado from "../../../types/Empleado";
import styles from './Empleados.module.css';
import { useEffect, useState } from "react";
import { Rol } from "../../../types/enums/Rol";
import colorConfigs from "../../../configs/colorConfig";
import CloseIcon from '@mui/icons-material/Close';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import HorarioDetalles from "../../../types/HorarioDetalles";
import Dia from "../../../types/Dia";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DiaGetAll } from "../../../services/DiaService";
import Usuario from "../../../types/Usuario";
import { EmpleadoCreate } from "../../../services/EmpleadoService";
import React from "react";

interface EmpleadoModalProps {
    open: boolean;
    onClose: () => void;
    empleado: Empleado;
}

const emptyDetalles = {
    id: null,
    eliminado: false,
    horaInicio: "",
    horaFin: "",
    dias: []
}

const emptyUsuario = {
    id: null,
    eliminado: false,
    username: "",
    rol: null
}

const EmpleadosModal: React.FC<EmpleadoModalProps> = ({ open, onClose, empleado }) => {
    const [currentEmpleado, setCurrentEmpleado] = useState<Empleado>({ ...empleado });
    const [currentDetalles, setCurrentDetalles] = useState<HorarioDetalles[]>([emptyDetalles]);
    const [currentUsuario, setCurrentUsuario] = useState<Usuario>(emptyUsuario);
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

        setCurrentDetalles(prev =>
            prev.map((detalle, index) =>
                index === i ? { ...detalle, [name]: value } : detalle
            )
        );
    }

    const handleChangeUsuario = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string, newValue?: string | null) => {

        if (typeof e === 'string') {
            // Si es un Autocomplete (recibe el name y el value directamente)
            const name = e;
            setCurrentUsuario(prev => ({
              ...prev,
              [name]: newValue as Rol || '',  // Si newValue es null, establece ''
            }));
          } else {
            // Si es un campo tipo TextField (event tiene target con name y value)
            const { name, value } = e.target;
            setCurrentUsuario(prev => ({
              ...prev,
              [name]: value
            }));
          }
    }

    const handleDayClick = (dia: Dia, i: number) => {
        setCurrentDetalles(prev => {
            const newDetalles = [...prev];
            const currentDias = newDetalles[i].dias;

            newDetalles[i] = {
                ...newDetalles[i],
                dias: currentDias.some(d => d.id === dia.id)  // Verifica por ID u otra propiedad
                    ? currentDias.filter(d => d.id !== dia.id)  // Si ya existe, lo elimina
                    : [...currentDias, dia]  // Si no existe, lo agrega
            };

            return newDetalles;
        });
    };

    const handleAgregarHorario = () => {
        setCurrentDetalles([...currentDetalles, emptyDetalles]);
    }

    const handleEliminarDetalle = (i: number) => {
        const newDetalles = currentDetalles.filter((_, index) => index !== i);
        setCurrentDetalles(newDetalles);
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
        setCurrentDetalles([emptyDetalles]);
        setCurrentUsuario({ ...emptyUsuario });
    }

    const handleSubmit = async () => {
        const empleadoActualizado = {
            ...currentEmpleado,
            horario: { 
                ...currentEmpleado.horario,
                detalles: currentDetalles
            },
            usuario: currentUsuario
        };
        
        await EmpleadoCreate(empleadoActualizado);

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
                        value={currentUsuario.username}
                        onChange={handleChangeUsuario}
                        margin="normal"
                        className={styles.textField}
                        size="small"
                    />
                    <Autocomplete
                        options={roles}
                        value={currentUsuario.rol}
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
                        {currentDetalles.map((detalle, index) => (
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
                        <Button variant="contained" sx={{ ...colorConfigs.buttonStyles }} className={styles.button} onClick={handleSubmit}>Agregar</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default EmpleadosModal;