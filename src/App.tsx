import { useState } from 'react'
import { ThemeType } from './theme/model.ts'
import { ThemeSwitch } from './theme/ThemeSwitch.tsx'
// import { Notes } from './notes/Notes.tsx'
import { Box } from '@mui/system'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AppBar, CssBaseline, Toolbar } from '@mui/material'
// import BakeryDiningOutlinedIcon from '@mui/icons-material/BakeryDiningOutlined';
import { Tables } from './tables/Tables.tsx'

const sxApp = {
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateRows: `auto 1fr`,
  justifyItems: 'center',
}

const sxToolbar = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 0,
  fontSize: '22px',
  color: 'white',
  pt: 1,
  pb: 1,
}

const sxMain = {
  width: '100%',
  midWidth: "5%",
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  placeItems: 'center',
  overflow: 'auto',

  //pt: 2,
  //pb: 2,

}

function App() {
  const [themeType, setThemeType] = useState<ThemeType>('light')

  const theme = createTheme({ palette: { mode: themeType } })

  return (
    <Box sx={sxMain}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={sxApp}>
          <AppBar position={'static'}>
            <Toolbar sx={sxToolbar}>
              
              <div style={{ display: 'flex'}}>

                <div
                  style={{
                    fontWeight: 'bold',
                    fontStyle: 'impact',
                    fontSize: '15px',
                    color: 'white',
                    //backgroundColor: '', // Background color
                    padding: '5px 3px', // Adjust the padding to increase/decrease space between words
                    //boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Box shadow effect
                  }}
                >
                  Zeit
                </div>

                <div
                  style={{
                    fontWeight: 'bold',
                    fontStyle: 'gerade',
                    fontSize: '20px',
                    color: 'yellow',
                    //backgroundColor: 'blue', // Background color
                    padding: '1px 4px 1px', // Adjust the padding to increase/decrease space between words
                    //boxShadow: '2px 2px 20px white', // Box shadow effect
                    textShadow: '3px 3px 20px black',
                    width: '20px', // Adjust the width as needed
                    height: '0px', // Adjust the height as needed
                  }}
                >
                  4
                </div>

                <div
                  style={{
                    fontWeight: 'bold',
                    fontStyle: 'gerade',
                    fontSize: '15px',
                    color: 'white',
                    //backgroundColor: '', // Background color
                    padding: '5px 3px', // Adjust the padding to increase/decrease space between words
                    //boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Box shadow effect
                  }}
                >
                  Ein
                </div>

                <div
                  style={{
                    fontWeight: 'bold',
                    fontStyle: 'gerade',
                    fontSize: '15px',
                    color: 'white',
                    //backgroundColor: '', // Background color
                    padding: '5px 0px', // Adjust the padding to increase/decrease space between words
                    //boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Box shadow effect
                  }}
                >
                  Gemeinschaftliches
                </div>

                <div
                  style={{
                    fontWeight: 'bold',
                    fontStyle: 'impact',
                    fontSize: '15px',
                    color: 'white',
                    //backgroundColor: '', // Background color
                    padding: '5px 5px', // Adjust the padding to increase/decrease space between words
                    //boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Box shadow effect
                  }}
                >
                  Frühstückserlebnis
                </div>

              </div>
              <ThemeSwitch themeType={themeType} onThemeChange={setThemeType} />
            </Toolbar>
          </AppBar>

          <div>
            <Tables />
          </div>     
        </Box>
      </ThemeProvider>
    </Box>
  )

}

export default App



