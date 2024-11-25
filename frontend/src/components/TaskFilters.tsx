import React from 'react';
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
    max-width: 100%;

    @media (max-width: 768px) {
      max-width: 100%;
    }
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
    max-width: 400px;
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
    max-width: 400px;
  }
`;

const SearchButton = styled(Button)`
  align-self: flex-end;
  width: 150px;

  @media (max-width: 768px) {
    align-self: center;
  }
`;

const TaskFilters: React.FC = () => {
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
              defaultValue="All"
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
              defaultValue="All"
              variant="outlined"
              size="small"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
              <MenuItem value="Undone">Undone</MenuItem>
            </Select>
          </StateContainer>
        </OptionContainer>
        <SearchButton variant="contained" color="primary">
          Search
        </SearchButton>
      </FilterContainer>
    </MainContainer>
  );
};

export default TaskFilters;
