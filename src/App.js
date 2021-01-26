import React, { useState } from 'react';
import {
  withStyles,
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  TextField,
  Typography
} from '@material-ui/core';
import SortItems from './components/SortItems';

import { Context } from './context';
import theme from './helpers/theme';
import { useHistory } from 'react-router-dom';

const StyledContainer = withStyles(() => ({
  root: {
    marginTop: '10vh'
  }
}))(Container);

const App = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    history.push(`/${event.target.value}`);
    setSearchTerm(event.target.value);
  };

  return (
    <Context.Provider value={{ searchTerm }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledContainer>
          <Typography variant="h3">My Small Filter</Typography>
          <Box marginTop={5} />
          <TextField
            value={searchTerm}
            onChange={handleChange}
            id="outlined-basic"
            label="Search"
            variant="outlined"
          />
          <Box marginTop={5} />
          <SortItems />
        </StyledContainer>
      </ThemeProvider>
    </Context.Provider>
  );
};

export default App;
