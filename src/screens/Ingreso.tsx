import { Button } from "@mui/material";

function Ingreso() {
    return (
        <>
            <h1>Ingreso</h1>
            <Button variant="contained" onClick={() => window.location.href = "/inicio"}>Entrar</Button>
        </>
    )
}

export default Ingreso;