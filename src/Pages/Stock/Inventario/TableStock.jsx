import { Button} from '@mui/material';
import style from './style.module.css'

import { Fragment, useEffect, useState } from 'react';
import { useInventario } from './InventarioProvider';
import CorregirInput from './CorregirInput';


function TableStock() {

  const {stock,rangos,setFormSelect,dialogs,setDialogs,setStock} = useInventario()
  
  const [formStock,setFormStock] = useState([])
  const widthTh = 100/(rangos.cilindrico.length + 2);
  
  /* const corregir = async(elem,index)=>{
    let new_form = [...formStock]
    let data = {stock_producto_deposito: new_form[index].stock_producto_deposito}
    let res = await APICALLER.update({table:'productos_depositos',data,token:token_user,id:elem.id_productos_deposito})
    if(!res.response){ console.log(res);}
  } */


  const openCorregir = (esf,cil,stockActual,producto_id,deposito_id,id_productos_deposito)=>{
   
    let copy_stock = [ ...stock]
    let foundEsfe = copy_stock.find(e=> e.esferico === esf)
    let indexEsfe = copy_stock.findIndex(e=> e.esferico ===esf)
    //let foundCili = foundEsfe.cilindrico.findIndex(e=> e.cilindrico === formEdit.graduacion_cilindrico)
    let indexCili = foundEsfe.cilindrico.findIndex(e=> e.cilindrico === cil)
    copy_stock[indexEsfe].cilindrico[indexCili].edit = true;
    setStock(copy_stock)

    setFormSelect({
      stock_producto_deposito: stockActual,
      producto_id:producto_id,
      deposito_id:deposito_id,
      graduacion_esferico:esf,
      graduacion_cilindrico:cil,
      id_productos_deposito: id_productos_deposito,
      indexEsferico: indexEsfe,
      indexCilindrico: indexCili
    })
    //setDialogs({...dialogs,corregir:true})
    //console.log(esf,cil,stock,deposito_id);
  }

  /* const change = (event,index)=>{
    const {value} = event.target
    let new_form = [...formStock]
    new_form[index].stock_producto_deposito = value
    setFormStock(new_form)
  } */

  useEffect(() => {
    setFormStock(stock)
  },[stock]);

  //console.log(formStock);

  return (<>
    <h3 style={{ textAlign:'center' }}>CILINDRICO</h3>
    <table width='100%' className={style.table_stock} border={1}>
      <tbody>
        <tr>
          <th>Esferico</th>
          {
            rangos.cilindrico.map((e,i)=>(
              <th width={ `${widthTh}%`} key={i}>{e}</th>
            ))
          }
          <th>TOTAL</th>
        </tr>
        {
          formStock.map((e,i)=>(
            <tr key={i}>
              <td> {e.esferico}</td>
              {
                e.cilindrico.map((c,index)=>(
                  <Fragment key={index}>
                    <td>
                      {c.edit ? <CorregirInput /> : <Button onClick={()=>{ openCorregir(e.esferico,c.cilindrico,c.stock,c.producto_id,c.deposito_id,c.id_productos_deposito)}}>{c.stock}</Button>}
                    </td>
                  </Fragment>
                ))
              }
              <td> <b>{e.total}</b> </td>
            </tr>
          ))
        }
      </tbody>
    </table>
    </>
  );
}

export default TableStock;
