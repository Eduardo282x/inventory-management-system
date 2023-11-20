import './profile.css'
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export const Profile = () => {
  const navigate = useNavigate();

  const goBack = () => {
      navigate(-1);
  }

  const userData = JSON.parse(localStorage.getItem('userData'))

  const [nombre,setNombre] = useState(userData.nombre)

  console.log(userData);

  // setTimeout(() => {
  //   setNombre(userData.nombre)
  // }, 1500);

  return (
    <div className="log">
    <Paper elevation={24} className='profileWidh'>
        <div className="profileContent">
            <div className="profileCenter">
                <Button variant="contained" onClick={goBack}>
                    <ArrowBackIcon className='back'/>
                </Button>
                <h1><PersonIcon className='groupIcon'/>Perfil</h1>
            </div>

            <div className="profileInfo">
              <TextField id="outlined-basic" label="Nombre" value={nombre} variant="outlined" />
            </div>
        </div>
    </Paper>
</div>
  )
}
