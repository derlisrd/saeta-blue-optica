export const Adiciones = {
    flechas: (e,param)=>{
        const {value,name} = e.target
        let antiguo_valor = parseFloat(value) 
        let nuevo_param = {...param}
        let nuevo_valor = 0;

        if(e.key==='ArrowDown'){
            nuevo_valor = antiguo_valor - 0.25
        }
        if(e.key==='ArrowUp'){
            nuevo_valor = antiguo_valor + 0.25
        }

        if(name ==='adicion_derecho'){
            nuevo_param.cerca_derecho_esferico = nuevo_valor + ( parseFloat(nuevo_param.lejos_derecho_esferico) ) 
        }
        if(name === 'cerca_derecho_esferico'){
            nuevo_param.adicion_derecho = nuevo_valor - ( parseFloat(nuevo_param.lejos_derecho_esferico) ) 
        }
        if(name === 'lejos_derecho_esferico'){
            nuevo_param.adicion_derecho = nuevo_valor - ( parseFloat(nuevo_param.lejos_derecho_esferico) ) 
        }


        nuevo_param[name] = nuevo_valor


        

        return nuevo_param;

    }
}
