import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import Navbar from '../../homePage/navbar/navbar' 
import { useNavigate } from 'react-router-dom';

function TaskForm() {
  const [name, setName] = useState('');
  const [descrption, setDescription] = useState('');
  const token = localStorage.getItem('token')
  const id = localStorage.getItem('id')
  const navigate = useNavigate()

  const handleChange1 = (e) => {
    setName(e.target.value)
  };

  const handleChange2 = (e) => {
    setDescription(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Faça a chamada da API para enviar dados de texto
        const response = await axios.post(`${process.env.REACT_APP_URL_API}/item`,{ 
            name:name,
            description:descrption
        },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            }
        );
        // Manipule a resposta da API conforme necessário
        console.log(response)
        navigate(`/homepages/${id}/listtask`)

    } catch (error) {
        console.error('Erro ao enviar os dados de texto:', error);
        // Trate erros de forma apropriada.
    }


  };

  return (
    <> 
    <Navbar />
    
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" align="center">
          Adicionar Tarefa
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Titulo da Tarefa"
            fullWidth
            variant="outlined"
            margin="normal"
            name="name"
            value={name}
            onChange={handleChange1}
            required
          />
          <TextField
            label="Descrição da Tarefa"
            fullWidth
            variant="outlined"
            margin="normal"
            name="description"
            type="text"
            value={descrption}
            onChange={handleChange2}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
            type="submit"
          >
            Enviar
          </Button>
        </form>
      </Paper>
    </Container>
    </>
  );
}

export default TaskForm;
