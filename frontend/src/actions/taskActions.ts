import axios from 'axios';
import { AppThunk } from '../store/store';
import { Task, SET_TASKS, SAVE_TASK, DELETE_TASK, TOGGLE_TASK_COMPLETION, GET_AVERAGE, GET_AVERAGE_BY_PRIORITY } from '../constants/taskConstants';

const API_URL = 'http://localhost:9090/api/v2/todos';

export const fetchTasks = (
  page: number,
  name = '',
  priority = 'All',
  state = 'All',
  sortField: string | undefined,
  sortDirection: string | undefined
): AppThunk => async (dispatch) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (name) params.append('name', name);
    if (priority !== 'All') params.append('priority', priority);
    if (state !== 'All') params.append('isCompleted', state);
    if (sortField) params.append('sortBy', sortField);
    if (sortDirection) params.append('order', sortDirection);

    const response = await axios.get(`${API_URL}?${params.toString()}`);
    dispatch({
      type: SET_TASKS,
      payload: { tasks: response.data.tasks, totalSize: response.data.totalSize },
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

export const fetchAllAverages = (): AppThunk => async (dispatch) => {
  try {
    const [averageResponse, lowResponse, mediumResponse, highResponse] = await Promise.all([
      axios.get(API_URL + "/averageTime"),
      axios.get(API_URL + "/averageTime/Low"),
      axios.get(API_URL + "/averageTime/Medium"),
      axios.get(API_URL + "/averageTime/High"),
    ]);

    dispatch({ type: GET_AVERAGE, payload: averageResponse.data });
    dispatch({ type: GET_AVERAGE_BY_PRIORITY, payload: { Low: lowResponse.data } });
    dispatch({ type: GET_AVERAGE_BY_PRIORITY, payload: { Medium: mediumResponse.data } });
    dispatch({ type: GET_AVERAGE_BY_PRIORITY, payload: { High: highResponse.data } });
  } catch (error) {
    console.error('Error fetching averages:', error);
  }
};

export const saveTask = (task: Task): AppThunk => async (dispatch) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, completedAt, ...modifiableTask } = task;

    console.log(modifiableTask);
    const response = task.id
      ? await axios.put<Task>(`${API_URL}/${task.id}`, modifiableTask)
      : await axios.post<Task>(API_URL, modifiableTask );
    dispatch({ type: SAVE_TASK, payload: response.data });
  } catch (error) {
    console.error('Error saving task:', error);
  }
};

export const deleteTask = (taskId: number): AppThunk => async (dispatch, getState) => {
  try {
    const { tasks } = getState().tasks;
    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;

    await axios.delete(`${API_URL}/${taskId}`);
    dispatch({ type: DELETE_TASK, payload: taskId });
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

export const toggleTaskCompletion = (taskId: number): AppThunk => async (dispatch, getState) => {
  try {
    const { tasks } = getState().tasks;
    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;

    const { completed } = task;

    if (!completed) {
      await axios.patch(`${API_URL}/${taskId}/done`);
    } else {
      await axios.patch(`${API_URL}/${taskId}/undone`);
    }

    const updatedTask = { ...task, completed: !task.completed };
    dispatch({ type: TOGGLE_TASK_COMPLETION, payload: updatedTask });
  } catch (error) {
    console.error('Error toggling task completion:', error);
  }
};