import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
} from '@mui/material';
import { Task } from '../constants/taskConstants';

interface TaskModalProps {
  open: boolean;
  modalType: "create" | "edit";
  onClose: () => void;
  onSave: (task: Task) => void;
  taskToEdit: Task | undefined;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, modalType, onClose, onSave, taskToEdit }) => {
  const [task, setTask] = useState<Task>({
    id: 0,
    name: '',
    priority: 'Low',
    createdAt: new Date(),
    completedAt: new Date(),
    dueDate: new Date(),
    completed: false,
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask({
        id: 0,
        name: '',
        priority: 'Low',
        createdAt: new Date(),
        completedAt: new Date(),
        dueDate: new Date(),
        completed: false,
      });
    }
  }, [taskToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: name === 'dueDate' ? new Date(value) : value,
    }));
  };

  const validateTask = (): boolean => {
    if (task.name.length > 120) {
      alert('The task name cannot exceed 120 characters.');
      return false;
    }

    if (task.dueDate && new Date(task.dueDate) < new Date(task.createdAt)) {
      alert('The due date cannot be earlier than the created date.');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateTask()) {
      onSave(task);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{modalType === 'edit' ? 'Edit Task' : 'Create New Task'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Task Name"
          name="name"
          value={task.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Priority"
          name="priority"
          value={task.priority}
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
        value={
          task.dueDate && !isNaN(new Date(task.dueDate).getTime())
            ? new Date(task.dueDate).toISOString().substring(0, 10)
            : ''
        }
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="warning">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          {modalType === 'edit' ? 'Save Changes' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;