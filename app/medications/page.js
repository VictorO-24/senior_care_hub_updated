"use client";

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

// Updated functions for API calls
const fetchMedications = async () => {
  const response = await fetch('/api/medications');
  return await response.json();
};

const addMedication = async (medication) => {
  await fetch('/api/medications/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(medication),
  });
};

const updateMedication = async (id, updatedMedication) => {
  await fetch(`/api/medications/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedMedication),
  });
};

const deleteMedication = async (id) => {
  await fetch(`/api/medications/delete/${id}`, {
    method: 'DELETE',
  });
};

export default function MedicationsPage() {
  const [medications, setMedications] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(null);
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '' });
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMedications();
      setMedications(data);
    };
    loadData();
  }, []);

  const handleAdd = async () => {
    await addMedication(newMedication);
    setNewMedication({ name: '', dosage: '', frequency: '' });
    setOpen(false);
    const data = await fetchMedications();
    setMedications(data);
  };

  const handleUpdate = async () => {
    await updateMedication(currentMedication.id, currentMedication);
    setCurrentMedication(null);
    setOpen(false);
    const data = await fetchMedications();
    setMedications(data);
  };

  const handleDelete = async (id) => {
    await deleteMedication(id);
    const data = await fetchMedications();
    setMedications(data);
  };

  const handleOpen = (medication = null) => {
    setCurrentMedication(medication);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentMedication(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Medication Reminders
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Medications</Typography>
            <Box>
              <IconButton color="primary" onClick={() => handleOpen()}>
                <AddIcon />
              </IconButton>
              <Button variant="outlined" sx={{ marginBottom: 2 }} onClick={() => router.push('/dashboard')}>Dashboard</Button>
              <Button variant="outlined" sx={{ marginBottom: 2 }} onClick={() => router.push('/')}>Homepage</Button>
            </Box>
          </Box>
          <List>
            {medications.map((medication) => (
              <ListItem key={medication.id} secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => handleOpen(medication)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(medication.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }>
                <ListItemText
                  primary={`${medication.name} - ${medication.dosage}`}
                  secondary={`Frequency: ${medication.frequency}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentMedication ? 'Edit Medication' : 'Add Medication'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Medication Name"
            fullWidth
            variant="outlined"
            value={currentMedication ? currentMedication.name : newMedication.name}
            onChange={(e) => (currentMedication ? setCurrentMedication({ ...currentMedication, name: e.target.value }) : setNewMedication({ ...newMedication, name: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Dosage"
            fullWidth
            variant="outlined"
            value={currentMedication ? currentMedication.dosage : newMedication.dosage}
            onChange={(e) => (currentMedication ? setCurrentMedication({ ...currentMedication, dosage: e.target.value }) : setNewMedication({ ...newMedication, dosage: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Frequency"
            fullWidth
            variant="outlined"
            value={currentMedication ? currentMedication.frequency : newMedication.frequency}
            onChange={(e) => (currentMedication ? setCurrentMedication({ ...currentMedication, frequency: e.target.value }) : setNewMedication({ ...newMedication, frequency: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={currentMedication ? handleUpdate : handleAdd}>
            {currentMedication ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
