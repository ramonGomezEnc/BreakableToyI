import React from 'react';
import { Select, MenuItem, TextField, Button, Box } from '@mui/material';
import styled from 'styled-components';

const FixedWidthSelect = styled(Select)`
  width: 200px; /* Ancho fijo */
`;

const FilterWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-between;
  align-items: center;
`;

const TaskFilters: React.FC = () => {
  return (
    <FilterWrapper>
      <TextField label="Search by Name" variant="outlined" size="small" />
      
      <FixedWidthSelect defaultValue="All" size="small">
        <MenuItem value="All">All Priorities</MenuItem>
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
      </FixedWidthSelect>

      <FixedWidthSelect defaultValue="All" size="small">
        <MenuItem value="All">All States</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
        <MenuItem value="Undone">Undone</MenuItem>
      </FixedWidthSelect>

      <Button variant="contained" size="large">
        Search
      </Button>
    </FilterWrapper>
  );
};

export default TaskFilters;
