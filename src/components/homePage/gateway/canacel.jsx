import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, Container } from '@mui/material';

const Cancel = () => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {

    setTimeout(() =>{
    navigate(`/homepages/${id}`)
    }, 3000);
    
  }, []);

  return (
    <div className='container'> 
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', color:'red' }}>
        <Typography variant="h6">Compra Cancelada!</Typography>
      </Paper>
    </Container>
    </div>
  );
};

export default Cancel;
