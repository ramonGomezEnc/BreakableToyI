import React from 'react';
import styled from '@emotion/styled';
import TaskFilters from './TaskFilters';
import TaskList from './TaskList';
import Pagination from './Pagination';
import Statistics from './Statistics';

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TaskManager: React.FC = () => {
  return (
    <StyledContainer>
      <TaskFilters />
      <TaskList />
      <Pagination />
      <Statistics />
    </StyledContainer>
  );
};

export default TaskManager;
