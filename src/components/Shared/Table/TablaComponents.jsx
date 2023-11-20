import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import PropTypes from "prop-types";
import './TablaComponents.css';

export const TablaComponents = ({columns, rows, columnsName}) => {
    return (
        <div className='tableComponentContent'>
            <TableContainer component={Paper} className="table">
                <Table>
                    <TableHead className="tHeader">
                        <TableRow>
                            {columns.map((col, ind) => (
                                <TableCell className="textHead" key={ind}>{col}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
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
        </div>
    );
};


TablaComponents.propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
    columnsName: PropTypes.array,
};