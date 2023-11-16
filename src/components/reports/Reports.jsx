import './reports.css'
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";


export const Reports = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    }
    
        return (
        <div className="log">
            <Button variant="contained" onClick={goBack}>
                <ArrowBackIcon className='back'/>
            </Button>
            <h1>Reportes </h1>
        </div>
    )
}
