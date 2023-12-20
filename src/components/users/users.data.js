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