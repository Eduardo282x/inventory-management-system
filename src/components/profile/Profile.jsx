import './profile.css'
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();

  const goBack = () => {
      navigate(-1);
  }

  return (
    <div className="log"> 
      <Button variant="contained" onClick={goBack}>
            <ArrowBackIcon className='back'/>
        </Button>
      <h1>Perfil </h1>
    </div>
  )
}
