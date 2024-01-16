import moment from 'moment';
import * as yup from 'yup';

export const columns = ['N° Venta', 'Vendedor', 'Total', 'Fecha','Detalles'];
export const columnsName = [
    {
        column: 'IdSales',
        type: 'string',
    },
    {
        column: 'Name',
        type: 'string',
    },
    {
        column: 'Total',
        type: 'price',
    },
    {
        column: 'DateSale',
        type: 'date',
    },
    {
        column: 'Detalles',
        type: 'icon',
        icon: 'info',
        action: 'get'
    },
];
export const columnsDetails = ['Codigo', 'Descripción', 'Cantidad', 'Precio','Total'];
export const columnsNameDetails = [
    {
        column: 'CodInventory',
        type: 'string',
    },
    {
        column: 'Description',
        type: 'string',
    },
    {
        column: 'Amount',
        type: 'string',
    },
    {
        column: 'Price',
        type: 'price',
    },
    {
        column: 'Total',
        type: 'price',
    },
];

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    height: 400,
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};



export const bodyReport = {
    start: '',
    end: ''
};

export const validationSchema = yup.object({
    start : yup.date()
                .nullable()
                .required('El campo es requerido')
                .default(() => moment()),
    end : yup.date()
                .nullable()
                .required('El campo es requerido')
                .default(() => moment())
});