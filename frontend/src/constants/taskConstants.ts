import { AnyAction } from '@reduxjs/toolkit';

export const SET_TASKS = 'SET_TASKS';
export const SAVE_TASK = 'SAVE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_TASK_COMPLETION = 'TOGGLE_TASK_COMPLETION';
export const GET_AVERAGE = 'GET_AVERAGE';
export const GET_AVERAGE_BY_PRIORITY = 'GET_AVERAGE_BY_PRIORITY';

export interface Task {
  id: number;
  name: string;
  priority: 'Low' | 'Medium' | 'High';
  createdAt: Date;
  completedAt: Date | null;
  dueDate: Date | null;
  completed: boolean;
}

export interface SetTasksAction extends AnyAction {
  type: typeof SET_TASKS;
  payload: {
    tasks: Task[];
    totalSize: number;
  };
}

export interface SaveTaskAction extends AnyAction {
  type: typeof SAVE_TASK;
  payload: Task;
}

export interface DeleteTaskAction extends AnyAction {
  type: typeof DELETE_TASK;
  payload: number;
}

export interface ToggleTaskCompletionAction extends AnyAction {
  type: typeof TOGGLE_TASK_COMPLETION;
  payload: number;
}

export interface GetAverageAction extends AnyAction {
  type: typeof GET_AVERAGE;
}

export interface GetAverageByPriorityAction extends AnyAction {
  type: typeof GET_AVERAGE_BY_PRIORITY;
}

export type TaskAction =
  | SetTasksAction
  | SaveTaskAction
  | DeleteTaskAction
  | ToggleTaskCompletionAction
  | GetAverageAction
  | GetAverageByPriorityAction
