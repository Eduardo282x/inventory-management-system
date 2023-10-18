import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './home.css'

export const Home = () => {

    const backLogin = () => {
        location.href = '/'
    }

    return (
        <>
        <h1>Bienvenido</h1>
        <Button
        variant="contained"
        className='btnBack'
        onClick={backLogin}
        >
            <ArrowBackIcon></ArrowBackIcon>
            Volver</Button>
        </>
    )
}
