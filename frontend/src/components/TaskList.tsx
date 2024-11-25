import React from 'react';
import { Card, CardContent, Typography, Box, Checkbox, Button, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';

const tasks = [
  { id: 1, name: 'Task 1', priority: 'Low', dueDate: '-', done: true },
  { id: 2, name: 'Task 2', priority: 'High', dueDate: '2022/02/02', done: false },
  { id: 3, name: 'Task 3', priority: 'Medium', dueDate: '2023/02/02', done: false },
];

const TaskTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    text-align: left;
  }

  th {
    background: #f0f0f0;
  }

  td {
    border-bottom: 1px solid #ddd;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const TaskCard = styled(Card)`
  margin-bottom: 10px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const TaskList: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      {/* Table View for Desktop */}
      {!isMobile && (
        <TaskTable>
          <thead>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <Checkbox defaultChecked={task.done} />
                </td>
                <td>{task.name}</td>
                <td>{task.priority}</td>
                <td>{task.dueDate}</td>
                <td>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button size="small" color="error">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </TaskTable>
      )}

      {/* Card View for Mobile */}
      {isMobile &&
        tasks.map((task) => (
          <TaskCard key={task.id}>
            <CardContent>
              <Typography variant="h6">{task.name}</Typography>
              <Typography>Priority: {task.priority}</Typography>
              <Typography>Due Date: {task.dueDate}</Typography>
              <Box mt={2}>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="error">
                  Delete
                </Button>
              </Box>
            </CardContent>
          </TaskCard>
        ))}
    </div>
  );
};

export default TaskList;
