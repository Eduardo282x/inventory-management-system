import * as yup from "yup";

const userData = JSON.parse(localStorage.getItem('userData'))

export const profileData = [
    {
        label: 'Nombre',
        name: 'Name',
        value: userData ? userData.Name : '',
        disabled: true,
    },
    {
        label: 'Apellido',
        name: 'Lastname',
        value: userData ? userData.Lastname : '',
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
        value: userData ? userData.Rol : '',
        disabled: true,
    },
    {
        label: 'Correo',
        name: 'Email',
        value: userData ? userData.Email : '',
        disabled: true,
    },
    {
        label: 'Cedula',
        name: 'Identify',
        value: userData ? userData.Identify : '',
        disabled: true,
    },
    {
        label: 'Telefono',
        name: 'Phone',
        value: userData ? userData.Phone : '',
        disabled: true,
    },
]

export const profileSend = {    
    Id: userData ? userData.Id : '',
    Password: '',
}

export const validationSchema = yup.object({
    Password : yup.string().min(8, 'Debe contener minimo 8 caracteres').required(),
});

export const position = {
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    };