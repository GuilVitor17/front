import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, Link, Alert, AlertTitle  } from '@mui/material';
import '../login/login-modules.css'; // Importe o arquivo CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function NewPasswordForm() {
    const [email, setEmail] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [codigo, setCodigo] = useState('');
    const navigate = useNavigate();
    const [response, setResponse] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        // Aqui você pode implementar a lógica de autenticação com o email e senha inseridos.
        console.log('Email:', email);
        console.log('Senha:', NewPasswordForm);
        console.log('Codigo:', codigo);
    };

    const handleFormLogin = async (e) => {

        e.preventDefault(); // Corrigido o erro de digitação

        try {
            const response = await axios.post(`${process.env.REACT_APP_URL_API}/update-password`, {
                email: email,
                newPassword: newpassword,
                token:codigo
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
                <Typography variant="h5" align="center">
                  <Alert severity="success">Codigo enviado com sucesso</Alert>
                </Typography>
                <form onSubmit={handleFormLogin}>
                    <TextField
                        label="Email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                            label="Nova Senha"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            value={newpassword}
                            onChange={(e) => setNewPassword(e.target.value)}
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
                     <TextField
                        label="Codigo Enviado no Email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                        style={{ marginTop: '20px' }}
                        type='submit'
                    >
                        Editar senha
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
                        Revise seus dados!
                    </Alert>
                )}

            </Paper>
        </Container>
        </div>

    );
}

export default NewPasswordForm;
