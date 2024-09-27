import { Link, NavLink, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import MonitorIcon from '@mui/icons-material/Monitor';
import PeopleIcon from '@mui/icons-material/People';
import styles from './SideBar.module.css';
import { useEffect, useState } from "react";

function SideBar() {
    const location = useLocation();
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
            <div className={styles.sidebar}>
                <ul>
                    <li className={location.pathname === "/inicio" ? styles.active : ""} >
                        <NavLink to={"/inicio"} className={styles.link}>
                            <HomeIcon />
                            {windowDimension.width > 800 && (<span>Inicio</span>)}
                        </NavLink>
                    </li>
                    <li className={location.pathname === "/turnos" ? styles.active : ""}>
                        <Link to={"/turnos"} className={styles.link}>
                            <MonitorIcon />
                            {windowDimension.width > 800 && (<span>Turnos</span>)}
                        </Link>
                    </li>
                    <li className={location.pathname === "/empleados" ? styles.active : ""}>
                        <Link to={"/empleados"} className={styles.link}>
                            <PeopleIcon />
                            {windowDimension.width > 800 && (<span>Empleados</span>)}
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SideBar;