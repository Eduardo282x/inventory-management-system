
function createData(name, lastname, email, id, phone) {
    return { name, lastname, email, id, phone };
}

export const rows = [
    createData('admin', 'admin', 'email', '28391325', '+58 4165610813'),
    createData('Jorge', 'García', 'jorge.garcia@example.com', '28391325', '+58 4165610813'),
    createData('María', 'Hernández', 'maria.hernandez@example.com', '19876543', '+58 4241234567'),
    createData('Luis', 'Martínez', 'luis.martinez@example.com', '12345678', '+58 4149876543'),
    createData('Ana', 'González', 'emana.gonzalez@example.comail', '87654321', '+58 4161234567'),
    createData('Carlos', 'Pérez', 'carlos.perez@example.com', '87654321', '+58 4249876543'),
];

export const columns = ['Nombre', 'Apellido', 'Correo', 'Cédula', 'Teléfono', 'Editar']
export const columnsName = [
    {
        column: 'name',
        type: 'string',
    },
    {
        column: 'lastname',
        type: 'string',
    },
    {
        column: 'email',
        type: 'string',
    },
    {
        column: 'id',
        type: 'string',
    },
    {
        column: 'phone',
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
    LastName: '',
    Email: '',
    Id: '',
    Phone: '',
}

export const dataForm =[
    {
        label: 'Nombre',
        input: true,
        type: 'text',
        name: 'Name'
    },
    {
        label: 'Apellido',
        input: true,
        type: 'text',
        name: 'LastName'
    },
    {
        label: 'Correo',
        input: true,
        type: 'email',
        name: 'Email'
    },
    {
        label: 'Cedula',
        input: true,
        type: 'number',
        name: 'Id'
    },
    {
        label: 'Telefono',
        input: true,
        type: 'phone',
        name: 'Phone'
    },
]