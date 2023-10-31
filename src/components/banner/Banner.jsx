import './banner.css' 
import LogoutIcon from '@mui/icons-material/Logout';

export const Banner = () => {
  return (
    <div className="bannerDisplay">
        <h1>Sistema de Inventario</h1>
        
        <div className="logout">
            <LogoutIcon></LogoutIcon>
            <p>Cerrar Sesión</p>
        </div>
    </div>
  )
}
