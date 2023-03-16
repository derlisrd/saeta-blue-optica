import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link,useLocation } from "react-router-dom";
import { env } from "../../app/config";
import { ListaMenu } from "../../Utils/ListaMenu";
import { Icon } from "@iconify/react";
import { Fragment,useState } from "react";
import styles from './styles.module.css'
import { useMenu } from "./MenuProvider";
import SimpleBar from "simplebar-react";

function MenuList({isMobile}) {
  const { BASEURL,APPNAME } = env;
  let location = useLocation();
  const pathname =  (location.pathname).substring(6);

  const [lista,setLista] = useState(ListaMenu);

  const {setMobileOpen} = useMenu()

  const closeMobileMenu = ()=> setMobileOpen(false);

  const openCollapseMenu = (sw,id)=>{
    let array = [...lista];
    let index = array.findIndex((e)=> e.id===id)
    array[index].open = !sw;
    setLista(array);
  }

  return (<>
    <Toolbar>
      <Stack direction='row' alignItems='center' justifyContent='space-between' width='100%'>
        {isMobile && <IconButton onClick={closeMobileMenu} ><Icon icon='ri:menu-fold-line' height={24} /></IconButton>}
        <Typography variant="button">{APPNAME}</Typography>

        </Stack>
      </Toolbar>
      <List >
        <SimpleBar >
        {lista.map((e, i) => (
          <Fragment key={i}>
            {e.sub ? (
              <Fragment>
              <ListItem disablePadding >
                <ListItemButton selected={pathname === e.url}   onClick={()=>openCollapseMenu(e.open,e.id)} className={styles.listmenu}>
                  <ListItemIcon className={styles.iconmenu}>
                    <Icon icon={e.icon} height={24} />
                  </ListItemIcon>
                  <ListItemText className={styles.textmenu}  primary={e.title} />
                  <Icon
                    icon={e.open ? `mdi:expand-less` : `mdi:expand-more`} height={24}/>
                </ListItemButton>
              </ListItem>
              <Collapse in={e.open} timeout="auto" unmountOnExit>
                <List component="div" className={styles.submenu} disablePadding >
                  {
                    e.submenu.map((elem,indexsub)=>(
                      <ListItem disablePadding key={indexsub}>
                        <ListItemButton selected={pathname === elem.url}  onClick={closeMobileMenu} component={Link} to={BASEURL + elem.url} className={styles.listmenu}>
                          <ListItemIcon className={styles.iconmenu}>
                          <Icon icon={elem.icon} height={20} />
                          </ListItemIcon>
                          <ListItemText className={styles.textmenu}  primary={elem.title} />
                        </ListItemButton>
                      </ListItem>
                    ))
                  }
                </List>
              </Collapse>
              </Fragment>
            ) : (
              <ListItem disablePadding>
                <ListItemButton selected={pathname === e.url}  onClick={closeMobileMenu} className={styles.listmenu}  component={Link} to={BASEURL + e.url}>
                  <ListItemIcon className={styles.iconmenu}>
                    <Icon icon={e.icon} height={24} />
                  </ListItemIcon>
                  <ListItemText className={styles.textmenu} primary={e.title} />
                </ListItemButton>
              </ListItem>
            )}
          </Fragment>
        ))}
    </SimpleBar>
      </List>
      </>
  );
}

export default MenuList;
