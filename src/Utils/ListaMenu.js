export const ListaMenu = [
    {
        id:1,
        url:'/home',
        title:'Inicio',
        icon:'fluent-mdl2:home',
        sub:false
    },
    {
        id:3,
        url:'/clientes',
        title:'Clientes',
        icon:'fluent:people-16-regular',
        sub:false
    },


    {
        id:6,
        url:'/memo',
        title:'Memos',
        icon:'ic:twotone-sticky-note-2',
        sub:false
    },//mdi:file-report-outline
    {
        id:87,
        url:'#',
        title:'Reportes',
        icon:'octicon:graph-24',
        sub:true,
        open:false,
        submenu:[
            {
                id:41,
                title:'Pedidos',
                url:'/ventas',
                icon:'ic:baseline-receipt-long'
            },
            {
                id:42,
                title:'Facturar',
                url:'/cuentas/cobrar',
                icon:'ion:cash-outline'
            },
            {
                id:43,
                title:'A pagar',
                url:'/cuentas/pagar',
                icon:'ic:baseline-money'
            }
        ]
    }, 
    {
        id:7818,
        url:'#',
        title:'RRHH',
        icon:'mdi:human-capacity-increase',
        sub:true,
        open:false,
        submenu:[
            {
                id:41,
                title:'Pedidos',
                url:'/ventas',
                icon:'ic:baseline-receipt-long'
            },
            {
                id:42,
                title:'Facturar',
                url:'/cuentas/cobrar',
                icon:'ion:cash-outline'
            },
            {
                id:43,
                title:'A pagar',
                url:'/cuentas/pagar',
                icon:'ic:baseline-money'
            }
        ]
    }, 
    {
        id:788,
        url:'#',
        title:'Administración',
        icon:'pajamas:admin',
        sub:true,
        open:false,
        submenu:[
            {
                id:41,
                title:'Pedidos',
                url:'/ventas',
                icon:'ic:baseline-receipt-long'
            },
            {
                id:42,
                title:'Facturar',
                url:'/cuentas/cobrar',
                icon:'ion:cash-outline'
            },
            {
                id:43,
                title:'A pagar',
                url:'/cuentas/pagar',
                icon:'ic:baseline-money'
            },
            {
                id:5,
                url:'/usuarios',
                title:'Usuarios',
                icon:'carbon:credentials',
                sub:false
            },
        ]
    },
    {
        id:78,
        url:'#',
        title:'Comercial',
        icon:'carbon:store',
        sub:true,
        open:false,
        submenu:[
            {
                id:41,
                title:'Pedidos',
                url:'/pedidos',
                icon:'ic:baseline-receipt-long'
            },
            {
                id:42,
                title:'Facturar',
                url:'/cuentas/cobrar',
                icon:'ion:cash-outline'
            },
            {
                id:43,
                title:'A pagar',
                url:'/cuentas/pagar',
                icon:'ic:baseline-money'
            }
        ]
    }, //
    {
        id:71,
        url:'#',
        title:'Stock',
        icon:'fluent-mdl2:product-release',
        sub:true,
        open:false,
        submenu:[
            {
                id:41,
                title:'Productos',
                url:'/productos',
                icon:'ic:twotone-sell'
            },
            {
                id:42,
                title:'A cobrar',
                url:'/cuentas/cobrar',
                icon:'tabler:pig-money'
            },
            {
                id:43,
                title:'A pagar',
                url:'/cuentas/pagar',
                icon:'ic:baseline-money'
            }
        ]
    },
    {
        id:7,
        url:'#',
        title:'Financiero',
        icon:'fluent-mdl2:money',
        sub:true,
        open:false,
        submenu:[
            {
                id:41,
                title:'Ventas',
                url:'/ventas',
                icon:'ic:twotone-sell'
            },
            {
                id:42,
                title:'A cobrar',
                url:'/cuentas/cobrar',
                icon:'tabler:pig-money'
            },
            {
                id:43,
                title:'A pagar',
                url:'/cuentas/pagar',
                icon:'ic:baseline-money'
            }
        ]
    },
    
    
]