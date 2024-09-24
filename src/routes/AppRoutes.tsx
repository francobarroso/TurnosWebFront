import { Route, Routes } from "react-router-dom"
import Inicio from "../screens/Inicio"
import Turnos from "../screens/Turnos"
import Empleados from "../screens/Empleados"
import Ingreso from "../screens/Ingreso"
import PreLayout from "../components/layout/PreLayout"

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Ingreso />} />
            <Route element={<PreLayout />}>
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/turnos" element={<Turnos />} />
                <Route path="/empleados" element={<Empleados />} />
            </Route>
        </Routes>
    )
}