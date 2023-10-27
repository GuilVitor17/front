import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, Link, Alert, AlertTitle } from '@mui/material';
import '../login/login-modules.css'; // Importe o arquivo CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function EnvioEmailForm() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [response, setResponse] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [error, setError] = useState(null);


    const handleLogin = () => {
        // Aqui você pode implementar a lógica de autenticação com o email e senha inseridos.
        console.log('Email:', email);
    };

    const handleFormEmail = async (e) => {

        e.preventDefault(); // Corrigido o erro de digitação

        try {
            const response = await axios.post(`${process.env.REACT_APP_URL_API}/token-password`, {

                email: email,

            });

            // Você pode manipular a resposta da API aqui
            console.log('Resposta da API:', response.data);
            setResponse(response.data.message); // Define a resposta no estado, se necessário
            if (response.status === 200) {
                setShowAlert(true);
            }
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            navigate('/newpassword')
        } catch (error) {
            console.error('Erro na solicitação:', error);

            // Define o erro no estado
            setError(error);

            // Exibe o alerta de erro
            setShowErrorAlert(true);
            setTimeout(() => {
                setShowErrorAlert(false);
            }, 3000);

        }
    };



    return (
        <div className='container'>

            <Container maxWidth="xs">
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => {
                            navigate('/')

                        }}
                    >
                    </Button>
                    <Typography variant="h6" align="center">
                        Enviar Token Para Editar Senha
                    </Typography>
                    <form onSubmit={handleFormEmail}>
                        <TextField
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleLogin}
                            style={{ marginTop: '20px' }}
                            type='submit'
                        >
                            Enviar
                        </Button>
                    </form>

                    {/* Exibe o alerta se showAlert for verdadeiro */}
                    <br />
                    {showAlert && (
                        <Alert severity="success">
                            Sua solicitação foi bem-sucedida!
                        </Alert>
                    )}
                    {/* Exibe o alerta de erro se showErrorAlert for verdadeiro */}
                    {showErrorAlert && (
                        <Alert severity="error">
                            <AlertTitle></AlertTitle>
                            E-mail Obrigatorio!
                        </Alert>
                    )}


                </Paper>
            </Container>
        </div>

    );
}

export default EnvioEmailForm;
