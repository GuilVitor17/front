import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Navbar from '../../navbar/navbar';
import { Link } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL_API}/listitem`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });

        setTasks(response.data.item); // Define as tarefas com os dados da API
        console.log(response.data)
      } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
        // Trate erros de forma apropriada.
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL_API}/item/${taskId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Remove a tarefa da lista local
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      }
    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
      // Trate erros de forma apropriada.
    }
  };

  return (
    <>
      <Navbar />
     <Link to={`/homepages/${id}/task`}><Button variant="contained" style={{margin:'10px'}} color="primary">
      Cria Tarefa
    </Button></Link>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h5" align="center">
            Lista de Tarefas 
          </Typography>
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id} style={{margin:'10px', border:'1px solid #333'}}>
                <ListItemText primary={task.name} secondary={task.description} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

        </Paper>
      </Container>
    </>
  );
}

export default TaskList;
