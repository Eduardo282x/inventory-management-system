import { useState } from 'react';
import './users.css'
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import GroupIcon from '@mui/icons-material/Group';
import TextField from '@mui/material/TextField';

import { TablaComponents } from '../Shared/Table/TablaComponents';

export const Users = () => {

    const navigate = useNavigate();

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
    const columnsName = ['name','lastname','email','id','phone',]

    const filteredRows = rows.filter((row) =>
        row.name.toLowerCase().includes(filterText.toLowerCase()) ||
        row.lastname.toLowerCase().includes(filterText.toLowerCase()) ||
        row.email.toLowerCase().includes(filterText.toLowerCase()) ||
        row.id.includes(filterText) ||
        row.phone.includes(filterText)
    );
    

    const goBack = () => {
        navigate(-1);
    }
    
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
                    </div>
                </div>

                <div className="tableContent">
                    <TablaComponents rows={filteredRows} columns={columns} columnsName={columnsName}/>
                </div>
            </Paper>
        </div>
    )
}
