
import { AnyAction } from '@reduxjs/toolkit';
import { Task, TaskAction, SET_TASKS, SAVE_TASK, DELETE_TASK, TOGGLE_TASK_COMPLETION, GET_AVERAGE, GET_AVERAGE_BY_PRIORITY} from '../constants/taskConstants';

interface TaskState {
  tasks: Task[];
  totalSize: number;
  average: number | null;
  averagesByPriority: {
    [key: string]: number;
  };
}

const initialState: TaskState = {
  tasks: [],
  totalSize: 0,
  average: null,
  averagesByPriority: {},
};

const taskReducer = (state = initialState, action: TaskAction | AnyAction): TaskState => {
  switch (action.type) {
    case SET_TASKS: {
      return {
        ...state,
        tasks: action.payload.tasks,
        totalSize: action.payload.totalSize,
      };
    }

    case GET_AVERAGE: {
      return {
        ...state,
        average: action.payload,
      };
    }
    
    case GET_AVERAGE_BY_PRIORITY: {
      return {
        ...state,
        averagesByPriority: {
          ...state.averagesByPriority,
          ...action.payload,
        },
      };
    }

    case SAVE_TASK: {
      const updatedTask = action.payload;
      return {
        ...state,
        tasks: state.tasks.some((task) => task.id === updatedTask.id)
          ? state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
          : [...state.tasks, updatedTask],
      };
    }

    case DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    }

    case TOGGLE_TASK_COMPLETION: {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, completed: action.payload.completed } : task
        ),
      };
    }

    default:
      return state;
  }
};

export default taskReducer;
