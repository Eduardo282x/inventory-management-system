import './banner.css' 
import MenuIcon from '@mui/icons-material/Menu';
import { DropDownMenu } from '../dropDownMenu/DropDownMenu';
import { useState } from 'react';
// import { Outlet } from "react-router-dom";


export const Banner = () => {
  const [openMenu,setOpenMenu] = useState(false);

  const menu = () => {setOpenMenu(!openMenu);}

  return (
    <div className='bannerBackground'>
      <div className="bannerDisplay">
        <div className="flex items-center justify-center gap-2">
          <div className="logo"></div>
          <h1>Sistema de Inventario</h1>
        </div>
        <MenuIcon onClick={menu} className='menuIcon'></MenuIcon>
        {openMenu ? <DropDownMenu close={setOpenMenu}/> : <></>}
      </div>
    </div>
  )
}
