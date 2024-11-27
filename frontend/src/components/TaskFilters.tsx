import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, Box, Typography } from '@mui/material';
import styled from 'styled-components';

const MainContainer = styled(Box)`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  flex-direction: column;
  margin-bottom: 30px;
  gap: 20px;
`;

const NameContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 15px;

  label {
    width: 100px;
  }

  .name-input {
    flex-grow: 1;
  }
`;

const FilterContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const OptionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
`;

const PriorityContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  label {
    width: 100px;
  }

  .priority-select {
    flex-grow: 1;
  }
`;

const StateContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  label {
    width: 100px;
  }

  .state-select {
    flex-grow: 1;
  }
`;

const SearchButton = styled(Button)`
  align-self: flex-end;
  width: 150px;

  @media (max-width: 768px) {
    align-self: center;
  }
`;

interface TaskFiltersProps {
  onFilter: (filters: { name: string; priority: string; state: string }) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ onFilter }) => {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('All');
  const [state, setState] = useState('All');

  const handleSearch = () => {
    onFilter({ name, priority, state });
  };

  return (
    <MainContainer>
      <NameContainer>
        <Typography component="label" variant="body1">
          Name:
        </Typography>
        <TextField
          className="name-input"
          label="Search by Name"
          variant="outlined"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </NameContainer>

      <FilterContainer>
        <OptionContainer>
          <PriorityContainer>
            <Typography component="label" variant="body1">
              Priority:
            </Typography>
            <Select
              className="priority-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              variant="outlined"
              size="small"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </PriorityContainer>

          <StateContainer>
            <Typography component="label" variant="body1">
              State:
            </Typography>
            <Select
              className="state-select"
              value={state}
              onChange={(e) => setState(e.target.value)}
              variant="outlined"
              size="small"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="true">Done</MenuItem>
              <MenuItem value="false">Undone</MenuItem>
            </Select>
          </StateContainer>
        </OptionContainer>
        <SearchButton variant="contained" color="primary" onClick={handleSearch}>
          Search
        </SearchButton>
      </FilterContainer>
    </MainContainer>
  );
};

export default TaskFilters;