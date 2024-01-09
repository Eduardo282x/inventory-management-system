import * as yup from 'yup';

export const columns = ['Nombre', 'Apellido', 'Correo', 'Cédula', 'Teléfono', 'Editar']
export const columnsName = [
    {
        column: 'Name',
        type: 'string',
    },
    {
        column: 'Lastname',
        type: 'string',
    },
    {
        column: 'Email',
        type: 'string',
    },
    {
        column: 'Identify',
        type: 'string',
    },
    {
        column: 'Phone',
        type: 'string',
    }]

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
    Name: '',
    Lastname: '',
    Email: '',
    Identify: '',
    Phone: '',
}

export const validationSchema = yup.object({
    Name : yup.string().required('El nombre es requerido'),
    Lastname : yup.string().required('El apellido es requerido'),
    Email : yup.string().email('Ingresa un correo valido').required('El correo es requerido'),
    Identify : yup.string().min(8, 'La cedula debe contener minimo 8 caracteres').required('La cedula es requerida'),
    Phone : yup.string().min(11, 'El telefono debe contener minimo 11 caracteres').required('El telefono es requerido'),
});

export const dataForm =[
    {
        label: 'Nombre',
        input: true,
        type: 'text',
        name: 'Name',
        value: '',
    },
    {
        label: 'Apellido',
        input: true,
        type: 'text',
        name: 'Lastname',
        value: '',
    },
    {
        label: 'Correo',
        input: true,
        type: 'email',
        name: 'Email',
        value: '',
    },
    {
        label: 'Cedula',
        input: true,
        type: 'number',
        name: 'Identify',
        value: '',
    },
    {
        label: 'Telefono',
        input: true,
        type: 'phone',
        name: 'Phone',
        value: '',
    },
]