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
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const [filterText, setFilterText] = useState('');

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
            addUser(data.data)
        }

        if(data.action == 'edit'){
            handleClose()
            editUser(data.data)
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

    const editUser = (userEdit) => {
        handleClose()

        postDataApi('client/edit', userEdit).then((data) => {
            if(data.success){ 
                setOpenSnak(true);
                setMessageResponse(data.message);
                getUsers()
            }
        }).catch(err => console.log(err))

        setActionForm('add')
    }

    const addUser = (newUser) => {
        postDataApi('client/add', newUser).then((data) => {
            if(data.success){ 
                setOpenSnak(true);
                setMessageResponse(data.message);
                getUsers()
            }
        }).catch(err => console.log(err))
    }

    const [rows,setRows] = useState([])

    const getUsers = () => {
        getDataApi('client').then((data)=> {
            setRows(data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(()=> {
        getUsers();
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
                    columns={columns} 
                    columnsName={columnsName} 
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
                                title={'Agregar Cliente'}
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
