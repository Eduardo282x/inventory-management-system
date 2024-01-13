/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DatasetIcon from '@mui/icons-material/Dataset';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import './dropDownMenu.css';
import { useEffect, useState } from "react";
import { menuOption } from "./dropDownMenu.data";

export const DropDownMenu = ({close}) => {
  const navigate = useNavigate();
  const [menu, setMenu]= useState(menuOption)

  useEffect(() => {
    changeMenuPermise()
  }, []);

  const changeMenuPermise = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const menuTemp = menu.filter(adm => adm.permises.includes(userData.Rol))
    setMenu(menuTemp)
  }

  const setIcon = (iconName) => {
    switch (iconName) {
      case 'profile':
        return <AccountCircleIcon />;
      case 'users':
        return <GroupIcon />;
      case 'inventory':
        return <DatasetIcon />;
      case 'reports':
        return <DashboardIcon />;
      case 'logout':
        return <LogoutIcon />;
      default:
        return null;
    }
  }

  const redirect = (path) => {
    if(path != '/'){
      navigate(path)
      close(false)
    } else {
      navigate('/');
      localStorage.removeItem('userData')
    }
  }

  return (
    <div className="drop">
        <ul className="w-full">
          {menu.map(option => (
            <li key={option.title} onClick={() => redirect(option.redirect)} className="links">{setIcon(option.icon)} {option.title}</li>
          ))}
        </ul>
    </div>
  )
}
