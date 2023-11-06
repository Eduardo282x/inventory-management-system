import './users.css'
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";


export const Users = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/home')
    }
    
        return (
        <div className="log">
            <Button variant="contained" onClick={goBack}>
                <ArrowBackIcon className='back'/>
            </Button>
            <h1>Usuarios </h1>
        </div>
    )
}
