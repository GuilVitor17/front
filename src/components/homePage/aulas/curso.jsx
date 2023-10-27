import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
  Container,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CursoPanel = () => {
  const token = localStorage.getItem('token');
  const [paymentUrl, setPaymentUrl] = useState('');
  const id = localStorage.getItem('id');
  const navigate = useNavigate();

  const iniciarPagamento = async () => {
    try {
      const url = `${process.env.REACT_APP_URL_API}/iniciar-pagamento`;
      console.log('URL da solicitação:', url); // Adicione esta linha para verificar a URL
  
      const response = await axios.get(url, {
        headers: {
          'Authorization': `${token}`,
        },
      });
  
      if (response.status === 200) {
        const data = response.data;
        window.location.href = data.approval_url; // Redireciona o usuário para o PayPal
      } else {
        console.error('Erro ao iniciar pagamento:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao iniciar pagamentos:', error);
    }
  };
  
  

    const fetchData = async () => {

      try {
        const response = await axios.get(`${process.env.REACT_APP_URL_API}/aulastrue`, {
          headers: {
            'Authorization': `${token}`, // Substitua com o seu token de autenticação, se necessário
          },
        });

        if (response.data.length === 0) {
          // Redireciona para a rota se aprovado
          iniciarPagamento();
        } else {
          // Redireciona para outra rota se não aprovado
          navigate(`/homepages/${id}/aulas`);
        }
        console.log(response.data)
        

        if (response.status === 200) {
          const data = response.data;
          // Faça algo com os dados da resposta
          console.log(data)
        } else {
          console.error('Erro na solicitação:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao fazer a solicitação:', error);
      }

    };

 
  

  return (
    <>
    <div className='container'>  

      <Container
        maxWidth="md"
        style={{
          width: '400px',
          height: '400px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} style={{ padding: '10px', backgroundColor: '#f2f2f2' }}>
          {/* Resto do seu código aqui */}
          <img
            src={`https://hermes.dio.me/articles/cover/b27a1cd9-bf11-43a2-ba81-2c74098e30ee.png`}
            alt="Curso de React"
            style={{ width: '100%', height: 'auto' }}
          />

          <Divider />
          <Typography variant="h6" gutterBottom>
            Descrição do Curso
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="Módulo 1: Introdução ao React" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="Módulo 2: Componentes e Props" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="Módulo 3: Estado e Ciclo de Vida" />
            </ListItem>
          </List>
          <Divider />
          <Typography variant="h6" gutterBottom>
            Preço:
            <span style={{ textDecoration: 'line-through', marginLeft: '10px' }}>
              $199
            </span>
            <span style={{ color: 'red', marginLeft: '10px' }}>$10 (Promoção)</span>
          </Typography>
          {paymentUrl ? (
            <div>
              <Button variant="contained" color="primary" onClick={iniciarPagamento}>
              <ShoppingCart />
            </Button>
            </div>
          ) : (
            <Button variant="contained" color="primary" onClick={fetchData}>
              <ShoppingCart />
            </Button>
          )}
        </Paper>
      </Container>
      </div>
    </>
  );
};

export default CursoPanel;
