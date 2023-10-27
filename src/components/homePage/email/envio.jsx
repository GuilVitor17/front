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
  Alert,
  AlertTitle
} from '@mui/material';
import axios from 'axios';
import Navbar from '../../homePage/navbar/navbar'
import { useNavigate } from 'react-router-dom';

function EmailForm() {
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMessage] = useState('');
  const token = localStorage.getItem('token')
  const id = localStorage.getItem('id')
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [error, setError] = useState(null);

  const handleChange1 = (e) => {
    setEmail(e.target.value)
  };

  const handleChange2 = (e) => {
    setAssunto(e.target.value)
  };

  const handleChange3 = (e) => {
    setMessage(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faça a chamada da API para enviar dados de texto
      const response = await axios.post(`${process.env.REACT_APP_URL_API}/enviar-email`, {
        destinatario: email,
        assunto: assunto,
        corpo: mensagem,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      }
      );
      // Manipule a resposta da API conforme necessário
      console.log(response)
      if (response.status === 200) {
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 3000);

      }

    } catch (error) {
      console.error('Erro ao enviar os dados de texto:', error);
      // Trate erros de forma apropriada.
      setError(error);

      // Exibe o alerta de erro
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
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
              label="Digite o E-mail"
              fullWidth
              variant="outlined"
              margin="normal"
              name="name"
              value={email}
              onChange={handleChange1}
              required
            />
            <TextField
              label="Assunto do Envio"
              fullWidth
              variant="outlined"
              margin="normal"
              name="assunto"
              type="text"
              value={assunto}
              onChange={handleChange2}
              required
            />
            <TextField
              label="Envie a Mensagem para o E-mail"
              fullWidth
              variant="outlined"
              margin="normal"
              name="message"
              type="text"
              value={mensagem}
              onChange={handleChange3}
              required
            />
            {showAlert && (
              <Alert severity="success">
                Sua solicitação foi bem-sucedida!
              </Alert>
            )}
            {/* Exibe o alerta de erro se showErrorAlert for verdadeiro */}
            {showErrorAlert && (
              <Alert severity="error">
                <AlertTitle></AlertTitle>
                Ocorreu um erro. Dados incorretos.
              </Alert>
            )}
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
        {/* Exibe o alerta se showAlert for verdadeiro */}
        <br />

      </Container>
    </>
  );
}

export default EmailForm;
