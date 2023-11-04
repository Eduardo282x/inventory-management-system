import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export const LoginNew = () => {
    const [loginData,setLoginData] = useState({
        user: '',
        pass: ''
    });

    const dataLogin = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginData);
    }

    return (
    <Container maxWidth="sm">
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{minHeight: "90vh"}}
            >
            <Grid item>
                <Paper sx={{padding: "1.2em", borderRadius: "0.5em"}}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Typography variant="h4" sx={{mt:1,mb:1}} >Iniciar sesión</Typography>
                            <TextField 
                                fullWidth 
                                margin='normal'
                                label="Usuario"   
                                name="user"
                                onChange={dataLogin}
                                sx={{mt:2,mb:1}} 
                                value={loginData.user}
                                required/>
                            <TextField 
                                fullWidth 
                                type="password"
                                margin='normal'
                                name="pass"
                                onChange={dataLogin}
                                value={loginData.pass}
                                label="Contraseña" 
                                sx={{mt:1,mb:2}} 
                                required/>
                            <Button 
                                fullWidth
                                type='submit'
                                variant="contained"
                                sx={{mt:1.5,mb:2}} 
                                onClick={handleSubmit}
                            >Iniciar Sesión</Button>
                    </Box> 
                </Paper>
            </Grid>
        </Grid>
    </Container>
    );
};
