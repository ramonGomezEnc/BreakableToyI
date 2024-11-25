import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from '@mui/material';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreateTask: (task: { name: string; priority: string; dueDate: string }) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, onCreateTask }) => {
  const [newTask, setNewTask] = useState({
    name: '',
    priority: 'Low',
    dueDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleCreateTask = () => {
    onCreateTask(newTask);
    setNewTask({ name: '', priority: 'Low', dueDate: '' }); // Reset form
    onClose(); // Close modal
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Task Name"
          name="name"
          value={newTask.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Priority"
          name="priority"
          value={newTask.priority}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          value={newTask.dueDate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCreateTask} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
