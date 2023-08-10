import { useState } from 'react'
import { ThemeType } from './theme/model.ts'
import { ThemeSwitch } from './theme/ThemeSwitch.tsx'
import { Notes } from './notes/Notes.tsx'
import { Box } from '@mui/system'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AppBar, CssBaseline, Toolbar } from '@mui/material'
// import BakeryDiningOutlinedIcon from '@mui/icons-material/BakeryDiningOutlined';
import { Tables } from './tables/Tables.tsx'

const sxApp = {
  width: '100%',
  height: `100%`,
  display: 'grid',
  gridTemplateRows: `auto 1fr`,
  justifyItems: 'center',
}

const sxToolbar = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 1,
  fontSize: '22px',
  color: 'white',
  pt: 1,
  pb: 1,
}

const sxMain = {
  width: '100%',
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
              <img src="https://i.pinimg.com/originals/e3/75/52/e375527f77c59ff25760ffd73f9fd2e1.gif" alt="GIF" style={{ height: '2rem', marginRight: '0rem' }} />
              {/* <BakeryDiningOutlinedIcon style={{ fontSize: '3rem', color: 'yellow' }} /> */}
              <div style={{ display: 'flex', gap: '0px', flexWrap: 'wrap', justifyContent: 'center' }}>

                <div
                  style={{
                    fontWeight: 'bold',
                    fontStyle: 'impact',
                    color: 'white',
                    //backgroundColor: '', // Background color
                    padding: '5px 2px', // Adjust the padding to increase/decrease space between words
                    //boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Box shadow effect
                  }}
                >
                  Zeit
                </div>

                <div
                  style={{
                    fontWeight: 'bold',
                    fontStyle: 'gerade',
                    fontSize: '30px',
                    color: 'yellow',
                    //backgroundColor: 'blue', // Background color
                    padding: '0px 4px 1px', // Adjust the padding to increase/decrease space between words
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
                    color: 'white',
                    //backgroundColor: '', // Background color
                    padding: '5px 6px', // Adjust the padding to increase/decrease space between words
                    //boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Box shadow effect
                  }}
                >
                  Ein
                </div>

                <div
                  style={{
                    fontWeight: 'bold',
                    fontStyle: 'gerade',
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

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div>
              <img
                src="https://media1.giphy.com/media/R59Hhh3cnfuffSSAxP/giphy.gif?cid=ecf05e475l4ap2st8ge03w4odug4l0u9kzk2wk736guvcrz5&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                alt="GIF"
                style={{ height: '10rem', marginLeft: '1.5rem' }}
              />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Notes />
            </div>
          </div>

        </Box>
      </ThemeProvider>
    </Box>
  )

}

export default App

