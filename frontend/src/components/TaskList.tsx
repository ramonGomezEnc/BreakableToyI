import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { TableSortLabel } from '@mui/material';

import { Task } from '../constants/taskConstants';

interface TaskListProps {
  tasks: Task[];
  onToggleCompletion: (taskId: number) => void;
  onEditTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
  onSort: (field: 'priority' | 'dueDate', direction: 'asc' | 'desc') => void;
  sortField: 'priority' | 'dueDate' | undefined;
  sortDirection: 'asc' | 'desc' | undefined;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleCompletion,
  onEditTask,
  onDeleteTask,
  onSort,
  sortField,
  sortDirection,
}) => {

  const handleSort = (field: 'priority' | 'dueDate') => {
    const isAsc = sortField === field && sortDirection === 'asc';
    onSort(field, isAsc ? 'desc' : 'asc');
  };

  const handleToggleAll = () => {
    const allCompleted = tasks.every((task) => task.completed);
    tasks.forEach((task) => {
      if (task.completed !== !allCompleted) {
        onToggleCompletion(task.id);
      }
    });
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              indeterminate={
                tasks.some((task) => task.completed) &&
                !tasks.every((task) => task.completed)
              }
              checked={tasks.every((task) => task.completed)}
              onChange={() => handleToggleAll()}
            />
          </TableCell>
          <TableCell>Name</TableCell>
          <TableCell>
            <TableSortLabel
              active={sortField === 'priority'}
              direction={sortField === 'priority' ? sortDirection : 'asc'}
              onClick={() => handleSort('priority')}
            >
              Priority
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortField === 'dueDate'}
              direction={sortField === 'dueDate' ? sortDirection : 'asc'}
              onClick={() => handleSort('dueDate')}
            >
              Due Date
            </TableSortLabel>
          </TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map(({ id, completed, name, priority, dueDate }) => (
          <TableRow
              key={id}
              style={{
                backgroundColor:
                  !dueDate
                    ? 'inherit'
                    : new Date(dueDate).getTime() - Date.now() < 1000 * 60 * 60 * 24 * 7
                    ? '#ffd3d3'
                    : new Date(dueDate).getTime() - Date.now() < 1000 * 60 * 60 * 24 * 14
                    ? '#fff4d3'
                    : '#d3ffd3', 
              }}
            >
            <TableCell>
              <Checkbox
                checked={completed}
                onChange={() => onToggleCompletion(id)}
              />
            </TableCell>
            {completed ?
            <TableCell><s>{name}</s></TableCell> :
            <TableCell>{name}</TableCell>
            }
            <TableCell>{priority}</TableCell>
            <TableCell>
              {dueDate ? new Date(dueDate).toISOString().substring(0, 10) : '-'}
            </TableCell>
            <TableCell>
              <IconButton
                color="primary"
                onClick={() => onEditTask(id)}
                aria-label="Edit Task"
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => onDeleteTask(id)}
                aria-label="Delete Task"
              >
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskList;
