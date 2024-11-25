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

export interface Task {
  id?: number;
  name: string;
  priority: string;
  dueDate: string;
  done?: boolean;
}

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  taskToEdit?: Task; 
}

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, onSave, taskToEdit }) => {
  const [task, setTask] = useState<Task>({
    name: '',
    priority: 'Low',
    dueDate: '',
    done: false,
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask({ name: '', priority: 'Low', dueDate: '', done: false });
    }
  }, [taskToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSave = () => {
    onSave(task);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{taskToEdit ? 'Edit Task' : 'Create New Task'}</DialogTitle>
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
          value={task.dueDate}
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
        <Button onClick={handleSave} color="primary">
          {taskToEdit ? 'Save Changes' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;