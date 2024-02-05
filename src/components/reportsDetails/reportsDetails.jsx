import { useEffect, useState } from 'react';
import { Button, DownloadIcon, style, Backdrop, Modal,Fade,Box } from '../materialUI';
import { TablaComponents } from '../Shared/Table/TablaComponents';
import PropTypes from "prop-types";
import { SelectClient } from './selectClient/SelectClient';

export const ReportsDetails = ({ IdSales, rowsDetails, columnsDetails, columnsNameDetails }) => {
    const [total, setTotal] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);
    const handleOpen = () => setOpenModal(true);

    const getClient = (client) => {
        handleClose();
        console.log(client);
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
            <div className="flex items-center justify-between w-full px-15">
                <p><span className='font-bold'>Numero de pedido:</span> {IdSales}</p>
                <Button variant="contained" onClick={handleOpen}>
                    <DownloadIcon />
                    Descargar
                </Button>
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
                            <SelectClient sendFather={getClient}/>
                        </Box>
                    </Fade>
                </Modal>
                </div>
        </div>
    );
};

ReportsDetails.propTypes = {
    IdSales: PropTypes.number,
    rowsDetails: PropTypes.array,
    columnsDetails: PropTypes.array,
    columnsNameDetails: PropTypes.array,
};