import { Link } from 'react-router-dom';
import './banner.css' 
import LogoutIcon from '@mui/icons-material/Logout';

export const Banner = () => {
  return (
    <div className="bannerDisplay">
        <h1>Sistema de Inventario</h1>
        
        <div className="logout">
            <LogoutIcon></LogoutIcon>
            <Link to={'/'} className='logout'>Cerrar Sesión</Link>
        </div>
    </div>
  )
}
