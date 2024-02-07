import { useEffect, useState } from 'react';
import { Button, DownloadIcon, style, Backdrop, Modal, Fade, Box, PeopleIcon } from '../materialUI';
import { TablaComponents } from '../Shared/Table/TablaComponents';
import PropTypes from "prop-types";
import { SelectClient } from './selectClient/SelectClient';
import { postDataApi } from '../../backend/BasicAxios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { PdfGenerate } from '../Shared/PdfGenerate/PdfGenerate';


export const ReportsDetails = ({ IdSales, IdUser, rowsDetails, columnsDetails, columnsNameDetails }) => {
    const [total, setTotal] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [existClient, setClient] = useState(false);
    const [dataPdf, setDataPdf] = useState();
    const handleClose = () => setOpenModal(false);
    const handleOpen = () => setOpenModal(true);

    const getClient = async (client) => {
        handleClose();
        const dataGetFacture = { IdClient: client.clientId, IdSales: IdSales, IdUser: IdUser };

        try {
            const data = await postDataApi('sales/facture', dataGetFacture);
            if (data) {
                setClient(true);
                setDataPdf(data);
            }
        } catch (err) {
            console.error(err);
        }

        // postDataApi('sales/facture',dataGetFacture).then((data) => {
        //     console.log(data);
        //     pdf(<PdfGenerate client={data.client} details={data.details} />)
        //     .promise
        //     .then((pdfBlob) => {
        //         saveAs(pdfBlob, 'factura.pdf');
        //     });
        // }).catch(err => console.log(err))
    }

    useEffect(() => {
        let totalAccunt = 0;
        rowsDetails.forEach(row => {
            totalAccunt += row.Total;
        });

        setTotal(totalAccunt);
    }, [rowsDetails]);


    return (
        <div className="flex flex-col items-center justify-between w-full h-full">
            <div className="flex items-center justify-between w-[95%] px-15">
                <p><span className='font-bold'>Numero de pedido:</span> {String(IdSales).padStart(7, '0')}</p>
                <Button variant="contained" onClick={handleOpen}>
                    <PeopleIcon />
                    Seleccionar cliente
                </Button>

                {existClient &&
                    <PDFDownloadLink document={<PdfGenerate client={dataPdf?.client} details={dataPdf?.details} />} fileName='factura.pdf'>
                        <Button variant="contained">
                            <DownloadIcon />
                            Descargar
                        </Button>
                    </PDFDownloadLink>
                    }
            </div>
            <TablaComponents
                rows={rowsDetails}
                columns={columnsDetails}
                columnsName={columnsNameDetails}
            />
            <div className="flex items-center justify-end w-[96%] ">
                <p><span className='font-bold'>Total: </span> {total}$</p>
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
                            <SelectClient sendFather={getClient} />
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
};

ReportsDetails.propTypes = {
    IdSales: PropTypes.number,
    IdUser: PropTypes.number,
    rowsDetails: PropTypes.array,
    columnsDetails: PropTypes.array,
    columnsNameDetails: PropTypes.array,
};