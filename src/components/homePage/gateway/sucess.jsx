import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, Container } from '@mui/material';


const Sucesso = () => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');


  const urlParams = new URLSearchParams(window.location.search);
  const paymentId = urlParams.get('paymentId');
  const payerId = urlParams.get('PayerID');
  

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL_API}/sucesso/${paymentId}/${payerId}`, {
          headers: {
            'Authorization': `${token}`, // Substitua com o seu token de autenticação, se necessário
          },
        });
      
        if (response.status === 200) {
          const data = response.data;
          setTimeout(() =>{
            navigate(`/homepages/${id}`)
          }, 3000);
        } else {
          console.error('Erro na solicitação:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao fazer a solicitação:', error);
      }
      
    };

    fetchData();
  }, [token, id, navigate]);

  return (
    <div className='container'> 
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', color:'green' }}>
        <Typography variant="h6">Comprado com Sucesso!</Typography>
      </Paper>
    </Container>
    </div>
  );
};

export default Sucesso;
