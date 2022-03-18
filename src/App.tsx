import {
  AppBar,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import Heatmap from './components/Heatmap/index';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Transaction Heatmap
        </Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="md" sx={{ pt: 8, pb: 6 }}>
      <CssBaseline />
      <Typography variant="body1" paragraph={true}>
        Click a square below for more info.
      </Typography>
      <Heatmap />
    </Container>
  </ThemeProvider>
);

export default App;
