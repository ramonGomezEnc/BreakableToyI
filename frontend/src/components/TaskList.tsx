import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button } from '@mui/material';
import { Task } from './TaskModal';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Select</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Priority</TableCell>
          <TableCell>Due Date</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>
              <Checkbox defaultChecked={task.done} />
            </TableCell>
            <TableCell>{task.name}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>{task.dueDate}</TableCell>
            <TableCell>
              <Button size="small" color="primary" onClick={() => onEditTask(task)}>
                Edit
              </Button>
              <Button size="small" color="error">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskList;
