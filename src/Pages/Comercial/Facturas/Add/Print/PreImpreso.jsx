import {Dialog,DialogContent,DialogActions, Button} from '@mui/material'
import './style.css'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

function PreImpreso() {
    const divRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => divRef.current,
      });
    return (
      <Dialog open={true} onClose={() => {}} fullScreen>
        <DialogContent>
          <div id="id_print_preimpreso" className="print_main" ref={divRef}>
            <table className="tablas nro_factura">
              <tbody>
                <tr>
                  <td width="70%"></td>
                  <td width="30%" valign="bottom" align="center">
                    001-001-0006784
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="tablas info_cliente">
              <tbody>
                <tr>
                  <td width="15%"></td>
                  <td width="65%">
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
            <table className='tablas descripciones' >
                    <tbody>{
                        [1].map(e=>(
                            <tr key={e}>
                            <td width='7%'>0039</td>
                            <td width='5%'>1</td>
                            <td width='40%'>1.56 AR -5.00 A +4.00 CIL. -2.25 A -4.00</td>
                            <td width='12%'>47.500</td>
                            <td width='12%'>0</td>
                            <td width='12%'>0</td>
                            <td width='12%'>95.000</td>
                        </tr>
                        ))
                     }
                    </tbody>
                </table>
                <table className='tablas subtotales' >
                    <tbody>
                        <tr>
                            <td width='64%'></td>
                            <td width='12%'>0</td>
                            <td width='12%'>0</td>
                            <td width='12%'>95.000</td>
                        </tr>
                        <tr>
                            <td colSpan={4}> NOVENTA Y CINCO MIL</td>
                        </tr>
                    </tbody>
                </table>
                <table className='tablas liquidacion_iva' >
                    <tbody>
                        <tr>
                            <td width='30%'></td>
                            <td width='20%'>0</td>
                            <td width='20%'>0</td>
                            <td width='30%'>95.000</td>
                        </tr>
                    </tbody>
                </table>
                <table className="tablas nro_factura">
              <tbody>
                <tr>
                  <td width="70%"></td>
                  <td width="30%" valign="bottom" align="center">
                    001-001-0006784
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="tablas info_cliente">
              <tbody>
                <tr>
                  <td width="15%"></td>
                  <td width="65%">
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
            <table className='tablas descripciones' >
                    <tbody>{
                        [1].map(e=>(
                            <tr key={e}>
                            <td width='7%'>0039</td>
                            <td width='5%'>1</td>
                            <td width='40%'>1.56 AR -5.00 A +4.00 CIL. -2.25 A -4.00</td>
                            <td width='12%'>47.500</td>
                            <td width='12%'>0</td>
                            <td width='12%'>0</td>
                            <td width='12%'>95.000</td>
                        </tr>
                        ))
                     }
                    </tbody>
                </table>
                <table className='tablas subtotales' >
                    <tbody>
                        <tr>
                            <td width='64%'></td>
                            <td width='12%'>0</td>
                            <td width='12%'>0</td>
                            <td width='12%'>95.000</td>
                        </tr>
                        <tr>
                            <td colSpan={4}> NOVENTA Y CINCO MIL</td>
                        </tr>
                    </tbody>
                </table>
                <table className='tablas liquidacion_iva' >
                    <tbody>
                        <tr>
                            <td width='30%'></td>
                            <td width='20%'>0</td>
                            <td width='20%'>0</td>
                            <td width='30%'>95.000</td>
                        </tr>
                    </tbody>
                </table><table className="tablas nro_factura">
              <tbody>
                <tr>
                  <td width="70%"></td>
                  <td width="30%" valign="bottom" align="center">
                    001-001-0006784
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="tablas info_cliente">
              <tbody>
                <tr>
                  <td width="15%"></td>
                  <td width="65%">
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
            <table className='tablas descripciones' >
                    <tbody>{
                        [1].map(e=>(
                            <tr key={e}>
                            <td width='7%'>0039</td>
                            <td width='5%'>1</td>
                            <td width='40%'>1.56 AR -5.00 A +4.00 CIL. -2.25 A -4.00</td>
                            <td width='12%'>47.500</td>
                            <td width='12%'>0</td>
                            <td width='12%'>0</td>
                            <td width='12%'>95.000</td>
                        </tr>
                        ))
                     }
                    </tbody>
                </table>
                <table className='tablas subtotales' >
                    <tbody>
                        <tr>
                            <td width='64%'></td>
                            <td width='12%'>0</td>
                            <td width='12%'>0</td>
                            <td width='12%'>95.000</td>
                        </tr>
                        <tr>
                            <td colSpan={4}> NOVENTA Y CINCO MIL</td>
                        </tr>
                    </tbody>
                </table>
                <table className='tablas liquidacion_iva' >
                    <tbody>
                        <tr>
                            <td width='30%'></td>
                            <td width='20%'>0</td>
                            <td width='20%'>0</td>
                            <td width='30%'>95.000</td>
                        </tr>
                    </tbody>
                </table>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="large" onClick={handlePrint}>
            print
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default PreImpreso;