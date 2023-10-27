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
import Navbar from '../../navbar/navbar';

function EditForm({ userData, onUpdate }) {
  const [name, setName] = useState(userData.name);
  const [idade, setIdade] = useState(userData.idade);
  const [telefone, setTelefone] = useState(userData.telefone);
  const [cidade, setCidade] = useState(userData.cidade);
  const [sexo, setSexo] = useState(userData.sexo);
  const token = localStorage.getItem('token');
  const iddado = localStorage.getItem('iddados');

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
    const updatedData = {
      name: name,
      idade: idade,
      sexo: sexo,
      cidade: cidade,
      telefone: telefone,
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL_API}/dados/${iddado}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      );

      console.log('Resposta da API de Edição de Dados:', response);
      if (response.status === 200) {
        onUpdate(updatedData);
      }
    } catch (error) {
      console.error('Erro ao editar os dados:', error);
    }
  };

  function ImageForm({ onSubmit }) {
    const [userImage, setUserImage] = useState({ avatar: null }); // Inicialize com null ou outro valor padrão
    const [isTextSubmit, setIsTextSubmit] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const idImage = localStorage.getItem('idImage')
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setUserImage((prevData) => ({
        ...prevData,
        avatar: file,
      }));
    };
  
    const handleSubmitImage = async (e) => {
      e.preventDefault();
  
      try {
        const formData = new FormData();
        formData.append('imagem', userImage.avatar);
  
        const response = await axios.put(
          `${process.env.REACT_APP_URL_API}/edit-image/${idImage}`,
          formData,
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
          setIsTextSubmit(true);
          onSubmit(userImage.avatar);
          setIsTextSubmit(false);
        }
      } catch (error) {
        console.error('Erro ao enviar o upload de imagem:', error);
      }
    };  
  
    return (
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
          {userImage.avatar && (
            <Avatar
              alt="User Avatar"
              src={URL.createObjectURL(userImage.avatar)}
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
    );
  }

  return (
    
    <Paper elevation={3} style={{ padding: '10px', marginTop: '10px' }}>
      <Typography variant="h5" align="center">
        Edição de Dados
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
          Atualizar Dados
        </Button>
      </form>
      <ImageForm onSubmit={onUpdate} />
    </Paper>
  );
}

function UserProfilePanel() {
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState({});
  const [userImage, setUserImage] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log(userData, 'ola mundo');

        const userImage = imageResponse.data[0].name;
        localStorage.setItem('idImage', imageResponse.data[0].id);
        localStorage.setItem('iddados', userResponse.data.item[0].id);

        setUserData(userData);
        setUserImage(userImage);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleUpdate = (updatedData) => {
    setUserData({ ...userData, ...updatedData });
    navigate(`/homepages/${id}`);
  };

  return (
    <> 
      <Navbar />
      <Container maxWidth="sm">
        {isLoading ? (
          <div>Carregando...</div>
        ) : error ? (
          <div>Erro: {error.message}</div>
        ) : (
          <EditForm userData={userData} onUpdate={handleUpdate} />
        )}
      </Container>
    </>
  );
}

export default UserProfilePanel;
