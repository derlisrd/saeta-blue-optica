import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useContext,  useState,useEffect } from 'react';
import typography from '../app/styles/typography';

const TemaContext = createContext()

function TemaProvider({children}) {
  
  const storage = JSON.parse(localStorage.getItem('tema'))

  const [mode,setMode] = useState(storage ? storage.mode : 'light')

  const toggleTheme = ()=>{ 
    let nuevo_modo = mode==='light' ? 'dark' : 'light'
    let tema = {mode:nuevo_modo}
    localStorage.setItem('tema',JSON.stringify(tema))
    setMode( nuevo_modo )
 }

  const checkTheme = ()=>{
    const storage = JSON.parse(localStorage.getItem('tema'))
    //console.log(storage);
    if(!storage){
      let tema = {mode:'light'}
      localStorage.setItem('tema',JSON.stringify(tema))
    }
  }

  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {checkTheme()}
    return () => {isActive = false;ca.abort();};
  }, [checkTheme]);
    
  const customTheme = createTheme({
      palette:{
        mode: mode,
      },
      typography,
      components:{
        MuiOutlinedInput:{
          styleOverrides:{
            root: {
              borderRadius: "12px",
              borderWidth: 0,
            },
          }
        }
        ,
        MuiCssBaseline:{
          styleOverrides:{
            body: {
              margin:0,
              padding:0,
              boxSizing:"border-box",
              background:'background.paper',
              transition:'all 0.2s',
            },
            
          }
        }
      }
    });
    //customTheme.components = ComponentsOverrides(customTheme)
    const values = { toggleTheme,mode }
    
    return <TemaContext.Provider value={values}><ThemeProvider theme={customTheme}><CssBaseline />{children}</ThemeProvider></TemaContext.Provider>
}

export function useTema (){
  const {toggleTheme,mode} = useContext(TemaContext)
  return {toggleTheme,mode}
}


export default TemaProvider;