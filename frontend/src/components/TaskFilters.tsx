import React from 'react';
import { TextField, Select, MenuItem, Button, Box } from '@mui/material';
import styled from 'styled-components';

// Styled Container for the filters
const FilterContainer = styled(Box)`
  display: flex;
  flex-direction: column; /* Apila los elementos verticalmente */
  gap: 15px;
  margin-bottom: 20px;
  max-width: 1200px; /* Asegura que esté alineado con TaskManager */
  width: 100%;
  margin: 0 auto; /* Centra el contenedor */

  /* Asegura que los elementos internos se expandan */
  & > * {
    flex-grow: 1; /* Permite que los elementos se expandan */
    width: 100%; /* Ocupa todo el ancho del contenedor */
    max-width: none; /* Desactiva cualquier límite de ancho */
  }

  /* Botón estilizado */
  .search-button {
    width: 150px;
    align-self: flex-start; /* Opcional: Alinea el botón a la izquierda */
  }
`;

const TaskFilters: React.FC = () => {
  return (
    <FilterContainer>
      {/* Search input */}
      <TextField
        label="Name"
        variant="outlined"
        size="small"
      />
      
      {/* Priority dropdown */}
      <Select
        defaultValue="All"
        variant="outlined"
        size="small"
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
      </Select>
      
      {/* State dropdown */}
      <Select
        defaultValue="All"
        variant="outlined"
        size="small"
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
        <MenuItem value="Undone">Undone</MenuItem>
      </Select>

      {/* Search button */}
      <Button
        variant="contained"
        color="primary"
        size="medium"
        className="search-button"
      >
        Search
      </Button>
    </FilterContainer>
  );
};

export default TaskFilters;
