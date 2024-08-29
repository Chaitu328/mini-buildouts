import React from 'react';
import { Button, TextField, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        success: {
            main: '#4caf50',
        },
    },
});

function Weather() {
    return (
        <ThemeProvider theme={theme}>
            <Container 
                style={{ 
                    backgroundColor: '#F0F8FF', 
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'center', 
                    height: '100vh', 
                }}
            >
                <TextField 
                    placeholder="Enter city name" 
                    variant="outlined" 
                    style={{ marginRight: '5px', maxWidth: '300px' }} 
                    inputProps={{ 
                        style: { 
                            height: '40px',  // Adjust the input height
                            padding: '10px', // Adjust padding for consistency
                        } 
                    }}
                />
                <Button 
                    variant="contained" 
                    color="success"
                    sx={{
                        height: '56px',  // Match the height with the TextField's total height (considering padding)
                        minWidth: 'auto', // Keep button width tight around the text
                    }}
                >
                    Search
                </Button>
            </Container>
        </ThemeProvider>
    );
}

export default Weather;
