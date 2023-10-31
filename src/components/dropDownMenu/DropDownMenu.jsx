import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DatasetIcon from '@mui/icons-material/Dataset';
import './dropDownMenu.css'

export const DropDownMenu = () => {
  return (
    <div className="drop">
        <ul>
            <Link to={'/profile'} className="links"><AccountCircleIcon/>Perfil</Link>
            <Link to={'/inventory'} className="links"><DatasetIcon/>Inventario</Link>
            <Link to={'/'} className="links"><LogoutIcon/> Cerrar Sesión</Link>
        </ul>
    </div>
  )
}
