import { useState } from 'react';
import './users.css'
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

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

    const filteredRows = rows.filter((row) =>
        row.name.toLowerCase().includes(filterText.toLowerCase()) ||
        row.lastname.toLowerCase().includes(filterText.toLowerCase()) ||
        row.email.toLowerCase().includes(filterText.toLowerCase()) ||
        row.id.includes(filterText) ||
        row.phone.includes(filterText)
    );
    

    const goBack = () => {
        navigate('/home')
    }
    
    return (
        <div className="log">
            <Paper elevation={24} className='paperWidh'>
                <div className="btnFilter">
                    <div className="buttonBack">
                        <Button variant="contained" onClick={goBack}>
                            <ArrowBackIcon className='back'/>
                        </Button>
                        <h1><GroupIcon className='groupIcon'/>Usuarios 2</h1>
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
                    <TableContainer component={Paper } className='table'>
                        <Table>
                            <TableHead className='tHeader'>
                                <TableRow >
                                    <TableCell className='textHead'>Nombre</TableCell>
                                    <TableCell className='textHead'>Apellido</TableCell>
                                    <TableCell className='textHead'>Correo</TableCell>
                                    <TableCell className='textHead'>Cédula</TableCell>
                                    <TableCell className='textHead'>Teléfono</TableCell>
                                    <TableCell className='textHead'>Editar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {filteredRows.map((row) => (
                                <TableRow key={row.name} >
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.lastname}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell><IconButton className='editBtn'><EditIcon/></IconButton></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Paper>
        </div>
    )
}
