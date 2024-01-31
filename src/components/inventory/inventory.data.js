import * as yup from 'yup';

export const columns = [
    "Codigo",
    "Descripción",
    "Eje",
    "Aloj",
    "Altura",
    "Cantidad",
    "Precio",
    "Editar",
];
export const columnsName = [
    {
        column: "Code",
        type: "string",
    },
    {
        column: "Description",
        type: "string",
    },
    {
        column: "Axis",
        type: "mm",
    },
    {
        column: "Aloj",
        type: "mm",
    },
    {
        column: "Height",
        type: "mm",
    },
    {
        column: "Amount",
        type: "string",
    },
    {
        column: "Price",
        type: "price",
    },
    {
        column: "Editar",
        type: "icon",
        icon: 'Edit',
        action: 'get'
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

export const bodySend = {    
    Code: '',
    Description: '',
    Axis: '',
    Aloj: '',
    Height: '',
    Amount: '',
    Price: '',
}

export const validationSchemaAdmin = yup.object({
    Code: yup.string().required('Este campo es requerido'),
    Description: yup.string().required('Este campo es requerido'),
    Axis: yup.string().required('Este campo es requerido'),
    Aloj: yup.string().required('Este campo es requerido'),
    Height: yup.string().required('Este campo es requerido'),
    Amount: yup.string().required('Este campo es requerido'),
    Price: yup.string().required('Este campo es requerido'),
});

export const dataFormAdmin =[
    {
        label: 'Codigo',
        input: true,
        type: 'text',
        name: 'Code',
        value: '',
    },
    {
        label: 'Descripción',
        input: true,
        type: 'text',
        name: 'Description',
        value: '',
    },
    {
        label: 'Eje',
        input: true,
        type: 'number',
        name: 'Axis',
        value: '',
    },
    {
        label: 'Aloj',
        input: true,
        type: 'number',
        name: 'Aloj',
        value: '',
    },
    {
        label: 'Altura',
        input: true,
        type: 'number',
        name: 'Height',
        value: '',
    },
    {
        label: 'Cantidad',
        input: true,
        type: 'number',
        name: 'Amount',
        value: '',
    },
    {
        label: 'Precio',
        input: true,
        type: 'number',
        name: 'Price',
        value: '',
    },
];

export const dataFormSeller =[
    {
        label: 'Codigo',
        input: true,
        type: 'text',
        name: 'Code',
        readOnly: true,
        value: '',
    },
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
    {
        label: 'Precio',
        input: true,
        type: 'number',
        name: 'Price',
        readOnly: true,
        value: '',
    },
];