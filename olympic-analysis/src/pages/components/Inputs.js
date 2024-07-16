import React, { useState, useEffect, useCallback } from 'react';
import { Button, Container, Box, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/api';

export default function Inputs() {
  const [sport, setSport] = useState('');
  const [subSport, setSubSport] = useState('');
  const [medal, setMedal] = useState('');
  const [sports, setSports] = useState({});
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState('');
  const [error, setError] = useState('');

  const fetchSportsData = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/getsports/all`);
      
      setSports(response.data.disciplines);
    } catch (err) {
      console.error('Error fetching sports data:', err);
      setError('Failed to load sports data');
    }
  }, []);

  useEffect(() => {
    fetchSportsData();
  }, [fetchSportsData]);

  const handleMedalChange = (event) => {
    setMedal(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSportChange = (event) => {
    setSport(event.target.value);
    setSubSport('');
  };

  const handleSubSportChange = (event) => {
    setSubSport(event.target.value);
  };

  const handleButtonClick = async () => {
    if (!medal) {
      setError('Please select a medal');
      return;
    }

    setLoading(true);
    setError('');
    setPredictionResult('');

    try {
      let response;
      if (filter === 'sport') {
        if (!sport) {
          setError('Please select a sport');
          setLoading(false);
          return;
        }
        response = await axios.post(`${apiUrl}/bysport/`, {
          medalType: medal,
          sport: sport,
          subsport: subSport
        });
      } else if (filter === 'country') {
        response = await axios.post(`${apiUrl}/bycountry/`, {
          medalType: medal
        });
      }

      setPredictionResult(response.data.message);
    } catch (err) {
      console.error('Error fetching prediction:', err);
      setError('Failed to fetch prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="inputs" sx={{ color: 'white', pb: 10 }}>
      <Container sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 3, sm: 6 } }}>
        <Box sx={{ width: { sm: '100%', md: '60%' }, textAlign: { sm: 'left', md: 'center' } }}>
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

        {loading && <CircularProgress sx={{ mt: 2, color: '#000' }} />}

        {!loading && error && (
          <Typography variant="subtitle1" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {!loading && predictionResult && (
          <Box sx={{ display: 'flex', width: 1, height: 100, mt: 2 }}>
            <Paper elevation={3} sx={{ textAlign: 'center', alignItems: 'center', width: 1, borderRadius: 5, borderColor: '#000' }}>
              <Typography variant="subtitle1" sx={{ mt: 2, color: '#000' }}>
                <i>According to our model, based on your inputs, our Prediction is: </i>
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {predictionResult}!
              </Typography>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}
