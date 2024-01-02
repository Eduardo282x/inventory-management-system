import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import PropTypes from "prop-types";
import { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import './TablaComponents.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1565c0',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const TablaComponents = ({columns, rows, columnsName}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    return (
        <div className='tableComponentContent'>
            <TableContainer component={Paper} className="table">
                <Table stickyHeader>
                    <TableHead sx={{background:'#1565c0'}}>
                        <TableRow>
                            {columns.map((col, ind) => (
                                <StyledTableCell className="textHead" key={ind}>{col}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                            <TableRow key={index}>
                                {columnsName.map((ro) => (
                                    <TableCell key={ro}>
                                        {ro.type == 'string' ? row[ro.column] : '' }
                                        {ro.type == 'mm' ? row[ro.column] + 'mm': '' }
                                        {ro.type == 'price' ? row[ro.column] + '$' : '' }
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <IconButton className="editBtn">
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5,10, 25,50,100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={'Paginas'}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};


TablaComponents.propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
    columnsName: PropTypes.array,
};