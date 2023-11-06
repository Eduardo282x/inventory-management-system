/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DatasetIcon from '@mui/icons-material/Dataset';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import './dropDownMenu.css'
export const DropDownMenu = ({close}) => {
  const navigate = useNavigate();

  const redirect = (path) => {
    navigate(path)
    close(false)
  }

  const logout = (path) => {
    redirect(path)
    localStorage.removeItem('userData')
  }
  return (
    <div className="drop">
        <ul>
            <li onClick={() => redirect('/profile')} className="links"><AccountCircleIcon/>Perfil</li>
            <li onClick={() => redirect('/users')} className="links"><GroupIcon/>Usuarios</li>
            <li onClick={() => redirect('/inventory')} className="links"><DatasetIcon/>Inventario</li>
            <li onClick={() => redirect('/reports')} className="links"><DashboardIcon/>Reportes</li>
            <li onClick={() => logout('/')} className="links"><LogoutIcon/> Cerrar Sesión</li>
        </ul>
    </div>
  )
}
