import * as React from "react";
import "./login.css";
import { useState } from "react";
import Button from "@mui/material/Button";
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { postDataApi } from "../../backend/BasicAxios";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Login = () => {
    const [loginData, setLoginData] = useState({
        Username: "",
        Password: "",
    });

    const position = {
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    };
    
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const dataLogin = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleMouseDownPassword = (event) => {event.preventDefault();};

    const handleSubmit = (e) => {
        e.preventDefault();

        postDataApi('/authentication', loginData).then((data) => {
            setOpen(true);
            setMessageType(data.success ? 'success' : 'error');
            setMessage(data.message);
            if(data.success){
                localStorage.setItem('userData', JSON.stringify(data.userData));
                setTimeout(() => {
                    navigate("/home");
                }, 1500);
            }
        }).catch(err =>{
            console.log(err);
        });

        if (loginData.Username === "" || loginData.Password === "") {
            setError(true);
            return;
        }

        setError(false);
    };

    return (
        <div className="loginBackground">
            <form className="login" onSubmit={handleSubmit}>
                <h1>Login</h1>

                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="inputUser">Usuario</InputLabel>
                    <OutlinedInput
                        id="inputUser"
                        type="text" 
                        label="Usuario"
                        value={loginData.Username}
                        name="Username"
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
                        value={loginData.Password}
                        name="Password"
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

                <Button variant="outlined" type="submit" onClick={handleSubmit}>
                    Iniciar Sesión
                </Button>
                {error && <p className="errorMessage">Todos los campos son obligatorios</p>}
            </form>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={position}>
                <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};
