export const menuOption = [
    {
        title:'Perfil',
        redirect:'/profile',
        icon: 'profile',
        permises: ['Administrador','Vendedor']
    },
    {
        title:'Usuarios',
        redirect:'/users',
        icon: 'users',
        permises: ['Administrador']
    },
    {
        title:'Inventario',
        redirect:'/inventory',
        icon: 'inventory',
        permises: ['Administrador','Vendedor']
    },
    {
        title:'Reportes',
        redirect:'/reports',
        icon: 'reports',
        permises: ['Administrador','Vendedor']
    },
    {
        title:'Cerrar Sesión',
        redirect:'/',
        icon: 'logout',
        permises: ['Administrador','Vendedor']
    },
]