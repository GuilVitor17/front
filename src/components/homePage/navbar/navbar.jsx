import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Settings from '@mui/icons-material/Settings';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ExitToApp } from '@mui/icons-material';



function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate
  const [imageData, setImageData] = useState({});
  const id = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageResponse = await axios.get(`${process.env.REACT_APP_URL_API}/imagens`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        setImageData(imageResponse.data[0].name);
        setIsLoading(false);
        localStorage.removeItem('hasLoggedIn')

      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);


  const ExitApp = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    localStorage.removeItem('hasLoggedIn')
    window.location.reload();

  }







  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            APP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              <Box sx={{ flexGrow: 1, display: { md: 'flex' }}}>
                <Link to={`/homepages/${id}`}><MenuItem><p>INICIO</p></MenuItem></Link>
                <Link to={`/homepages/${id}/aulas`}> <MenuItem><p>AULAS</p></MenuItem></Link>
                <Link to={`/homepages/${id}/listtask`}><MenuItem><p>TAREFAS</p></MenuItem></Link>
                <Link to={`/homepages/${id}/email`}><MenuItem><p>ENVIAR EMAIL</p></MenuItem></Link>
                <Link to={`/homepages/${id}/chat`}><MenuItem><p>CHAT GLOBAL</p></MenuItem></Link>
              </Box>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to={`/homepages/${id}`}><MenuItem><b>INICIO</b></MenuItem></Link>
            <Link to={`/homepages/${id}/aulas`}> <MenuItem><b>AULAS</b></MenuItem></Link>
            <Link to={`/homepages/${id}/listtask`}><MenuItem><b>TAREFAS</b></MenuItem></Link>
            <Link to={`/homepages/${id}/email`}><MenuItem><b>ENVIAR EMAIL</b></MenuItem></Link>
            <Link to={`/homepages/${id}/chat`}><MenuItem><b>CHAT GLOBAL</b></MenuItem></Link>


          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={imageData} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <Link to={`/homepages/${id}/myacc`} > <MenuItem>
                <Avatar src={imageData} alt="Remy Sharp" style={{ padding: '0px', left: '-10px' }} />  Minha Conta
              </MenuItem></Link>
              <Divider />
              <Link to={`/homepages/${id}/updatemyacc`}> <MenuItem>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Editar dados
              </MenuItem></Link>
              <MenuItem onClick={ExitApp}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Sair
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;