export const ListaMenu = [
    {
        id:1,
        url:'/home',
        title:'Inicio',
        icon:'home',
        sub:false
    },
    {
        id:78,
        url:'#',
        title:'Comercial',
        icon:'sell',
        sub:true,
        open:false,
        submenu:[
            {
                id:9,
                title:'Nuevo pedido',
                url:'/pedidos?open=nuevo',
                icon:'receipt'
            },
            {
                id:1,
                title:'Pedidos',
                url:'/pedidos/lista',
                icon:'receipt_long'
            },
            {
                id:41,
                title:'Recibos pedido',
                url:'/pedidos/recibos',
                icon:'view_in_ar'
            },
            {
                id:17,
                title:'Nueva factura',
                url:'/facturas/add',
                icon:'credit_card'
            },
            {
                id:16,
                title:'Facturas',
                url:'/facturas/lista',
                icon:'receipt'
            },
            
            
        ]
    },
    {
        id:71,
        url:'#',
        title:'Stock',
        icon:'inventory_2',
        sub:true,
        open:false,
        submenu:[
            {
                id:41,
                title:'Categorias',
                url:'/categorias',
                icon:'category'
            },
            {
                id:27,
                title:'Productos',
                url:'/productos',
                icon:'shopping_bag'
            },
            {
                id:31,
                title:'Inventario',
                url:'/inventario',
                icon:'inventory'
            },
            {
                id:47,
                title:'Depositos',
                url:'/depositos',
                icon:'store'
            }
        ]
    }, 
    {
        id:87,
        url:'#',
        title:'Reportes',
        icon:'summarize',
        sub:true,
        open:false,
        submenu:[
            {
                id:52,
                title:'Ventas',
                url:'/reportes/ventas',
                icon:'bug_report'
            }
        ]
    }, 
    {
        id:7818,
        url:'#',
        title:'RRHH',
        icon:'people_alt',
        sub:true,
        open:false,
        submenu:[
            {
                id:41,
                title:'Empleados',
                url:'/empleados',
                icon:'perm_contact_calendar'
            }
        ]
    },
    {
        id:7,
        url:'#',
        title:'Financiero',
        icon:'account_balance_wallet',
        sub:true,
        open:false,
        submenu:[
            {
                id:42,
                title:'A cobrar',
                url:'/cuentas/cobrar',
                icon:'work_outline'
            },
            {
                id:43,
                title:'A pagar',
                url:'/cuentas/pagar',
                icon:'tips_and_updates'
            },
            {
                id:57,
                title:'Recibos',
                url:'/financiero/recibos',
                icon:'receipt'
            },
            {
                id:58,
                title:'Aciertos',
                url:'/financiero/aciertos',
                icon:'assignment'
            },

        ]
    }, 
    {
        id:788,
        url:'#',
        title:'Admin...',
        icon:'settings',
        sub:true,
        open:false,
        submenu:[
            {
                id:31,
                url:'/empresa',
                title:'Empresa',
                icon:'store_mall_directory',
                sub:false
            },
            {
                id:23,
                url:'/clientes',
                title:'Clientes',
                icon:'groups',
                sub:false
            },
            {
                id:3,
                url:'/descuentos',
                title:'Descuentos',
                icon:'price_check',
                sub:false
            },
            {
                id:41,
                title:'Proveedores',
                url:'/proveedores',
                icon:'local_shipping'
            },
            {
                id:15,
                url:'/usuarios',
                title:'Usuarios',
                icon:'assignment_ind',
                sub:false
            },
        ]
    },
    //

    
    
    
]