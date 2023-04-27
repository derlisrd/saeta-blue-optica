import {Dialog,DialogContent,DialogActions, Button} from '@mui/material'
import './style.css'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

function PreImpreso() {
    const divRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => divRef.current,
      });
    return (<Dialog open={true} onClose={()=>{}} fullScreen>
        <DialogContent>
        
            <div id='id_print_preimpreso' className='print_table_preimpreso' ref={divRef}>
            <table className='table_inicial'  >
                    <tbody>
                        <tr>
                            <td width='70%'>
                                
                            </td>
                            <td align='center'> 
                                <p>001-001- 000628</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className='table_dos' >
                    <tbody>
                        <tr>
                            <td width='20%'></td>
                            <td width='60%'>
                                <p>24-03-2022</p>
                                <p>Ruiz Diaz Romero, Derlis Francisco</p>
                                <p>_</p>
                                <p>4937724-8</p>
                            </td>
                            <td> 
                                <b>CONTADO</b>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className='table_descripciones' border={0} >
                    <tbody>{
                        [0,1,2,3,4,5,7,8].map(e=>(
                            <tr key={e}>
                            <td width='7%'>0039</td>
                            <td width='5%'>2</td>
                            <td width='40%'>1.56 AR -5.00 A +4.00 CIL. -2.25 A -4.00</td>
                            <td width='12%'>47.500</td>
                            <td width='12%'>0</td>
                            <td width='12%'>0</td>
                            <td width='12%'>95.000</td>
                        </tr>
                        ))
                     }
                     <tr>
                        <td colSpan={4}>

                        </td>
                        <td>47.500</td>
                        <td>0</td>
                        <td>95.000</td>
                     </tr>
                     <tr>
                        <td colSpan={7}> NOVENTA Y CINCO MIL OCHOCIENTOS CATORCE </td>
                     </tr>
                    </tbody>
                </table>
                <table className='table_liquidacion'>
                    <tbody>
                        <tr>
                            <td width='32%'></td>
                            <td width='22%'>0</td>
                            <td width='22%'>0</td>
                            <td width='24%'>0</td>
                        </tr>
                    </tbody>
                </table>
                <table className='table_inicial'  >
                    <tbody>
                        <tr>
                            <td width='70%'>
                                
                            </td>
                            <td align='center'> 
                                <p>001-001- 000628</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className='table_dos' >
                    <tbody>
                        <tr>
                            <td width='20%'></td>
                            <td width='60%'>
                                <p>24-03-2022</p>
                                <p>Ruiz Diaz Romero, Derlis Francisco</p>
                                <p>_</p>
                                <p>4937724-8</p>
                            </td>
                            <td> 
                                <b>CONTADO</b>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className='table_descripciones' border={0} >
                    <tbody>{
                        [0,1,2,3,4,5,7,8].map(e=>(
                            <tr key={e}>
                            <td width='7%'>0039</td>
                            <td width='5%'>2</td>
                            <td width='40%'>1.56 AR -5.00 A +4.00 CIL. -2.25 A -4.00</td>
                            <td width='12%'>47.500</td>
                            <td width='12%'>0</td>
                            <td width='12%'>0</td>
                            <td width='12%'>95.000</td>
                        </tr>
                        ))
                     }
                     <tr>
                        <td colSpan={4}>

                        </td>
                        <td>47.500</td>
                        <td>0</td>
                        <td>95.000</td>
                     </tr>
                     <tr>
                        <td colSpan={7}> NOVENTA Y CINCO MIL OCHOCIENTOS CATORCE </td>
                     </tr>
                    </tbody>
                </table>
                <table className='table_liquidacion'>
                    <tbody>
                        <tr>
                            <td width='32%'></td>
                            <td width='22%'>0</td>
                            <td width='22%'>0</td>
                            <td width='24%'>0</td>
                        </tr>
                    </tbody>
                </table>
                <table className='table_inicial'  >
                    <tbody>
                        <tr>
                            <td width='70%'>
                                
                            </td>
                            <td align='center'> 
                                <p>001-001- 000628</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className='table_dos' >
                    <tbody>
                        <tr>
                            <td width='20%'></td>
                            <td width='60%'>
                                <p>24-03-2022</p>
                                <p>Ruiz Diaz Romero, Derlis Francisco</p>
                                <p>_</p>
                                <p>4937724-8</p>
                            </td>
                            <td> 
                                <b>CONTADO</b>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className='table_descripciones' border={0} >
                    <tbody>{
                        [0,1,2,3,4,5,7,8].map(e=>(
                            <tr key={e}>
                            <td width='7%'>0039</td>
                            <td width='5%'>2</td>
                            <td width='40%'>1.56 AR -5.00 A +4.00 CIL. -2.25 A -4.00</td>
                            <td width='12%'>47.500</td>
                            <td width='12%'>0</td>
                            <td width='12%'>0</td>
                            <td width='12%'>95.000</td>
                        </tr>
                        ))
                     }
                     <tr>
                        <td colSpan={4}>

                        </td>
                        <td>47.500</td>
                        <td>0</td>
                        <td>95.000</td>
                     </tr>
                     <tr>
                        <td colSpan={7}> NOVENTA Y CINCO MIL OCHOCIENTOS CATORCE </td>
                     </tr>
                    </tbody>
                </table>
                <table className='table_liquidacion'>
                    <tbody>
                        <tr>
                            <td width='32%'></td>
                            <td width='22%'>0</td>
                            <td width='22%'>0</td>
                            <td width='24%'>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' size='large' onClick={handlePrint} >print</Button>
        </DialogActions>
    </Dialog>);
}

export default PreImpreso;