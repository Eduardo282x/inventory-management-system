import { ArrowBackIcon, ShoppingCartIcon, PointOfSaleIcon, Button, TextField, Paper, Backdrop, Snackbar, Box, Modal, Fade,} from '../materialUI'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getDataApi, postDataApi } from '../../backend/BasicAxios'
import { TablaComponents } from '../Shared/Table/TablaComponents';
import { style,validationSchemaEdit,dataFormSeller,columns,columnsName } from './cart.data';
import { FormGenerator } from '../Shared/FormGenerator/FormGenerator';
import * as yup from 'yup';

export const Cart = () => {
    const navigate = useNavigate();
    const [rows,setRows] = useState([]);
    const [total,setTotal] = useState(0);
    const [bodySheller,setBodySheller] = useState({});
    const [messageResponse, setMessageResponse] = useState('');
    const [openSnak, setOpenSnak] = useState(false);
    const [validationSchema, setValidationSchema] = useState(validationSchemaEdit);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [filteredRows,setFilteredRows] = useState([]);
    const [filterText, setFilterText] = useState('');

    const openEdit = () => {handleOpen()}

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpenSnak(false);
    };

    const getDataChild = (data) => {
        if(data.action == 'delete'){
            deleteCart(data.data)
        }

        if(data.action == 'Edit'){
            editCart(data.data)
            setOpenModal(false);
        }

        if(data.action == 'get'){
            const bodySend = {    
                IdCart: data.data.IdCart,
                Amount: data.data.Amount,
                Description: data.data.Description
            }
            const validationSchemaEdit = yup.object({
                Amount : yup.number().max(data.data.AmountMax,'La cantidad ingresada supera su existencia.').required('El campo es requerido'),
            });
            setValidationSchema(validationSchemaEdit)
            setBodySheller(bodySend)
            openEdit();
        }
    }

    const editCart = (cartBody) => {
        postDataApi('cart/edit', cartBody).then((data) => {
            if(data.success){ 
                setOpenSnak(true);
                setMessageResponse(data.message);
                getCart();
            }
        }).catch(err => console.log(err))
        getCart();
    }
    const deleteCart = (cartId) => {
        const bodyDelete = {IdCart: cartId.IdCart};
        postDataApi('cart/delete', bodyDelete).then((data) => {
            if(data.success){ 
                setOpenSnak(true);
                setMessageResponse(data.message);
                getCart();
            }
        }).catch(err => console.log(err))
        getCart();
    }

    const getCart = () => {
        getDataApi(`cart?IdSheller=${userData.Id}`).then((data)=> {
            let totalPrice = 0;
            data.map(total => totalPrice += total.Total);
            setTotal(totalPrice);
            setRows(data);
        }).catch(err => {
            console.log(err);
        })
    }

    const processSale = () => {
        const sale = {
            idSheller: userData.Id,
            details: rows,
            total: total
        }

        postDataApi('sales/add', sale).then((data) => {
            setOpenSnak(true);
            setMessageResponse(data.message);
            getCart();
        }). catch( err => console.log(err))
    }

    useEffect(()=> {
        getCart();
    }, []);

    useEffect(()=> {
        if(rows && rows.length > 0){
            const filteredRows = rows.filter((row) =>
            row.Description.toLowerCase().includes(filterText.toLowerCase())
            );
            setFilteredRows(filteredRows);
        }
    }, [rows, filterText]);

    const goBack = () => {navigate(-1);}
    
    return (
        <div className="log">
            <Paper elevation={24} className='paperWidh'>
                <div className="btnFilter">
                    <div className="buttonBack">
                        <Button variant="contained" onClick={goBack}>
                            <ArrowBackIcon className='back'/>
                        </Button>
                        <h1><ShoppingCartIcon className='groupIcon'/>Carrito</h1>
                    </div>

                    <div className="inputFilter">
                        <TextField
                            label="Buscar..."
                            className='filter'
                            value={filterText}
                            onChange={handleFilterChange}
                        />
                        <Button color="primary" variant="outlined" onClick={processSale} className='goingCart' endIcon={<PointOfSaleIcon/>}>
                            Procesar
                        </Button>
                    </div>

                </div>

                <div className="tableContent">
                    {rows  && filteredRows.length > 0?
                        <div className="w-full flex flex-col items-center justify-end py-5">
                            <p className='w-full text-right px-16 h-2'><span className='font-bold'>Total:</span> {total}$</p>
                            <TablaComponents 
                            rows={filteredRows} 
                            action={'Delete'}
                            columns={columns} 
                            columnsName={columnsName} 
                            sendFather={getDataChild}
                            />
                        </div>
                    :
                    <div className='mt-10'>
                        No se encuentran articulos en el carrito
                    </div>
                    }
                </div>

                <Snackbar
                    open={openSnak}
                    autoHideDuration={2000}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    onClose={handleCloseSnack}
                    message={messageResponse}
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
                                title={'Editar Articulo'}
                                dataForm={dataFormSeller}
                                bodySend={bodySheller}
                                action={'Edit'}
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
