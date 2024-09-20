"use client";

import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, IconButton, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

// Placeholder functions for API calls
const fetchCaregiverTasks = async () => {
  const response = await fetch('/api/caregiver-tasks');
  return await response.json();
};

const addCaregiverTask = async (task) => {
  await fetch('/api/caregiver-tasks/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
};

const updateCaregiverTask = async (id, updatedTask) => {
  await fetch(`/api/caregiver-tasks/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  });
};

const deleteCaregiverTask = async (id) => {
  await fetch(`/api/caregiver-tasks/delete/${id}`, {
    method: 'DELETE',
  });
};


export default function CaregiverTasksPage() {
  const [caregiverTasks, setCaregiverTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({ name: '', task: '', date: '' });
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCaregiverTasks();
      setCaregiverTasks(data);
    };
    loadData();
  }, []);

  const handleAdd = async () => {
    await addCaregiverTask(newTask);
    setNewTask({ name: '', task: '', date: '' });
    setOpen(false);
    const data = await fetchCaregiverTasks();
    setCaregiverTasks(data);
  };

  const handleUpdate = async () => {
    await updateCaregiverTask(currentTask.id, currentTask);
    setCurrentTask(null);
    setOpen(false);
    const data = await fetchCaregiverTasks();
    setCaregiverTasks(data);
  };

  const handleDelete = async (id) => {
    await deleteCaregiverTask(id);
    const data = await fetchCaregiverTasks();
    setCaregiverTasks(data);
  };

  const handleOpen = (task = null) => {
    setCurrentTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTask(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
      Caregiver Tasks
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Caregiver Tasks</Typography>
            <Box>
              <IconButton color="primary" onClick={() => handleOpen()}>
                <AddIcon />
              </IconButton>
              <Button  variant="outlined"  sx={{ marginBottom: 2 }}  onClick={() => router.push('/dashboard')}>Dashboard</Button>
              <Button  variant="outlined"  sx={{ marginBottom: 2 }}  onClick={() => router.push('/')}>Homepage</Button>
            </Box>
          </Box>
          <List>
            {caregiverTasks.map((task) => (
              <ListItem key={task.id} secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => handleOpen(task)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }>
                <ListItemText
                  primary={`Caregiver: ${task.name}`}
                  secondary={`Task: ${task.task} - Date: ${task.date}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentTask ? 'Edit Caregiver Task' : 'Add Caregiver Task'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Caregiver Name"
            fullWidth
            variant="outlined"
            value={currentTask ? currentTask.name : newTask.name}
            onChange={(e) => (currentTask ? setCurrentTask({ ...currentTask, name: e.target.value }) : setNewTask({ ...newTask, name: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Task"
            fullWidth
            variant="outlined"
            value={currentTask ? currentTask.task : newTask.task}
            onChange={(e) => (currentTask ? setCurrentTask({ ...currentTask, task: e.target.value }) : setNewTask({ ...newTask, task: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Date"
            fullWidth
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentTask ? currentTask.date : newTask.date}
            onChange={(e) => (currentTask ? setCurrentTask({ ...currentTask, date: e.target.value }) : setNewTask({ ...newTask, date: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={currentTask ? handleUpdate : handleAdd}>
            {currentTask ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
