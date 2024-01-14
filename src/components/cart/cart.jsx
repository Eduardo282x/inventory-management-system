import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { TablaComponents } from '../Shared/Table/TablaComponents';
import { columns,columnsName } from './cart.data';
import { getDataApi, postDataApi } from '../../backend/BasicAxios'

export const Cart = () => {
    const navigate = useNavigate();
    const [rows,setRows] = useState([]);
    const [filteredRows,setFilteredRows] = useState([]);
    const [filterText, setFilterText] = useState('');

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    const getDataChild = (data) => {
        deleteCart(data.data)
    }

    const deleteCart = (cartId) => {
        const bodyDelete = {IdCart: cartId.IdCart};
        postDataApi('cart/delete', bodyDelete).then((data) => {
            if(data.success){ getCart()}
        }).catch(err => console.log(err))
        getCart();
    }

    const getCart = () => {
        getDataApi('cart').then((data)=> {
            console.log(data);
            setRows(data);
        }).catch(err => {
            console.log(err);
        })
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
                    </div>
                </div>

                <div className="tableContent">
                    {rows  && filteredRows.length > 0?
                        <TablaComponents 
                        rows={filteredRows} 
                        action={'Delete'}
                        columns={columns} 
                        columnsName={columnsName} 
                        sendFather={getDataChild}
                        />
                    :
                    <div className='mt-10'>
                        No se encuentran articulos en el carrito
                    </div>
                    }
                </div>
            </Paper>
        </div>
    )
}
