import React, { useState, useEffect } from 'react';
import { Button, Container, Box, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress, Paper } from '@mui/material';

export default function Inputs() {
  // State to hold the selected medal, sport, and sub-sport
  const [sport, setSport] = useState('');
  const [subSport, setSubSport] = useState('');
  const [medal, setMedal] = useState('');
  const [sports, setSports] = useState({});
  const [filter, setFilter] = useState(''); // State to hold the current filter
//   let dataToDisplay = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [predictionResult, setPredictionResult] = useState(''); // State to hold the prediction result

  // Load data into sports
  useEffect(() => {
    const fetchData = async () => {
      console.log("attempting to make api call");
      try {
        const response = await fetch("http://localhost:8000/getsports/all");
        const data = await response.json();
        console.log(data.disciplines);  // Assuming your endpoint returns descriptions
        setSports(data.disciplines);    // Set the sports data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handler to update the selected medal
  const handleMedalChange = (event) => {
    setMedal(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Handler to update the selected sport
  const handleSportChange = (event) => {
    setSport(event.target.value);
    setSubSport(''); // Reset sub-sport when the main sport changes
  };

  // Handler to update the selected sub-sport
  const handleSubSportChange = (event) => {
    setSubSport(event.target.value);
  };

  // Handler to fetch new data on Predict button click
  const handleButtonClick = async () => {
    console.log('Selected Medal:', medal);
    console.log('Selected Sport:', sport);
    console.log('Selected Sub-Sport:', subSport);

    // SPORT

    if (filter === 'sport'){
        if (!sport) {
            console.error('Please select a sport');
            return;
        }
        else if (filter === 'subSport' && !subSport) {
            console.error('Please select a sub-sport');
            return;
        }
        else if (!medal) {
            console.error('Please select a medal');
            return;
        }
        else {
            console.log("attempting to make sports api call")
            try {
                const response = await fetch("http://localhost:8000/bysport/", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ medalType: medal, sport: sport, subsport: subSport }),
                  });
                  const data = await response.json();
                  console.log('Prediction result:', data.message);
                  setPredictionResult(data.message);
                  setLoading(false);
                  // Handle the prediction result as needed
                } catch (error) {
                  console.error('Error fetching prediction:', error);
                  setLoading(false);
                }
        }
    }

    // COUNTRY

    else if (filter === 'country'){
        if (!medal) {
            console.error('Please select a medal');
            return;
        }
        else {
            console.log("attempting to make countries api call")
            try {
                const response = await fetch("http://localhost:8000/bycountry/", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ medalType: medal }),
                  });
                const data = await response.json();
                console.log('Prediction result:', data.message);
                setPredictionResult(data.message);
                setLoading(false);
                // Handle the prediction result as needed
              } catch (error) {
                console.error('Error fetching prediction:', error);
                setLoading(false);
              }
        }
    }
  };

  return (
    <Box
      id="inputs"
      sx={{
        color: 'white',
        pb: 10,
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" color="primary">
            Inputs
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Choose your inputs and our platform will determine who is most likely to win the next Olympics, in that category!
          </Typography>
        </Box>

        <FormControl variant="outlined" fullWidth>
          <InputLabel>Medal</InputLabel>
          <Select value={medal} onChange={handleMedalChange} label="Medal">
            <MenuItem value={'bronze'}>Bronze</MenuItem>
            <MenuItem value={'silver'}>Silver</MenuItem>
            <MenuItem value={'gold'}>Gold</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <InputLabel>Filter By</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Filter By">
            <MenuItem value={'country'}>Country</MenuItem>
            <MenuItem value={'sport'}>Sport</MenuItem>
          </Select>
        </FormControl>

        {filter === 'sport' && (
          <>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Sport</InputLabel>
              <Select value={sport} onChange={handleSportChange} label="Sport">
                {Object.keys(sports).map((sport) => (
                  <MenuItem key={sport} value={sport}>{sport}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {sport && (
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Sub-Sport</InputLabel>
                <Select value={subSport} onChange={handleSubSportChange} label="Sub-Sport">
                  {sports[sport].map((subSport) => (
                    <MenuItem key={subSport} value={subSport}>{subSport}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </>
        )}

        <Button variant="contained" color="secondary" onClick={handleButtonClick}>
          Predict
        </Button>

        {loading && <CircularProgress sx={{ mt: 2, color: '#000' }} />} {/* Show loading spinner when loading */}

        {!loading && predictionResult && (

            <Box
            sx={{
                display: 'flex',
                // m: 1,
                width: 1,
                height: 100,
            }}>
                <Paper
                elevation={3}
                sx={{
                    textAlign:"center",
                    alignItems: 'center',
                    alignContent: 'center',
                    width: 1,
                    borderRadius: 5,
                    borderColor: '#000',
                }}>
                    <Typography variant="subtitle1" sx={{ mt: 2, color: "#000" }}>
                        <i>According to our model, based on your inputs, our Prediction is: </i> 

                    </Typography>

                    <Typography
                        display='inline'
                        variant="h3"
                        sx={{
                            // fontSize: 'clamp(1rem, 1vw, 1rem)',
                            fontWeight: 'bold',
                            color: (theme) =>
                            theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                        }}
                        >
                            {predictionResult}!
                    </Typography>
                </Paper>
            </Box>
        )}

      </Container>
    </Box>
  );
}
