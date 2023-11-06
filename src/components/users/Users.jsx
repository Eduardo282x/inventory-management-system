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

export const Users = () => {

    const navigate = useNavigate();

    function createData(name, lastname, email, id, phone) {
        return { name, lastname, email, id, phone };
    }

    const rows = [
        createData('admin', 'admin', 'email', '28391325', '+58 4165610813'),
    ];
    

    const goBack = () => {
        navigate('/home')
    }
    
        return (
        <div className="log">
            <Paper elevation={24} className='paperWidh'>
                <div className="buttonBack">
                    <Button variant="contained" onClick={goBack}>
                        <ArrowBackIcon className='back'/>
                    </Button>
                    <h1>Usuarios</h1>
                </div>

                <div className="tableContent">
                    <TableContainer component={Paper } sx={{ maxWidth: 650 }} className='table'>
                        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Apellido</TableCell>
                                <TableCell>Correo</TableCell>
                                <TableCell>Cedula</TableCell>
                                <TableCell>Telefono</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} >
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.lastname}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
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
