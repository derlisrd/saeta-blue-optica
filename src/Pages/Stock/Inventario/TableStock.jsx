import { Button, LinearProgress, TextField } from '@mui/material';
import style from './style.module.css'
import { APICALLER } from '../../../Services/api';
import { Fragment, useEffect, useState } from 'react';
import { useInventario } from './InventarioProvider';


function TableStock() {

  const {stock,token_user,rangos} = useInventario()
  
  const [formStock,setFormStock] = useState([])
  const widthTh = 100/(rangos.cilindrico.length + 1);
  
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
        </tr>
        {
          formStock.map((e,i)=>(
            <tr key={i}>
              <td> {e.esferico}</td>
              {
                e.cilindrico.map((c,index)=>(
                  <Fragment key={index}>
                    
                    <td> {c.stock} </td>
                  </Fragment>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
    </>
  );
}

export default TableStock;
