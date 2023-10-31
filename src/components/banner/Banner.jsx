import './banner.css' 
import MenuIcon from '@mui/icons-material/Menu';
import { DropDownMenu } from '../dropDownMenu/DropDownMenu';
import { useState } from 'react';
import { Outlet } from "react-router-dom";


export const Banner = () => {
  const [openMenu,setOpenMenu] = useState(false);

  const menu = () => {setOpenMenu(!openMenu);}

  return (
    <div className="bannerDisplay">
        <h1>Sistema de Inventario</h1>
        <MenuIcon onClick={menu} className='menuIcon'></MenuIcon>
        {openMenu ? <DropDownMenu/> : <></>}
        <Outlet/>
    </div>
  )
}
