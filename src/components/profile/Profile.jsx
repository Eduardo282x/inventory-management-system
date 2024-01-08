import './profile.css'
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { profileData, profileSend, validationSchema } from './profile.data';
import  Button  from '@mui/material/Button';
import { useFormik } from 'formik';
import { postDataApi } from '../../backend/BasicAxios';
import { position } from './profile.data';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import * as React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Profile = () => {
  const [open, setOpen] = useState(false);
  const [messageType, setMessageType] = useState("");
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
  };

  const [message, setMessage] = useState("");

  const changeDataProfile = (values) => {
    postDataApi('/authentication/change', values).then((data) => {
      setMessage(data.message);
      setMessageType(data.success ? 'success' : 'error');
    }).catch(err => console.log(err))
  }

  const formik = useFormik({
    initialValues: profileSend,
    validationSchema: validationSchema,
    onSubmit: (values) => changeDataProfile(values)
  });

  return (
    <div className="log">
    <Paper elevation={24} className='w-[30rem] h-[40rem] py-3'>
        <div className="flex items-center justify-center flex-col w-full">
            <div className="profileCenter">
                <h1 className='mb-4 mt-2'><PersonIcon className='groupIcon'/>Perfil</h1>
            </div>

            <form onSubmit={formik.handleSubmit} className="flex flex-col items-center justify-center w-full gap-5">
              {profileData.map((input, index )=> (
                <TextField
                  disabled={input.disabled}
                  variant="outlined" 
                  type='text'
                  name={input.name}
                  onChange={formik.handleChange}
                  label={input.label}
                  value={input.value == '' ? formik[input.value] : input.value}
                  key={index}
                />
              ))}
              
              <Button variant="contained" type='submit'>Aceptar</Button>
              
            </form>
        </div>

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={position}>
          <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
              {message}
          </Alert>
        </Snackbar>
    </Paper>
</div>
  )
}
