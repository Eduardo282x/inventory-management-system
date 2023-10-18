import './login.css' 
import { useState } from 'react';
import Button from '@mui/material/Button';
import * as React from 'react';
// import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Box from '@mui/material/Box';
// import Input from '@mui/material/Input';
// import FilledInput from '@mui/material/FilledInput';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

export const Login = () => {
    const [nombre,setNombre] = useState('');
    const [pasword,setPassword] = useState('');

    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState('Todos los campos son obligatorios');

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(nombre === '' || pasword === ''){
            setError(true);
            setErrorMessage('Todos los campos son obligatorios');
            return
        }

        if(nombre !== 'admin' && pasword !== 'admin'){
            setErrorMessage('Usuario Invalido');
            setError(true)
            return
        }

        if(nombre === 'admin' && pasword === 'admin'){
            location.href='/home';
            setError(true)
            return
        }
        setError(false)
    }

    return (
    <>
        <form className="login" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                <InputLabel htmlFor="inputUser">Usuario</InputLabel>
                <OutlinedInput
                    id="inputUser"
                    type="text" 
                    label="Usuario"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        >
                        {<AccountCircleIcon />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>

            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={pasword}
                    onChange={e => setPassword(e.target.value)}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>


            <Button 
            variant="outlined"
            onClick={handleSubmit}
            >Iniciar Sesión</Button>
        {error && <p className='errorMessage'>{errorMessage}</p>}
        </form>
    </>
    )
};
