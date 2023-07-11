import { TableContainer,Table, TableHead, TableRow, TableCell, TableBody, Box,Typography,Icon,Alert, Button } from '@mui/material'
import { useTablaStyles } from './TablaStyles';
import TablaLoading from './TablaLoading'
import {funciones} from '../../App/helpers/funciones';
import TableInfo from './TableInfo';

const Tablas = ({title,subtitle,loading,datas,columns,caption,inputs,Accions,showOptions,lang,icon,sort,print,datasPrint}) => {
    const style = useTablaStyles();
    if(!columns){ console.warn("Missing props 'columns'"); return; }
    if(!datas){ console.warn("Missing props 'datas[]'"); return; }
    if(!Accions){console.warn("Missing props 'Accions'"); return; }

    const columnsArray =  [];
    const headersArray =  [];

  columns.forEach((e) => {
    if (e.noPrint === true) {
    } else {
        columnsArray.push({ field: e.field, displayName: e.title });
        headersArray.push({ label: e.title, key: e.field });
    }
  });

return (
      <>
    <TableInfo title={title} subtitle={subtitle} icon={icon}  />
    
    <Box borderRadius={3} boxShadow={6} padding={2} bgcolor='background.paper'>
    
        <Box padding={1} mb={1}>
            {inputs && inputs}
        </Box>
    {
        loading ? <TablaLoading />
        :
        datas.length > 0 ? (
        <TableContainer
            id="table_print"
            className={style.tcontainer}
        >
        <Table stickyHeader className={style.table}>
            {caption && <caption><b>{caption}</b></caption>}
            <TableHead className={style.thead} >
                <TableRow className={style.trtitles} >
                    {
                        columns.map((col,index)=>(
                            <TableCell   align={col.align ? col.align : "left" } key={index}>
                               {sort?.desc && <span onClick={()=>sort.desc(col.field)} className={style.arrow}>↓</span> }
                               {col.title} 
                               {sort?.asc && <span onClick={()=>sort.asc(col.field)} className={style.arrow}>↑</span>}
                            </TableCell>
                        ))
                    }
                    <TableCell align='center'>
                        {lang? lang.opciones : "Opciones"}
                    </TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody className={style.tbody}>
                {
                    datas.map((data,index)=>(
                        <TableRow hover key={index} className={style.tableRow} >
                            {
                                columns.map((column,i)=>(
                                    <TableCell key={i} className={style.tableCell} align={column.align ? column.align : "left" }>
                                        <span className={style.columntitleSpan}>
                                            {column.title}:
                                        </span>
                                        <span style={
                                            column.style
                                                ? column.style
                                                : column.styleCondition
                                                ? column.styleCondition[data[column.styleFieldCondition]]
                                                : null
                                            }>
                                            {
                                                column.before ?? null
                                            }
                                            { 
                                            column.isNumber ? 
                                            funciones.numberFormat(data[column.field]) :
                                            column.items ?
                                            column.items[data[column.compareField]] :
                                            column.html ? column.html :
                                            data[column.field].substr(0, column.substr ?? 60 )
                                            }
                                            {
                                                column.after ?? null
                                            }
                                            </span>
                                    </TableCell>
                                ))
                            }
                            <TableCell align='center' className={style.tableCell} >
                                {
                                    showOptions && <Accions rowProps={data} />
                                }
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
            </Table>
        </TableContainer>) : (
            <Alert icon={<Icon>block</Icon>} severity="warning">
            <Typography variant="body1">Sin registros</Typography>
          </Alert>
        )
    }
    </Box>
    </>
  )
}

export default Tablas
