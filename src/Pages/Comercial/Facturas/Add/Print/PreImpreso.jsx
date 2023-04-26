import {Dialog,DialogContent,DialogActions} from '@mui/material'
import styles from './stylePreImpreso.module.css'
function PreImpreso() {
    
    const imprimir = ()=>{
        printJS({ type: "html", printable: "print",
        style:`#print{
            margin:0 auto;
            width: 220mm;
        }`
    });
    }
    return (<Dialog open={true} onClose={()=>{}} fullScreen>
        <DialogContent>
            <div id='print' className={styles.print}>
                <table width='100%'>
                    <tbody>
                        <tr>
                            <td>hola</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </DialogContent>
        <DialogActions>
            <button onClick={imprimir}>print</button>
        </DialogActions>
    </Dialog>);
}

export default PreImpreso;