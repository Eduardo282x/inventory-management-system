import * as yup from "yup";

const userData = JSON.parse(localStorage.getItem('userData'))

export const profileData = [
    {
        label: 'Nombre',
        name: 'Name',
        value: userData.Name,
        disabled: true,
    },
    {
        label: 'Apellido',
        name: 'Lastname',
        value: userData.Lastname,
        disabled: true,
    },
    {
        label: 'Contraseña',
        name: 'Password',
        value: '',
        disabled: false,
    },
    {
        label: 'Rol',
        name: 'Rol',
        value: userData.Rol,
        disabled: true,
    },
    {
        label: 'Correo',
        name: 'Email',
        value: userData.Email,
        disabled: true,
    },
    {
        label: 'Cedula',
        name: 'Identify',
        value: userData.Identify,
        disabled: true,
    },
    {
        label: 'Telefono',
        name: 'Phone',
        value: userData.Phone,
        disabled: true,
    },
]

export const profileSend = {    
    Id: userData.Id,
    Password: '',
}

export const validationSchema = yup.object({
    Password : yup.string().min(8, 'Debe contener minimo 8 caracteres'),
});

export const position = {
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    };