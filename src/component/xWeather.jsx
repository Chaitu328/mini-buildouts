import React, { useState } from 'react';
import { Button, TextField, Container, Card, CardContent, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        success: {
            main: '#4caf50',
        },
    },
});

function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async () => {
        setLoading(true);
        setWeatherData(null);

        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}`);
            if (!response.ok) throw new Error('Failed to fetch weather data');
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            alert('Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container 
                style={{ 
                    backgroundColor: '#F0F8FF', 
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', 
                    height: '100vh', 
                }}
            >
                <TextField 
                    placeholder="Enter city name" 
                    variant="outlined" 
                    style={{ marginRight: '5px', maxWidth: '300px' }} 
                    inputProps={{ 
                        style: { 
                            height: '40px',
                            padding: '10px',
                        } 
                    }}
                    onChange={(e) => setCity(e.target.value)}
                />
                <Button 
                    variant="contained" 
                    color="success"
                    style={{
                        height: '56px',
                        minWidth: 'auto',
                        marginTop: '10px'
                    }}
                    onClick={fetchWeather}
                >
                    Search
                </Button>

                {loading && <p>Loading data…</p>}
                
                {weatherData && (
                    <div className="weather-cards" style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Card className="weather-card" style={{ maxWidth: '150px' }}>
                            <CardContent>
                                <Typography variant="h6">Temperature</Typography>
                                <Typography variant="body1">{weatherData.current.temp_c}°C</Typography>
                            </CardContent>
                        </Card>
                        <Card className="weather-card" style={{ maxWidth: '150px' }}>
                            <CardContent>
                                <Typography variant="h6">Humidity</Typography>
                                <Typography variant="body1">{weatherData.current.humidity}%</Typography>
                            </CardContent>
                        </Card>
                        <Card className="weather-card" style={{ maxWidth: '150px' }}>
                            <CardContent>
                                <Typography variant="h6">Condition</Typography>
                                <Typography variant="body1">{weatherData.current.condition.text}</Typography>
                            </CardContent>
                        </Card>
                        <Card className="weather-card" style={{ maxWidth: '150px' }}>
                            <CardContent>
                                <Typography variant="h6">Wind Speed</Typography>
                                <Typography variant="body1">{weatherData.current.wind_kph} kph</Typography>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default Weather;
