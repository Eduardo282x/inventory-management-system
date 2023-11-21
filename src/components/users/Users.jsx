import { TablaComponents } from '../Shared/Table/TablaComponents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupIcon from '@mui/icons-material/Group';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import './users.css'
import { FormGenerator } from '../Shared/FormGenerator/FormGenerator';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};

export const Users = () => {

    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const bodySend = {    
        Name: '',
        LastName: '',
        Email: '',
        Id: '',
        Phone: '',
    }

    const dataForm =[
        {
            label: 'Nombre',
            input: true,
            type: 'text',
            name: 'Name'
        },
        {
            label: 'Apellido',
            input: true,
            type: 'text',
            name: 'LastName'
        },
        {
            label: 'Correo',
            input: true,
            type: 'email',
            name: 'Email'
        },
        {
            label: 'Cedula',
            input: true,
            type: 'number',
            name: 'Id'
        },
        {
            label: 'Telefono',
            input: true,
            type: 'phone',
            name: 'Phone'
        },
    ]

    function createData(name, lastname, email, id, phone) {
        return { name, lastname, email, id, phone };
    }

    const [filterText, setFilterText] = useState('');

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };
    
    const rows = [
        createData('admin', 'admin', 'email', '28391325', '+58 4165610813'),
        createData('Jorge', 'García', 'jorge.garcia@example.com', '28391325', '+58 4165610813'),
        createData('María', 'Hernández', 'maria.hernandez@example.com', '19876543', '+58 4241234567'),
        createData('Luis', 'Martínez', 'luis.martinez@example.com', '12345678', '+58 4149876543'),
        createData('Ana', 'González', 'emana.gonzalez@example.comail', '87654321', '+58 4161234567'),
        createData('Carlos', 'Pérez', 'carlos.perez@example.com', '87654321', '+58 4249876543'),
    ];

    const columns = ['Nombre','Apellido','Correo','Cédula','Teléfono','Editar']
    const columnsName = [
    {
        column:'name',
        type:'string',
    },
    {
        column:'lastname',
        type:'string',
    },
    {
        column:'email',
        type:'string',
    },
    {
        column:'id',
        type:'string',
    },
    {
        column:'phone',
        type:'string',
    }]

    const filteredRows = rows.filter((row) =>
        row.name.toLowerCase().includes(filterText.toLowerCase()) ||
        row.lastname.toLowerCase().includes(filterText.toLowerCase()) ||
        row.email.toLowerCase().includes(filterText.toLowerCase()) ||
        row.id.includes(filterText) ||
        row.phone.includes(filterText)
    );
    
    const getDataChild = (data) => {
        handleClose()
        console.log(data);
    }

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
