import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, Link, Alert, AlertTitle } from '@mui/material';
import '../login/login-modules.css'; // Importe o arquivo CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function CreateForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [response, setResponse] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        // Aqui você pode implementar a lógica de autenticação com o email e senha inseridos.
        console.log('Email:', email);
        console.log('Senha:', password);
        console.log('name:', username);
    };

    const handleFormLogin = async (e) => {

        e.preventDefault(); // Corrigido o erro de digitação

        try {
            const response = await axios.post(`${process.env.REACT_APP_URL_API}/register`, {
                email: email,
                password: password,
                username: username,
            });

            // Você pode manipular a resposta da API aqui
            console.log('Resposta da API:', response.data);
            setResponse(response.data); // Define a resposta no estado, se necessário
            if (response.status === 200) {
                setShowAlert(true);
            }
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            navigate('/')
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
                    <Typography variant="h5" align="center">
                        Criar conta
                    </Typography>
                    <form onSubmit={handleFormLogin}>
                        <TextField
                            label="Nome"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type="name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Senha"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handlePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />



                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleLogin}
                            style={{ marginTop: '20px' }}
                            type='submit'
                        >
                            Cadastra
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
                            Ocorreu um erro. Dados incorretos.
                        </Alert>
                    )}

                </Paper>
            </Container>
        </div>

    );
}

export default CreateForm;
