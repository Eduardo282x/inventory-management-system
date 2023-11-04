import { Button } from '@mui/material';
import './home.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';


export const Home = () => {    
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/')
    }
    return (
        <div className='homeContent'>
            <Button variant="contained" onClick={goBack}>
                    <ArrowBackIcon className='back'/>
            </Button>
            <h1 className='textHome'>Bienvenido</h1>
        </div>
    )
}
