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
        title:'Carrito',
        redirect:'/cart',
        icon: 'cart',
        permises: ['Vendedor']
    },
    {
        title:'Reportes',
        redirect:'/reports',
        icon: 'reports',
        permises: ['Administrador']
    },
    {
        title:'Cerrar Sesión',
        redirect:'/',
        icon: 'logout',
        permises: ['Administrador','Vendedor']
    },
]