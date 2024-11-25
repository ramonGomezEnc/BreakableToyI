import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button } from '@mui/material';

interface Task {
  id: number;
  name: string;
  priority: string;
  dueDate: string;
  done: boolean;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
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
              <Button size="small" color="primary">
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
