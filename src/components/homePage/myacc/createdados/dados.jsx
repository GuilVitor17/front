import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Avatar,
    IconButton,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { navigate } from 'react-router-dom';


function TextForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [idade, setIdade] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cidade, setCidade] = useState('');
    const [sexo, setSexo] = useState('');
    const token = localStorage.getItem('token')
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const id = localStorage.getItem('id')

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Função para fazer a solicitação GET
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL_API}/dados`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },

                }); // Substitua a URL pela sua API
                setData(response.data); // Atualiza o estado com os dados da resposta
                setIsLoading(false);
                console.log(response.data)
                const Id = localStorage.getItem('id')
                
                if (response.data.item[0].user_id !== Id) {
                    localStorage.setItem('hasLoggedIn', 'false');
                    navigate(`/homepages/${Id}/createmyacc`);
                } else {
                    localStorage.setItem('hasLoggedIn', 'true');
                    navigate(`/homepages/${Id}`);
                }

            } catch (error) {
                setError(error); // Em caso de erro, define o estado de erro
                setIsLoading(false); // Define isLoading como falso para indicar que a solicitação terminou
            }
        };

        // Chama a função fetchData quando o componente é montado
        fetchData();
    }, []);


    const handleInputChangename = (e) => {
        setName(e.target.value);
    };

    const handleInputChangesexo = (e) => {
        setSexo(e.target.value);
    };

    const handleInputChangecidade = (e) => {
        setCidade(e.target.value);
    };

    const handleInputChangeidade = (e) => {
        setIdade(e.target.value);
    };

    const handleInputChangetelefone = (e) => {
        setTelefone(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const textData = {
            name: name,
            idade: idade,
            sexo: sexo,
            cidade: cidade,
            telefone: telefone
        };

        // Chame a função de envio de texto fornecida pelo componente pai

        try {
            // Faça a chamada da API para enviar dados de texto
            const response = await axios.post(`${process.env.REACT_APP_URL_API}/dados`,
                textData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                }
            );

            console.log('Resposta da API de Texto:', response);
            if (response.status === 200) {
                onSubmit(textData);
            }

            // Manipule a resposta da API conforme necessário
        } catch (error) {
            console.error('Erro ao enviar os dados de texto:', error);
            // Trate erros de forma apropriada.
            onSubmit(textData);

        }
    };

    return (
        <div className='containerr'>
            <Paper elevation={0} style={{ padding: '0px', marginTop: '0px' }}>
                <Typography variant="h5" align="center">
                    Cadastro de Usuário
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="name"
                        value={name}
                        onChange={handleInputChangename}
                    />
                    <TextField
                        label="Idade"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="idade"
                        value={idade}
                        onChange={handleInputChangeidade}
                    />
                    <TextField
                        label="Sexo"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="sexo"
                        value={sexo}
                        onChange={handleInputChangesexo}
                    />
                    <TextField
                        label="Cidade"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="Cidade"
                        value={cidade}
                        onChange={handleInputChangecidade}
                    />
                    <TextField
                        label="Telefone"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="telefone"
                        value={telefone}
                        onChange={handleInputChangetelefone}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '20px' }}
                        type="submit"
                    >
                        Cadastrar dados
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

function ImageForm({ onSubmit }) {
    const [userData, setUserData] = useState({ avatar: null });
    const [isTextSubmit, setIsTextSubmit] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUserData((prevData) => ({
            ...prevData,
            avatar: file,
        }));
    };

    const handleSubmitImage = async (e) => {
        e.preventDefault();

        // Chame a função de envio de imagem fornecida pelo componente pai
        try {
            // Crie um objeto FormData para enviar o arquivo
            const formData = new FormData();
            formData.append('imagem', userData.avatar);

            // Faça a chamada da API para enviar o upload de imagem
            const response = await axios.post(`${process.env.REACT_APP_URL_API}/upload`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: token,
                    },
                }
            );

            console.log('Resposta da API de Upload de Imagem:', response.data);
            if (response.status === 200) {
                navigate(`/homepages/${id}`);
                localStorage.setItem('hasLoggedIn', 'true');
                setIsTextSubmit(true); // Define a flag para indicar envio de texto
                onSubmit(userData.avatar);
                setIsTextSubmit(false); // Define a flag para indicar envio de imagem
            }

            // Manipule a resposta da API conforme necessário
        } catch (error) {
            console.error('Erro ao enviar o upload de imagem:', error);
            // Trate erros de forma apropriada.
        }
    };

    return (
        <div className='containerr'>

            <Paper elevation={0} style={{ padding: '0px', marginTop: '0px' }}>
                <Typography variant="h5" align="center">
                    Cadastro de foto Usuário
                </Typography>
                <form onSubmit={handleSubmitImage}>
                    <div>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="avatar-upload"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="avatar-upload">
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                            >
                                <PhotoCameraIcon />
                            </IconButton>
                        </label>
                        {userData.avatar && (
                            <Avatar
                                alt="User Avatar"
                                src={URL.createObjectURL(userData.avatar)}
                            />
                        )}
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '20px' }}
                        type="submit"
                    >
                        Cadastrar Imagem
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

function MultiStepForm() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showTextForm, setShowTextForm] = useState(true);
    const [showImageForm, setShowImageForm] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const hasLoggedIn = localStorage.getItem('hasLoggedIn');

        if (hasLoggedIn) {
            setIsLoggedIn(true);
        } else {
            setShowTextForm(true);
        }
    }, []);

    const handleTextSubmit = (textData) => {
        // Lógica de envio dos dados de texto para o servidor aqui
        console.log('Dados de Texto Enviados:', textData);

        // Atualize o estado para mostrar o formulário de imagem
        setShowTextForm(false);
        setShowImageForm(true);
    };

    const handleImageSubmit = (avatar) => {
        // Lógica de envio do upload de imagem para o servidor aqui
        console.log('Upload de Imagem Enviado:', avatar);

        // Atualize o estado para indicar que o usuário está logado
        setIsLoggedIn(true);

        // Oculte o formulário
        setShowImageForm(false);

        // Redirecione para a página de destino após o login
        navigate(`/homepages/${id}`);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                {isLoggedIn ? (
                    <div>
                        {navigate(`/homepages/${id}`)}
                    </div>
                ) : (
                    showTextForm ? (
                        <TextForm onSubmit={handleTextSubmit} />
                    ) : (
                        <ImageForm onSubmit={handleImageSubmit} />
                    )
                )}
            </Paper>
        </Container>
    );
}

export default MultiStepForm;
