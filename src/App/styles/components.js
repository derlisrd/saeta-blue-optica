const components = {
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
export default components