import * as yup from 'yup';

export const columns = ['Descripción', 'Cantidad', 'Precio Unitario', 'Total','Editar','Eliminar']
export const columnsName = [
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
    {
        column: 'Editar',
        type: 'icon',
        icon: 'Edit',
        action: 'get'
    },
    {
        column: 'Eliminar',
        type: 'icon',
        icon: 'Delete',
        action: 'delete'
    },
];

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};

export const validationSchema = yup.object({
    Amount : yup.string().required('El campo es requerido'),
});

export const dataFormSeller =[
    // {
    //     label: 'Codigo',
    //     input: true,
    //     type: 'text',
    //     name: 'Code',
    //     readOnly: true,
    //     value: '',
    // },
    {
        label: 'Descripción',
        input: true,
        type: 'text',
        name: 'Description',
        readOnly: true,
        value: '',
    },
    {
        label: 'Cantidad',
        input: true,
        type: 'number',
        name: 'Amount',
        value: '',
    },
    // {
    //     label: 'Precio',
    //     input: true,
    //     type: 'number',
    //     name: 'Price',
    //     readOnly: true,
    //     value: '',
    // },
];