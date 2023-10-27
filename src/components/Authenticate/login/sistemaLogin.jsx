import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, Link, Alert, AlertTitle } from '@mui/material';
import './login-modules.css'; // Importe o arquivo CSS
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [responsee, setResponse] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [error, setError] = useState(null);
    const id = localStorage.getItem('id')
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleFormLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_URL_API}/login`, {
                email: email,
                password: password,
            });

            // Você pode manipular a resposta da API aqui
            console.log('Resposta da API:', response.status);
            setResponse(response.data); // Define a resposta no estado, se necessário
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.user.id);
            if (response.status === 200) {
                const id = localStorage.getItem('id')
                console.log('Redirecionando para:', `/homepages/${id}/createmyacc`);
                setShowAlert(true);
                console.log('Resposta da API:', response.status);
                navigate(`/homepages/${id}/createmyacc`);
                window.location.reload();

                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            }



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
                    <Typography variant="h5" align="center">
                        Login
                    </Typography>
                    <form onSubmit={handleFormLogin}>
                        <TextField
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type='email'
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
                            style={{ marginTop: '20px' }}
                            type='submit'
                        >
                            Entrar
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

                    <Link className='edite-password'
                        component="button"
                        variant="body1"
                        onClick={() => {
                            console.info("I'm a button.");
                            navigate('/tokenemail')

                        }}
                    >
                        Editar-senha
                    </Link>
                    <Link className='register'
                        component="button"
                        variant="body1"
                        onClick={() => {
                            console.info("I'm a button.");
                            navigate('/create')
                        }}
                    >
                        Criar-conta
                    </Link>


                </Paper>
            </Container>
        </div>

    );
}

export default LoginForm;
