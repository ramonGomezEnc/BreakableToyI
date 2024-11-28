import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState, AppDispatch } from '../store/store';
import { fetchTasks, toggleTaskCompletion, saveTask, deleteTask, fetchAverage, fetchAverageByPriority } from '../actions/taskActions';
import TaskList from '../components/TaskList';
import Pagination from '../components/Pagination';
import { Task } from '../constants/taskConstants';
import TaskModal from '../components/TaskModal';
import { Button } from '@mui/material';
import Statistics from '../components/Statistics';
import TaskFilters from '../components/TaskFilters';

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

const TaskContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const totalSize = useSelector((state: RootState) => state.tasks.totalSize);
  const average = useSelector((state: RootState) => state.tasks.average);
  const averagesByPriority = useSelector((state: RootState) => state.tasks.averagesByPriority);

  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({ name: '', priority: 'All', state: 'All' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sortField, setSortField] = useState<'priority' | 'dueDate' | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | undefined>(undefined);

  const tasksPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const { name, priority, state } = filters;
      await Promise.all([
        dispatch(fetchTasks(currentPage, name, priority, state, sortField, sortDirection)),
        dispatch(fetchAverage()),
        dispatch(fetchAverageByPriority('High')),
        dispatch(fetchAverageByPriority('Medium')),
        dispatch(fetchAverageByPriority('Low')),
      ]);
    };
    fetchData();
  }, [dispatch, currentPage, filters, sortField, sortDirection]);

  const handleToggleCompletion = (taskId: number) => dispatch(toggleTaskCompletion(taskId));

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page);

  const handleEditTask = (taskId: number) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setSelectedTask(taskToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch(deleteTask(taskId));
  };

  const handleSaveTask = (task: Task) => {
    dispatch(saveTask(task));
    handleModalClose();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleFilterChange = (newFilters: { name: string; priority: string; state: string }) => {
    setFilters(newFilters);
    setCurrentPage(0);
  };

  const handleSort = (field: 'priority' | 'dueDate', direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);
  };

  const totalPages = Math.ceil(totalSize / tasksPerPage);

  return (
    <StyledContainer>
      <TaskFilters onFilter={handleFilterChange} />
      <ButtonWrapper>
        <Button variant="contained" color="primary" onClick={ () => setIsModalOpen(true)}>
          + New Task
        </Button>
      </ButtonWrapper>
      <TaskList
        tasks={tasks}
        onToggleCompletion={handleToggleCompletion}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onSort={handleSort}
        sortField={sortField}
        sortDirection={sortDirection}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <TaskModal
        open={isModalOpen}
        modalType={selectedTask ? 'edit' : 'create'}
        onClose={handleModalClose}
        onSave={handleSaveTask}
        taskToEdit={selectedTask || undefined}
      />
      <Statistics average={average} averagesByPriority={averagesByPriority} />
    </StyledContainer>
  );
};

export default TaskContainer;