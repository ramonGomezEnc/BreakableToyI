import React, { useState } from 'react';
import styled from 'styled-components';
import TaskFilters from './TaskFilters';
import TaskList from './TaskList';
import TaskModal, { Task } from './TaskModal';
import Pagination from './Pagination';
import Statistics from './Statistics';
import { Button } from '@mui/material';

const StyledContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const TaskManager: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Task 1', priority: 'Low', dueDate: '-', done: true },
    { id: 2, name: 'Task 2', priority: 'High', dueDate: '2022/02/02', done: false },
    { id: 3, name: 'Task 3', priority: 'Medium', dueDate: '2023/02/02', done: false },
  ]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleOpenModalForCreation = () => {
    setTaskToEdit(null);
    setOpenModal(true);
  };

  const handleOpenModalForEdit = (task: Task) => {
    setTaskToEdit(task);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveTask = (task: Task) => {
    if (task.id !== undefined) {
      // Edición
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? { ...task } : t))
      );
    } else {
      // Creación
      const newTask = { ...task, id: tasks.length + 1, done: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  return (
    <StyledContainer>
      <TaskFilters />
      <ButtonWrapper>
        <Button variant="contained" color="primary" onClick={handleOpenModalForCreation}>
          + New Task
        </Button>
      </ButtonWrapper>
      <TaskList tasks={tasks} onEditTask={handleOpenModalForEdit} />
      <Pagination />
      <Statistics />

      <TaskModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit || undefined}
      />
    </StyledContainer>
  );
};

export default TaskManager;
