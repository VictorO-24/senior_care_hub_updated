"use client";

import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, IconButton, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

// Placeholder functions for API calls
const fetchAppointments = async () => {
  const response = await fetch('/api/appointments');
  return await response.json();
};


const addAppointment = async (appointment) => {
  await fetch('/api/appointments/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(appointment),
  });
};


const updateAppointment = async (id, updatedAppointment) => {
  await fetch(`/api/appointments/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedAppointment),
  });
};


const deleteAppointment = async (id) => {
  await fetch(`/api/appointments/delete/${id}`, {
    method: 'DELETE',
  });
};


export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({ title: '', date: '', time: '' });
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAppointments();
      setAppointments(data);
    };
    loadData();
  }, []);

  const handleAdd = async () => {
    await addAppointment(newAppointment);
    setNewAppointment({ title: '', date: '', time: '' });
    setOpen(false);
    const data = await fetchAppointments();
    setAppointments(data);
  };

  const handleUpdate = async () => {
    await updateAppointment(currentAppointment.id, currentAppointment);
    setCurrentAppointment(null);
    setOpen(false);
    const data = await fetchAppointments();
    setAppointments(data);
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    const data = await fetchAppointments();
    setAppointments(data);
  };

  const handleOpen = (appointment = null) => {
    setCurrentAppointment(appointment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentAppointment(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Upcoming Appointments</Typography>
            <Box>
              <IconButton color="primary" onClick={() => handleOpen()}>
                <AddIcon />
              </IconButton>
              <Button  variant="outlined"  sx={{ marginBottom: 2 }}  onClick={() => router.push('/dashboard')}>Dashboard</Button>
              <Button  variant="outlined"  sx={{ marginBottom: 2 }}  onClick={() => router.push('/')}>Homepage</Button>
            </Box>
          </Box>
          <List>
            {appointments.map((appointment) => (
              <ListItem key={appointment.id} secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => handleOpen(appointment)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(appointment.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }>
                <ListItemText
                  primary={appointment.title}
                  secondary={`Date: ${appointment.date} - Time: ${appointment.time}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentAppointment ? 'Edit Appointment' : 'Add Appointment'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={currentAppointment ? currentAppointment.title : newAppointment.title}
            onChange={(e) => (currentAppointment ? setCurrentAppointment({ ...currentAppointment, title: e.target.value }) : setNewAppointment({ ...newAppointment, title: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Date"
            fullWidth
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentAppointment ? currentAppointment.date : newAppointment.date}
            onChange={(e) => (currentAppointment ? setCurrentAppointment({ ...currentAppointment, date: e.target.value }) : setNewAppointment({ ...newAppointment, date: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Time"
            fullWidth
            variant="outlined"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={currentAppointment ? currentAppointment.time : newAppointment.time}
            onChange={(e) => (currentAppointment ? setCurrentAppointment({ ...currentAppointment, time: e.target.value }) : setNewAppointment({ ...newAppointment, time: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={currentAppointment ? handleUpdate : handleAdd}>
            {currentAppointment ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
