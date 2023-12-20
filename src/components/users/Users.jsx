import { TablaComponents } from '../Shared/Table/TablaComponents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupIcon from '@mui/icons-material/Group';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { FormGenerator } from '../Shared/FormGenerator/FormGenerator';
import { columns,columnsName, style, dataForm, bodySend } from './users.data';
import { getDataApi } from '../../backend/BasicAxios'
import './users.css'

export const Users = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const [filterText, setFilterText] = useState('');

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };
    
    const getDataChild = (data) => {
        handleClose()
        console.log(data);
    }

    const [rows,setRows] = useState([])

    useEffect(()=> {
        getDataApi('users').then((data)=> {
            console.log(data);
            setRows(data);
            console.log(rows);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const filteredRows = rows.filter((row) =>
        row.Name.toLowerCase().includes(filterText.toLowerCase()) ||
        row.Lastname.toLowerCase().includes(filterText.toLowerCase()) ||
        row.Email.toLowerCase().includes(filterText.toLowerCase()) ||
        row.Identify.includes(filterText) ||
        row.Phone.includes(filterText)
    );

    const goBack = () => {navigate(-1);}
    
    return (
        <div className="log">
            <Paper elevation={24} className='paperWidh'>
                <div className="btnFilter">
                    <div className="buttonBack">
                        <Button variant="contained" onClick={goBack}>
                            <ArrowBackIcon className='back'/>
                        </Button>
                        <h1><GroupIcon className='groupIcon'/>Usuarios</h1>
                    </div>

                    <div className="inputFilter">
                        <TextField
                            label="Buscar..."
                            className='filter'
                            value={filterText}
                            onChange={handleFilterChange}
                        />

                        <IconButton color="primary" aria-label="add" className='btnAdd' onClick={handleOpen}>
                            <AddIcon/>
                        </IconButton>
                    </div>
                </div>

                <div className="tableContent">
                    <TablaComponents rows={filteredRows} columns={columns} columnsName={columnsName}/>
                </div>

                <div className="modal">
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openModal}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                    }}
                >
                    <Fade in={openModal}>
                    <Box sx={style}>
                        <FormGenerator title={'Agregar Usuario'} dataForm={dataForm} bodySend={bodySend} sendFather={getDataChild}/>
                    </Box>
                    </Fade>
                </Modal>
                </div>
            </Paper>
        </div>
    )
}
