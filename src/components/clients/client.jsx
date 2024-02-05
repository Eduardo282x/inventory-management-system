import { TablaComponents } from '../Shared/Table/TablaComponents';
import { FormGenerator } from '../Shared/FormGenerator/FormGenerator';
import { columns,columnsName, style, dataForm, bodySend, validationSchema } from './client.data';
import { getDataApi, postDataApi } from '../../backend/BasicAxios';
import {ArrowBackIcon,GroupIcon,IconButton,AddIcon,TextField,Paper,Button,Backdrop,Box,Modal,Fade,Snackbar,} from '../materialUI'

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import './client.data'

export const Clients = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [actionForm, setActionForm] = useState('add');
    const [bodyForm, setBodyForm] = useState(bodySend);
    const [columnsState, setColumnsState] = useState(columns);
    const [columnsNameState, setColumnsNameState] = useState(columnsName);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const [filterText, setFilterText] = useState('');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [rows,setRows] = useState([]);
    const [openSnak, setOpenSnak] = useState(false);
    const [messageResponse, setMessageResponse] = useState('');

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpenSnak(false);
    };

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    const openNew = () => {
        setBodyForm(bodySend)
        setActionForm('add')
        handleOpen()
    }
    
    const getDataChild = (data) => {
        if(data.action == 'add'){
            handleClose()
            addClient(data.data)
        }

        if(data.action == 'edit'){
            handleClose()
            editClient(data.data)
        }

        if(data.action == 'delete'){
            const clientId = {Id: data.data.Id}
            deleteClient(clientId)
        }

        if(data.action == 'get'){
            const dataEdit = {
                Id: data.data.Id,
                Name: data.data.Name,
                Lastname: data.data.Lastname,
                Email: data.data.Email,
                Identify: data.data.Identify,
                Phone: data.data.Phone,
                Address: data.data.Address,
            }
            setActionForm('edit')
            setBodyForm(dataEdit)
            handleOpen()
        }
    }

    const deleteClient = (clientId) => {
        handleClose()

        postDataApi('client/delete', clientId).then((data) => {
            if(data.success){ 
                setOpenSnak(true);
                setMessageResponse(data.message);
                getClients()
            }
        }).catch(err => console.log(err))

        setActionForm('add')
    }
    const editClient = (userEdit) => {
        handleClose()

        postDataApi('client/edit', userEdit).then((data) => {
            if(data.success){ 
                setOpenSnak(true);
                setMessageResponse(data.message);
                getClients()
            }
        }).catch(err => console.log(err))

        setActionForm('add')
    }
    const addClient = (newUser) => {
        postDataApi('client/add', newUser).then((data) => {
            if(data.success){ 
                setOpenSnak(true);
                setMessageResponse(data.message);
                getClients()
            }
        }).catch(err => console.log(err))
    }

    const getClients = () => {
        getDataApi('client').then((data)=> {
            setRows(data);
        }).catch(err => {
            console.log(err);
        })
    }

    const changeColumn = () => {
        if(userData && userData.Id != 1){
            const columnsVendedor = columns.filter(item => item != 'Borrar');
            const columnsNameVendedor = columnsName.filter(item => item.column != 'Borrar');
            setColumnsState(columnsVendedor);
            setColumnsNameState(columnsNameVendedor);
        }
    }

    useEffect(()=> {
        getClients();
        changeColumn();
    }, []);

    const filteredRows = rows && rows.filter((row) =>
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
                        <h1><GroupIcon className='groupIcon'/>Clientes</h1>
                    </div>

                    <div className="inputFilter">
                        <TextField
                            label="Buscar..."
                            className='filter'
                            value={filterText}
                            onChange={handleFilterChange}
                        />

                        <IconButton color="primary" aria-label="add" className='btnAdd' onClick={openNew}>
                            <AddIcon/>
                        </IconButton>
                    </div>
                </div>

                {filteredRows && 
                    <div className="tableContent">
                    <TablaComponents 
                    rows={filteredRows} 
                    columns={columnsState} 
                    columnsName={columnsNameState} 
                    action={'Edit'}
                    sendFather={getDataChild}/>
                </div>
                }
                

                <Snackbar
                    open={openSnak}
                    autoHideDuration={3000}
                    onClose={handleCloseSnack}
                    message={messageResponse}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    // action={action}
                />

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
                            <FormGenerator
                                title={actionForm == 'add' ? 'Agregar Cliente' : 'Editar Cliente'}
                                dataForm={dataForm}
                                bodySend={bodyForm}
                                action={actionForm}
                                validationSchema={validationSchema}
                                sendFather={getDataChild}
                            />
                        </Box>
                    </Fade>
                </Modal>
                </div>
            </Paper>
        </div>
    )
}
