"use client";

import React, { useEffect, useState } from "react";
import {  Box, Card, CardContent, Typography, Button, Grid, IconButton, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useRouter } from "next/navigation"; // Updated import for useRouter

// Example static data for graphs
const exampleGraphData = [
  { name: "Week 1", appointments: 3, tasks: 4, medications: 7, caregiverTasks: 3},
  { name: "Week 2", appointments: 2, tasks: 3, medications: 7, caregiverTasks: 4},
  { name: "Week 3", appointments: 4, tasks: 5, medications: 7, caregiverTasks: 5 },
  { name: "Week 4", appointments: 1, tasks: 2, medications: 6, caregiverTasks: 6 },
];

// Week-on-week improvement data
const weekOnWeekData = [
    { name: "Week 1", appointments: 10, tasks: 5, medications: 15, caregiverTasks: 10 },
    { name: "Week 2", appointments: 20, tasks: 10, medications: 20, caregiverTasks: 15 },
    { name: "Week 3", appointments: 15, tasks: 20, medications: 25, caregiverTasks: 20 },
    { name: "Week 4", appointments: 25, tasks: 15, medications: 10, caregiverTasks: 25 },
];

// Static data for testing
const staticAppointments = [
  { date: "2024-09-10", time: "10:00 AM", description: "Doctor Appointment" },
  { date: "2024-09-12", time: "2:00 PM", description: "Physical Therapy" },
];
const staticMedications = [
  { name: "Blood Pressure Medication", time: "8:00 AM" },
  { name: "Diabetes Medication", time: "8:00 PM" },
];
const staticTasks = [
  { task: "Grocery Shopping", dueDate: "2024-09-08" },
  { task: "House Cleaning", dueDate: "2024-09-09" },
];
const staticCaregiverTasks = [
    { task: "Medication Reminder", dueDate: "2024-09-08" },
    { task: "Check on Patient", dueDate: "2024-09-09" },
  ];
const staticContacts = [
  { name: "John Doe", relationship: "Family Member", phone: "123-456-7890" },
  { name: "Jane Smith", relationship: "Caregiver", phone: "987-654-3210" },
];

// Data fetching simulation
const fetchAppointments = async () => {
  const response = await fetch('/api/appointments');
  const data = await response.json();
  return data;
};

const fetchMedications = async () => {
  const response = await fetch('/api/medications');
  const data = await response.json();
  return data;
};

const fetchTasks = async () => {
  const response = await fetch('/api/tasks');
  const data = await response.json();
  return data;
};

const fetchCaregiverTasks = async () => {
  const response = await fetch('/api/caregiver-tasks');
  const data = await response.json();
  return data;
};

export default function DashboardPage() {
  const router = useRouter(); // Initialize useRouter
  const [appointments, setAppointments] = useState([]);
  const [medications, setMedications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [caregiverTasks, setCaregiverTasks] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setAppointments(await fetchAppointments());
      setMedications(await fetchMedications());
      setTasks(await fetchTasks());
      setCaregiverTasks(await fetchCaregiverTasks());
      setContacts(await fetchContacts());
    };
    loadData();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Button
        variant="outlined"
        sx={{ marginBottom: 2 }}
        onClick={() => router.push("/")}
      >
        Return to Homepage
      </Button>

      <Grid container spacing={3}>
        {/* Appointments Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <CardContent>
              <Typography variant="h6">Appointments</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: 200,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        overflow: 'hidden',
                        marginBottom: 2,
                        backgroundColor: '#f0f4f8'
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={exampleGraphData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="appointments" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: 200,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        overflow: 'hidden',
                        marginBottom: 2,
                        backgroundColor: '#f0f4f8'
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weekOnWeekData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="appointments" stroke="#8884d8" />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ maxHeight: 150, overflowY: 'auto' }}>
                <Button  variant="outlined"  sx={{ marginBottom: 2 }}  onClick={() => router.push('/appointments')}>Review</Button>
                  {appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                      <Box key={index} sx={{ marginBottom: 1 }}>
                        <Typography variant="body1">{`${appointment.date} at ${appointment.time}`}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {appointment.description}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">No appointments available</Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Medications Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <CardContent>
              <Typography variant="h6">Medications</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: 200,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        overflow: 'hidden',
                        marginBottom: 2,
                        backgroundColor: '#f0f4f8'
                      }}
                    >
                      
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weekOnWeekData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="medications" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: 200,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        overflow: 'hidden',
                        marginBottom: 2,
                        backgroundColor: '#f0f4f8'
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={exampleGraphData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="medications" stroke="#82ca9d" />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ maxHeight: 150, overflowY: 'auto' }}>
                <Button  variant="outlined"  sx={{ marginBottom: 2 }}  onClick={() => router.push('/appointments')}>Review</Button>
                  {medications.length > 0 ? (
                    medications.map((medication, index) => (
                      <Box key={index} sx={{ marginBottom: 1 }}>
                        <Typography variant="body1">{medication.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {`Take at ${medication.time}`}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">No medications available</Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Tasks Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <CardContent>
              <Typography variant="h6">Tasks</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: 200,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        overflow: 'hidden',
                        marginBottom: 2,
                        backgroundColor: '#f0f4f8'
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={exampleGraphData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="tasks" fill="#ffc658" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: 200,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        overflow: 'hidden',
                        marginBottom: 2,
                        backgroundColor: '#f0f4f8'
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weekOnWeekData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="tasks" stroke="#ffc658" />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ maxHeight: 150, overflowY: 'auto' }}>
                <Button  variant="outlined"  sx={{ marginBottom: 2 }}  onClick={() => router.push('/appointments')}>Review</Button>
                  {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                      <Box key={index} sx={{ marginBottom: 1 }}>
                        <Typography variant="body1">{task.task}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {`Due by ${task.dueDate}`}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">No tasks available</Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

{/* Caregiver Tasks Section */}
<Grid item xs={12} md={6}>
          <Card sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <CardContent>
              <Typography variant="h6">Caregiver Tasks</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: 200,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        overflow: 'hidden',
                        marginBottom: 2,
                        backgroundColor: '#f0f4f8'
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={exampleGraphData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="caregiverTasks" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: 200,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        overflow: 'hidden',
                        marginBottom: 2,
                        backgroundColor: '#f0f4f8'
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weekOnWeekData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="caregiverTasks" stroke="#8884d8" />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ maxHeight: 150, overflowY: 'auto' }}>
                <Button  variant="outlined"  sx={{ marginBottom: 2 }}  onClick={() => router.push('/appointments')}>Review</Button>
                  {caregiverTasks.length > 0 ? (
                    caregiverTasks.map((task, index) => (
                      <Box key={index} sx={{ marginBottom: 1 }}>
                        <Typography variant="body1">{task.task}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {`Due: ${task.dueDate}`}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">No caregiver tasks available</Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contacts Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <CardContent>
              <Typography variant="h6">Emergency Contacts</Typography>
              <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
              <Button  variant="outlined"  sx={{ marginBottom: 2 }}  onClick={() => router.push('/contacts')}>Review</Button>
                {contacts.length > 0 ? (
                  contacts.map((contact, index) => (
                    <Box key={index} sx={{ marginBottom: 1 }}>
                      <Typography variant="body1">{contact.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {`${contact.relationship} - ${contact.phone}`}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">No contacts available</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
