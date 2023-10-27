import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Navbar from '../navbar/navbar';

function UserProfilePanel() {
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState({});
  const [imageData, setImageData] = useState({});
  const [name, setName] = useState('');
  const [idade, setIdade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [sexo, setSexo] = useState('');
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
        setUserData(userData);
        setImageData(imageResponse.data[0].name);
        setCidade(userData.cidade);
        setIdade(userData.idade);
        setName(userData.name);
        setSexo(userData.sexo);
        setTelefone(userData.telefone);
        setIsLoading(false);
        console.log(imageResponse.data);
        console.log(userData);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <Navbar />
    <div className='container'> 

      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        {isLoading ? (
          <div>Carregando...</div>
        ) : error ? (
          <div>Erro: {error.message}</div>
        ) : (
          <Card sx={{ maxWidth: '600px' }}>
            <CardContent>
              <Avatar sx={{ width: 150, height: 150, mb: 2 }} alt="Foto do usuário" src={imageData} />
              <Typography variant="h6" mb={2}>
                {name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Idade: {idade}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Sexo: {sexo}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Telefone: {telefone}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Cidade: {cidade}
              </Typography>
              {/* Adicione outros dados do usuário conforme necessário */}
            </CardContent>
          </Card>
        )}
      </Box>
      </div> 
    </>
  );
}

export default UserProfilePanel;
