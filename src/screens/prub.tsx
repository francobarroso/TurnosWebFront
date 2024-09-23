import HomeIcon from '@mui/icons-material/Home';
import MonitorIcon from '@mui/icons-material/Monitor';
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

export default function Dashboard() {
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="bg-red-700 p-4 text-white">
        <h1 className="text-2xl font-bold">TurnosWeb</h1>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <nav className="w-64 bg-white p-4 shadow-md">
          <ul className="space-y-2">
            <li>
              <Link
                to="/inicio"
                className="flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100"
              >
                <HomeIcon className="mr-2 h-5 w-5" />
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/turnos"
                className="flex items-center rounded-lg bg-red-100 p-2 text-red-700"
              >
                <MonitorIcon className="mr-2 h-5 w-5" />
                Turnos
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-1 overflow-auto p-4">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <Button className="bg-red-700 hover:bg-red-800">
                + GENERAR TURNO
              </Button>
              <div className="text-right">
                <span className="text-5xl font-bold">20</span>
                <p className="text-sm text-gray-500">Turnos</p>
              </div>
            </div>
            {/* Add your shifts list or other content here */}
          </div>
        </main>
      </div>
    </div>
  )
}