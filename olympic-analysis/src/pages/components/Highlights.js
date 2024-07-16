import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
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
          <Typography component="h1" variant="h4">
            Afterthought
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'grey.400', pt: 5 }}>
            One thing that we wanted to highlight is the fact that it is not possible to predict future outcomes of the 2024 Summer 
            Olympics by strictly using medal, country, and sport data. Instead, to make accurate predictions, we would also need 
            to analyse the athletes' performance data, which is not available to us. However, we can still provide some insights.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
