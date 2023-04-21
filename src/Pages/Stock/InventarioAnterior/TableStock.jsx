import { Button, LinearProgress, TextField } from '@mui/material';
import style from './style.module.css'
import { APICALLER } from '../../../Services/api';
import { useEffect, useState } from 'react';
import { useInventario } from './InventarioProvider';


function TableStock() {

  const {stock,token_user} = useInventario()
  
  const [formStock,setFormStock] = useState([])
  const corregir = async(elem,index)=>{
    
    let new_form = [...formStock]
    let data = {stock_producto_deposito: new_form[index].stock_producto_deposito}
    let res = await APICALLER.update({table:'productos_depositos',data,token:token_user,id:elem.id_productos_deposito})
    if(!res.response){ console.log(res);}


  }




  const change = (event,index)=>{
    const {value} = event.target
    let new_form = [...formStock]
    new_form[index].stock_producto_deposito = value
    setFormStock(new_form)
  }

  useEffect(() => {
    setFormStock(stock)
  },[stock]);

  return (
    <table width='100%' className={style.table_stock} border={1}>
      <tbody>
        <tr>
          <th>DEPOSITO</th>
          <th>ESFERICO</th>
          <th>CILINDRICO</th>
          <th>EJE</th>
          <th>STOCK DISPONIBLE</th>
          <th>ACCIONES</th>
        </tr>
        {formStock.map((e, i) => (
          <tr key={i}>
            <td>{e.nombre_deposito}</td>
            <td>{e.graduacion_esferico}</td>
            <td>{e.graduacion_cilindrico}</td>
            <td>{e.eje}</td>
            <td><TextField type='number' value={e.stock_producto_deposito} onChange={(event)=>{ change(event,i)}} size='small' /></td>
            <td><Button onClick={()=>{corregir(e,i)}} >Corregir</Button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableStock;
