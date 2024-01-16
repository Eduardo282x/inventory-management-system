import "./reports.css";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import {Button,ArrowBackIcon,Paper,DashboardIcon,TextField,Backdrop,Modal,Fade,Box,DownloadIcon} from "../materialUI";

import { useState } from "react";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from "formik";
import { TablaComponents } from "../Shared/Table/TablaComponents";
import { bodyReport,validationSchema, columns, columnsName,style, columnsDetails, columnsNameDetails} from "./reports.data";
import { getDataApi, postDataApi } from "../../backend/BasicAxios";

export const Reports = () => {
    const [rows, setRows] = useState([]);
    const [rowsDetails, setRowsDetails] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [IdSales, setIdSales] = useState('');
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    const handleClose = () => setOpenModal(false);
    const handleOpen = () => setOpenModal(true);

    const getDataChild = (data) => {
        handleOpen()
        getDetails(data.data.IdSales)
    };

    const getDetails = (idSales) => {
        setIdSales(idSales);
        getDataApi(`sales/details?IdSales=${idSales}`).then((data) => {
            setRowsDetails(data)
        }).catch(err => console.log(err))
    };

    const postReport = (values) => {
        const dataSales = {
            start: values.start.toISOString(),
            end: values.end.toISOString()
        }

        postDataApi('sales', dataSales).then((data) => {
            setRows(data.response);
        }).catch(err => console.log(err))
    };

    const formik = useFormik({
        initialValues: bodyReport,
        validationSchema: validationSchema,
        onSubmit: (values) => postReport(values),
    })

    return (
        <div className="log">
            <Paper elevation={24} className="paperWidh">
                <div className="flex flex-row items-center justify-start gap-5 w-full">
                    <div className="flex items-center justify-start px-8">
                        <Button variant="contained" onClick={goBack}>
                            <ArrowBackIcon className="back" />
                        </Button>
                        <h1>
                            <DashboardIcon className="groupIcon" />
                            Reportes
                        </h1>
                    </div>

                    <form className="flex items-center justify-center gap-5 " onSubmit={formik.handleSubmit}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Fecha Inicio"
                                value={formik.values.start}
                                onChange={(date) => formik.setFieldValue('start', date)}
                                renderInput={(params) => <TextField {...params} />}
                                maxDate={moment().toDate()} 
                            />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                label="Fecha Fin"
                                value={formik.values.end}
                                onChange={(date) => formik.setFieldValue('end', date)}
                                renderInput={(params) => <TextField {...params} />}
                                maxDate={moment().toDate()} 
                            />
                        </LocalizationProvider>

                        <Button variant="contained" type="submit">
                            Buscar
                        </Button>
                    </form>
                </div>

                <div className="tableContent">
                    {rows && rows.length > 0 ? (
                            <TablaComponents
                                rows={rows}
                                columns={columns}
                                columnsName={columnsName}
                                sendFather={getDataChild}
                            />
                    ) : (
                        <div className="mt-10">
                            
                        </div>
                    )}
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
                        {rowsDetails && rowsDetails.length > 0 ? (
                            <div className="flex flex-col items-start justify-center w-full">
                                <div className="flex items-center justify-between w-full px-15">
                                    <p>Numero de pedido: {IdSales}</p>
                                    <Button variant="contained" onClick={handleClose}>
                                        <DownloadIcon/>
                                        Descargar
                                    </Button>
                                </div>
                                <TablaComponents
                                    rows={rowsDetails}
                                    columns={columnsDetails}
                                    columnsName={columnsNameDetails}
                                />
                            </div>
                            ) : (
                                ''
                            )}
                        </Box>
                    </Fade>
                </Modal>
                </div>
            </Paper>
        </div>
    );
};
