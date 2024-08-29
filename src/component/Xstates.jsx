import React, { useEffect, useState } from "react";

function States() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [summary, setSummary] = useState("");

    // Fetch countries on component mount
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("https://crio-location-selector.onrender.com/countries");
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    // Fetch states when a country is selected
    useEffect(() => {
        if (selectedCountry) {
            const fetchStates = async () => {
                try {
                    const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
                    const data = await response.json();
                    setStates(data);
                } catch (error) {
                    console.error("Error fetching states:", error);
                }
            };

            fetchStates();
        } else {
            // Clear states when no country is selected
            setStates([]);
            setSelectedState("");
            setCities([]);
            setSelectedCity("");
        }
    }, [selectedCountry]);

    // Fetch cities when a state is selected
    useEffect(() => {
        if (selectedState) {
            const fetchCities = async () => {
                try {
                    const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
                    const data = await response.json();
                    setCities(data);
                } catch (error) {
                    console.error("Error fetching cities:", error);
                }
            };

            fetchCities();
        } else {
            // Clear cities when no state is selected
            setCities([]);
            setSelectedCity("");
        }
    }, [selectedState]);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setSelectedState(""); // Reset selected state when country changes
        setCities([]); // Clear cities when country changes
        setSelectedCity(""); // Clear selected city when country changes
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setSelectedCity(""); // Clear selected city when state changes
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    useEffect(() => {
        if (selectedCity) {
            setSummary(`You Selected ${selectedCity}, ${selectedState}, ${selectedCountry}`);
        } else {
            setSummary("");
        }
    }, [selectedCity, selectedState, selectedCountry]);

    return (
        <>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Select Location</h1>
            
            {/* Country dropdown */}
            <select 
                value={selectedCountry} 
                onChange={handleCountryChange} 
                style={{ 
                    marginBottom: '20px', 
                    padding: '10px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc',
                    width: '100%',
                    maxWidth: '300px',
                    margin: '10px', 
                    fontSize: '16px'
                }}
            >
                <option value="" disabled>Select a country</option>
                {countries.map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>
            
            {/* State dropdown, visible but disabled until a country is selected */}
            <select 
                value={selectedState} 
                onChange={handleStateChange} 
                disabled={!selectedCountry}
                style={{ 
                    padding: '10px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc',
                    width: '100%',
                    maxWidth: '300px',
                    margin: '10px', 
                    fontSize: '16px',
                    opacity: !selectedCountry ? 0.5 : 1
                }}
            >
                <option value="" disabled>Select a state</option>
                {states.map((state) => (
                    <option key={state} value={state}>
                        {state}
                    </option>
                ))}
            </select>
            
            {/* City dropdown, visible but disabled until a state is selected */}
            <select 
                value={selectedCity} 
                onChange={handleCityChange} 
                disabled={!selectedState}
                style={{ 
                    padding: '10px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc',
                    width: '100%',
                    maxWidth: '300px',
                    margin: '10px', 
                    fontSize: '16px',
                    opacity: !selectedState ? 0.5 : 1
                }}
            >
                <option value="" disabled>Select a city</option>
                {cities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>

            {/* Summary statement */}
            {summary && (
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px' }}>
                    <span style={{ fontWeight: 'bold', color: 'black' }}>
                        You Selected {selectedCity}
                    </span>, 
                    <span style={{ fontWeight: 'bold', color: 'lightgray' }}>
                        {selectedState}
                    </span>, 
                    <span style={{ fontWeight: 'bold', color: 'lightgray' }}>
                        {selectedCountry}
                    </span>
                </p>
            )}
        </>
    );
}

export default States;
