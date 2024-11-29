// Import Vitest and necessary libraries
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../reducers/taskReducer'; // Assuming you have a taskReducer
import { fetchTasks, saveTask, deleteTask, toggleTaskCompletion } from '../actions/taskActions';
import { Task } from '../constants/taskConstants';

// Mock Axios for API calls
vi.mock('axios');
const mockedAxios = axios as typeof axios & {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
  patch: ReturnType<typeof vi.fn>;
};

// Example task for testing
const mockTask: Task = {
  id: 1,
  name: 'Test Task',
  priority: 'Medium',
  createdAt: new Date(),
  completedAt: null,
  dueDate: new Date(),
  completed: false,
};

// Setup the store
const createTestStore = () =>
  configureStore({
    reducer: {
      tasks: taskReducer,
    },
  });

describe('Task Actions with Actual Redux Store', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchTasks', () => {
    it('should fetch tasks and update state via SET_TASKS action', async () => {
      // Arrange
      const mockResponse = {
        data: {
          tasks: [mockTask],
          totalSize: 1,
        },
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const store = createTestStore();

      // Act
      await store.dispatch(fetchTasks(0, '', 'All', 'All', undefined, undefined));

      // Assert
      const state = store.getState().tasks;
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/api/v1/todos'));
      expect(state.tasks).toEqual([mockTask]);
      expect(state.totalSize).toBe(1);
    });
  });

  describe('saveTask', () => {
    it('should update an existing task and update state via SAVE_TASK action', async () => {
      // Arrange
      const updatedTask = { ...mockTask, name: 'Updated Task' };
      mockedAxios.put.mockResolvedValue({ data: updatedTask });
      const store = createTestStore();

      // Pre-populate the store
      store.dispatch({ type: 'SAVE_TASK', payload: mockTask });

      // Act
      await store.dispatch(saveTask(updatedTask));

      // Assert
      const state = store.getState().tasks;
      expect(mockedAxios.put).toHaveBeenCalledWith(
        `http://localhost:9090/api/v1/todos/${mockTask.id}`,
        expect.any(Object)
      );
      expect(state.tasks).toContainEqual(updatedTask);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task and update state via DELETE_TASK action', async () => {
      // Arrange
      mockedAxios.delete.mockResolvedValue({});
      const store = createTestStore();

      // Pre-populate the store
      store.dispatch({ type: 'SAVE_TASK', payload: mockTask });

      // Act
      await store.dispatch(deleteTask(mockTask.id));

      // Assert
      const state = store.getState().tasks;
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `http://localhost:9090/api/v1/todos/${mockTask.id}`
      );
      expect(state.tasks).not.toContainEqual(mockTask);
    });
  });

  describe('toggleTaskCompletion', () => {
    it('should toggle task completion and update state via TOGGLE_TASK_COMPLETION action', async () => {
      // Arrange
      const toggledTask = { ...mockTask, completed: !mockTask.completed };
      mockedAxios.patch.mockResolvedValue({});
      const store = createTestStore();

      // Pre-populate the store
      store.dispatch({ type: 'SAVE_TASK', payload: mockTask });

      // Act
      await store.dispatch(toggleTaskCompletion(mockTask.id));

      // Assert
      const state = store.getState().tasks;
      expect(mockedAxios.patch).toHaveBeenCalledWith(
        `http://localhost:9090/api/v1/todos/${mockTask.id}/done`
      );
      expect(state.tasks).toContainEqual(toggledTask);
    });
  });
});