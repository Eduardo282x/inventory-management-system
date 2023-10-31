import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import './home.css'
import { Banner } from '../banner/Banner';

export const Home = () => {
    const navigate = useNavigate();

    const backLogin = () => {
        navigate("/")
    }

    return (
        <>
        <Banner></Banner>
        <h1 className='textHome'>Bienvenido</h1>
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
