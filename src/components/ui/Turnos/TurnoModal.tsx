import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import Turno from "../../../types/Turno";
import { useEffect, useState } from "react";
import { ServicioGetAll } from "../../../services/ServicioService";
import Servicio from "../../../types/Servicio";
import styles from './TurnoModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import colorConfigs from "../../../configs/colorConfig";

interface TurnoTableProps {
    open: boolean;
    onClose: () => void;
    turno: Turno;
}

const TurnoModal: React.FC<TurnoTableProps> = ({ open, onClose, turno }) => {
    const [currentTurno, setCurrentTurno] = useState<Turno>({ ...turno });
    const [servicios, setServicios] = useState<Servicio[]>([]);

    type CustomChangeEvent = {
        target: {
            value: unknown;
        };
    };

    const handleLocalidadChange = (e: CustomChangeEvent) => {
        const servicioId = e.target.value as number;
        const servicio = servicios.find(s => s.id === servicioId) || null;
        setCurrentTurno(prev => ({
            ...prev,
            servicio: servicio
        }));
    };

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

        setCurrentTurno(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClose = () => {
        onClose();
        setCurrentTurno({ ...turno });
    }

    useEffect(() => {
        const fetchData = async () => {
            const servicios = await ServicioGetAll();
            setServicios(servicios);
        }

        fetchData();

        setCurrentTurno(prev => ({
            ...prev,
            fechaTurno: new Date().toISOString().split('T')[0]
        }));
    }, [])

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box className={styles.modal}>
                    <TextField
                        fullWidth
                        label="Fecha Turno"
                        type="date"
                        name="fechaTurno"
                        value={currentTurno.fechaTurno}
                        margin="normal"
                        className={styles.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Hora Turno"
                        type="time"
                        name="horaTurno"
                        value={currentTurno.horaTurno}
                        onChange={handleChange}
                        margin="normal"
                        className={styles.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="nombre"
                        value={currentTurno.nombre}
                        onChange={handleChange}
                        margin="normal"
                        className={styles.textField}
                        size="small"
                    />
                    <TextField
                        fullWidth
                        label="Apellido"
                        name="apellido"
                        value={currentTurno.apellido}
                        onChange={handleChange}
                        size="small"
                        className={styles.textField}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={currentTurno.email}
                        onChange={handleChange}
                        size="small"
                        className={styles.textField}
                        margin="normal"
                    />
                    <Autocomplete
                        options={servicios}
                        getOptionLabel={(option) => option.denominacion}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tipo de servicio"
                                margin="normal"
                                fullWidth
                                variant="outlined"
                                size="small"
                            />
                        )}
                        value={servicios.find(servicio => servicio.id === currentTurno.servicio?.id) || null}
                        onChange={(_, newValue) => handleLocalidadChange({ target: { value: newValue?.id || 0 } })}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        className={styles.autocomplete}
                    />
                    <CloseIcon onClick={handleClose} className={styles.closeButton} />
                    <Box className={styles.buttonContainer}>
                        <Button variant="contained" sx={{ ...colorConfigs.buttonStyles }} className={styles.button}>Agendar</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
};

export default TurnoModal;