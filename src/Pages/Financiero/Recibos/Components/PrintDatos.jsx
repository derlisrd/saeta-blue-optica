import { funciones } from '../../../../App/helpers/funciones';
import style from '../print.module.css'

function PrintDatos({datos}) {
    return (<div className={style.print_container}>
        <div className={style.cabeza}></div>
        <div className={style.cuerpo}>
            <div className={style.facturas}>
            </div>
            <div className={style.datos}>
                <div className={style.fecha}>
                    <div className={style.dia}>
                        <p>10</p>
                    </div>
                    <div className={style.mes}>
                        <p>octubre</p>
                    </div>
                    <div className={style.year}>
                        <p>23</p>
                    </div>
                    <div className={style.monto}>
                        <p>{funciones.numberFormat(datos.total_recibo)}</p>
                    </div>
                </div>
                <div className={style.cliente}>
                    <p>{datos.nombre_cliente}</p>
                </div>
                <div className={style.ruc}>
                    <p>{datos.ruc_cliente}</p>
                </div>

                <div className={style.pagos}>
                    <div className={style.efectivo}>
                        <p>{funciones.numberFormat(datos.efectivo_recibo)}</p>
                    </div>
                    <div className={style.transferencia}>
                    <p>{funciones.numberFormat(datos.transferencia_recibo)}</p>
                    </div>
                    <div className={style.cheque}>
                        <div className={style.cheque_nro}>
                            <p>{datos.cheque_nro_recibo}</p>
                        </div>
                        <div className={style.banco}>
                            <p>{datos.banco_recibo}</p>
                        </div>
                        <div className={style.cheque_total}>
                            <p>{funciones.numberFormat(datos.cheque_recibo)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default PrintDatos;