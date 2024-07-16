import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function About() {
  return (

    // Overall box that encompasses this about React.Component.

    <Box
      id="about"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >

      {/* Container that holds the text and image for the about section. */}

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >

        {/* Stacks together the text and image for the about section. */}

        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>

          {/* Typography with the main title for the about section. */}

          <Typography
            variant="h1"
            sx={{
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            Have you ever wanted to know who would win the <i>next</i>{" "}
            <span style={{ fontSize: 'clamp(3rem, 10vw, 4rem)', color: (theme) => theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light }}>
              Olympics?
            </span>
          </Typography>
          {/* Subtitle for the about section. */}
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            We provide the most accurate predictions (as good as we can get for a model built in 24 hours) for the next Olympics!
            Scroll down to see our predictions based on your criteria and how we got them!
          </Typography>

        </Stack>
        {/* Olympics Image */}

        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '100%',
            backgroundImage: 'url("./Olympic_Rings.svg")',
            // backgroundImage: 'url("./darkOlympics.png")',
            backgroundPosition: 'center',
                // : 'url("/static/images/templates/templates-images/hero-dark.png")',
            // backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            backgroundColor:
              theme.palette.mode === 'light'
                ? alpha('#fff', 0.5)
                : alpha('#fff', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
          })}
        />
      </Container>
    </Box>
  );
}
