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
    Grid,
    List,
    ListItem,
    Avatar,
    ListItemText,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import Navbar from '../../homePage/navbar/navbar'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { format } from 'date-fns';


function Chat() {

    const [mensagem, setMessage] = useState('');
    const [listmensagem, setlistmsg] = useState(['']);
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    const navigate = useNavigate()
    const [imageData, setImageData] = useState({});
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value)
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`${process.env.REACT_APP_URL_API}/listchat`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                });

                console.log(userResponse.data.msgs);
                setlistmsg(userResponse.data.msgs);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();


    }, [token]);



    const reload = () =>{
        const intervalId = setInterval(() => {
            window.location.reload();
          }, 1000);
        
          // Certifique-se de limpar o intervalo quando o componente é desmontado
          return () => clearInterval(intervalId);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`${process.env.REACT_APP_URL_API}/dados`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                });

                const imageResponse = await axios.get(`${process.env.REACT_APP_URL_API}/imagens`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                });
                const userData = userResponse.data.item[0];
                setImageData(imageResponse.data[0].name);
                setName(userData.name);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [token]);




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Faça a chamada da API para enviar dados de texto
            const response = await axios.post(`${process.env.REACT_APP_URL_API}/createchat`, {
                name: name,
                urlImage: imageData,
                description: mensagem
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            }
            );
            // Manipule a resposta da API conforme necessário
            console.log(response)
            window.location.reload();

        } catch (error) {
            console.error('Erro ao enviar os dados de texto:', error);
            // Trate erros de forma apropriada.
        }


    };

    function isDateValid(date) {
        return !isNaN(new Date(date).getTime());
    }



    return (
        <>
            <Navbar />
            <div className='containerrr'>
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} style={{ overflow: 'auto', maxHeight: '450px' }}>
                            <Paper elevation={3} style={{ padding: '0px' }}>
                                <IconButton color="primary" onClick={reload}>
                                    <RefreshIcon />
                                </IconButton>
                                <List>
                                    {listmensagem
                                        .slice() // Crie uma cópia para não alterar o array original
                                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Ordene por hora de criação (do mais recente ao mais antigo)
                                        .map((msg, index) => (
                                            <div key={index} style={{ margin: '5px auto', padding: '5px', width: '90%', borderBottom: '1px solid #333' }}>
                                                <ListItem>
                                                    <Avatar src={msg.urlImage} />
                                                    <ListItemText primary={msg.name} secondary={isDateValid(msg.createdAt) ? format(new Date(msg.createdAt), 'dd/MM/yyyy HH:mm') : 'Data inválida'} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText primary={msg.description} style={{ wordWrap: 'break-word' }} />
                                                </ListItem>
                                            </div>
                                        ))}
                                </List>



                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5" align="center">
                                    Escrever mensagem
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        label="Digite sua Mensagem"
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        name="message"
                                        type="text"
                                        value={mensagem}
                                        onChange={handleChange}
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
                        </Grid>

                    </Grid>
                </Container>
            </div>
        </>
    );
}

export default Chat;
