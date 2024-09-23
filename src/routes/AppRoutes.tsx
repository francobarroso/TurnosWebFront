import { Route, Routes } from "react-router-dom"
import Inicio from "../screens/Inicio"
import Ingreso from "../screens/Ingreso"
import Turnos from "../screens/Turnos"
import Dashboard from "../screens/prub"

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Ingreso />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/turnos" element={<Turnos />} />
            <Route path="/asd" element={<Dashboard />} />
        </Routes>
    )
}