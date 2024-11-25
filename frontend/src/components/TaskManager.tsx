import React, { useState } from 'react';
import styled from 'styled-components';
import TaskFilters from './TaskFilters';
import TaskList from './TaskList';
import TaskModal from './TaskModal'; // Componente del modal
import Pagination from './Pagination';
import Statistics from './Statistics';
import { Button } from '@mui/material';

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start; /* Alinea el botón a la izquierda */
`;

const TaskManager: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', priority: 'Low', dueDate: '-', done: true },
    { id: 2, name: 'Task 2', priority: 'High', dueDate: '2022/02/02', done: false },
    { id: 3, name: 'Task 3', priority: 'Medium', dueDate: '2023/02/02', done: false },
  ]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCreateTask = (newTask: { name: string; priority: string; dueDate: string }) => {
    const taskWithId = { ...newTask, id: tasks.length + 1, done: false };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
    console.log('Task Created:', taskWithId);
  };

  return (
    <StyledContainer>
      {/* Filtros */}
      <TaskFilters />
      
      {/* Botón para nueva tarea */}
      <ButtonWrapper>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          + New Task
        </Button>
      </ButtonWrapper>

      {/* Lista de tareas */}
      <TaskList tasks={tasks} />

      {/* Paginación */}
      <Pagination />

      {/* Estadísticas */}
      <Statistics />

      {/* Modal para crear nueva tarea */}
      <TaskModal
        open={openModal}
        onClose={handleCloseModal}
        onCreateTask={handleCreateTask}
      />
    </StyledContainer>
  );
};

export default TaskManager;
