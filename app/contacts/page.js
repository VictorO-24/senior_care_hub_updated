"use client";

import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, IconButton, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

// API functions
const fetchContacts = async () => {
  const response = await fetch('/api/contacts');
  return await response.json();
};

const addContact = async (contact) => {
  await fetch('/api/contacts/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });
};

const updateContact = async (id, updatedContact) => {
  await fetch(`/api/contacts/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedContact),
  });
};

const deleteContact = async (id) => {
  await fetch(`/api/contacts/delete/${id}`, {
    method: 'DELETE',
  });
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' });
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchContacts();
      setContacts(data);
    };
    loadData();
  }, []);

  const handleAdd = async () => {
    await addContact(newContact);
    setNewContact({ name: '', phone: '', email: '' });
    setOpen(false);
    const data = await fetchContacts();
    setContacts(data);
  };

  const handleUpdate = async () => {
    await updateContact(currentContact.id, currentContact);
    setCurrentContact(null);
    setOpen(false);
    const data = await fetchContacts();
    setContacts(data);
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    const data = await fetchContacts();
    setContacts(data);
  };

  const handleOpen = (contact = null) => {
    setCurrentContact(contact);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentContact(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Emergency Contacts
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Contact List</Typography>
            <Box>
              <IconButton color="primary" onClick={() => handleOpen()}>
                <AddIcon />
              </IconButton>
              <Button variant="outlined" sx={{ marginBottom: 2 }} onClick={() => router.push('/dashboard')}>Dashboard</Button>
              <Button variant="outlined" sx={{ marginBottom: 2 }} onClick={() => router.push('/')}>Homepage</Button>
            </Box>
          </Box>
          <List>
            {contacts.map((contact) => (
              <ListItem
                key={contact.id}
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => handleOpen(contact)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDelete(contact.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={contact.name}
                  secondary={`Phone: ${contact.phone} - Email: ${contact.email}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentContact ? 'Edit Contact' : 'Add Contact'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={currentContact ? currentContact.name : newContact.name}
            onChange={(e) => (currentContact ? setCurrentContact({ ...currentContact, name: e.target.value }) : setNewContact({ ...newContact, name: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            variant="outlined"
            value={currentContact ? currentContact.phone : newContact.phone}
            onChange={(e) => (currentContact ? setCurrentContact({ ...currentContact, phone: e.target.value }) : setNewContact({ ...newContact, phone: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            value={currentContact ? currentContact.email : newContact.email}
            onChange={(e) => (currentContact ? setCurrentContact({ ...currentContact, email: e.target.value }) : setNewContact({ ...newContact, email: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={currentContact ? handleUpdate : handleAdd}>
            {currentContact ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
