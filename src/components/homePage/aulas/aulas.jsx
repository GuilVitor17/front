import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Navbar from '../navbar/navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));




const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const token = localStorage.getItem('token')
  const id = localStorage.getItem('id')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`${process.env.REACT_APP_URL_API}/aulastrue`, {
          headers: {
            'Authorization': `${token}`, // Substitua com o seu token de autenticação, se necessário
          },
        });

        if (response.data.length === 0) {
          // Redireciona para a rota se aprovado
          navigate(`/homepages/${id}`);
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

    fetchData();
  }, []);

  const youtubeVideoEmbed = (
    <iframe
      width="100%"
      height="400"
      src="https://www.youtube.com/embed/1bEbBkWc4-I?si=l4Ngu6rwtg_EIjfC"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  );

  const Container = styled('div')(({ theme }) => ({
    maxWidth: '1000px',
    margin: '0 auto', // Centraliza horizontalmente
    padding: theme.spacing(2),
  }));


  return (
    <div>
      <Navbar />

      <Container>


        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography variant="h6">Aula 1: Introdução ao React</Typography>
          </AccordionSummary>
          <AccordionDetails>{youtubeVideoEmbed}</AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography variant="h6">Aula 2: Componentes e Props</Typography>
          </AccordionSummary>
          <AccordionDetails>{youtubeVideoEmbed}</AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography variant="h6">Aula 3: Estado e Ciclo de Vida</Typography>
          </AccordionSummary>
          <AccordionDetails>{youtubeVideoEmbed}</AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Typography variant="h6">Aula 4: Avançando com React</Typography>
          </AccordionSummary>
          <AccordionDetails>{youtubeVideoEmbed}</AccordionDetails>
        </Accordion>


      </Container>
    </div>

  );
}
