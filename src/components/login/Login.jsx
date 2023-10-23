import "./login.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Icon from "@mui/material/Icon";
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [loginData, setLoginData] = useState({
        nombre: "",
        password: "",
    });
    const navigate = useNavigate();

    const dataLogin = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const [errorMessage, setErrorMessage] = useState(
        "Todos los campos son obligatorios"
    );

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginData);

        if (loginData.nombre === "" || loginData.password === "") {
            setError(true);
            setErrorMessage("Todos los campos son obligatorios");
            return;
        }

        if (loginData.nombre !== "admin" && loginData.password !== "admin") {
            console.log(loginData);
            setErrorMessage("Usuario Invalido");
            setError(true);
            return;
        }

        if (loginData.nombre === "admin" && loginData.password === "admin") {
            navigate("/home");
            setError(false);
            return;
        }
        setError(false);
    };

    return (
        <>
            <form className="login" onSubmit={handleSubmit}>
                <h1>Login</h1>

            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="inputUser">Usuario</InputLabel>
                <OutlinedInput
                    id="inputUser"
                    type="text" 
                    label="Usuario"
                    value={loginData.nombre}
                    name="nombre"
                    onChange={dataLogin}
                    endAdornment={
                    <InputAdornment position="end">
                        <Icon>
                        {<AccountCircleIcon />}
                        </Icon>
                    </InputAdornment>
                    }
                />
            </FormControl>

            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                <OutlinedInput
                    label="Contraseña"
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    name="password"
                    onChange={dataLogin}
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

                <Button variant="outlined" onClick={handleSubmit}>
                    Iniciar Sesión
                </Button>
                {error && <p className="errorMessage">{errorMessage}</p>}
            </form>
        </>
    );
};
