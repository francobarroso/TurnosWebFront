import { Link, NavLink, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import MonitorIcon from '@mui/icons-material/Monitor';

function SideBar() {
    const location = useLocation();
    
    return (
        <>
            <div className="sidebar">
                <ul>
                    <li className={location.pathname === "/inicio" ? "active" : ""} >
                        <NavLink to={"/inicio"} className={"link"}>
                            <HomeIcon />
                            <span>Inicio</span>
                        </NavLink>
                    </li>
                    <li className={location.pathname === "/turnos" ? "active" : ""}>
                        <Link to={"/turnos"} className={"link"}>
                            <MonitorIcon />
                            Turnos
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SideBar;