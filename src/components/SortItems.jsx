import React, { useContext } from 'react';
import { Context } from '../context';
import { Box, List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { useAsync } from 'react-async';

const loadUsers = async () =>
  await fetch('https://www.json-generator.com/api/json/get/cgppTrAamq?indent=2')
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((res) => res.json());

const Loading = () => (
  <Box display="block" marginX="auto">
    <CircularProgress color={'secondary'} />
  </Box>
);

const SortItems = () => {
  const { data, error, isLoading } = useAsync({ promiseFn: loadUsers });
  const { searchTerm } = useContext(Context);
  if (isLoading) return <Loading />;
  if (error) return `Something went wrong: ${error.message}`;
  if (data) {
    const results = !searchTerm
      ? data.body
      : data.body.filter((person) => person.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    return (
      <>
        <Box marginTop={5} />
        <List>
          {results.map((item) => (
            <ListItem key={item}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </>
    );
  }
};

export default SortItems;
