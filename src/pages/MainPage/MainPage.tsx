import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const MainPage = (): JSX.Element => (
  <Container sx={{ padding: '20px 0' }}>
    <Typography variant='h5' marginBottom='10px'>
      Main Page
    </Typography>{' '}
    <Typography variant='h6' mb={2}>
      The discount code is <span style={{ color: '#1565c0', fontWeight: 'bold' }}>BOGO</span>
    </Typography>
    <Button
      component={Link}
      to='/signup'
      variant='outlined'
      startIcon={<PersonAddAlt1Icon />}
      sx={{ marginBottom: '5px' }}
    >
      Sign up
    </Button>
    <br />
    <Button component={Link} to='/login' variant='outlined' startIcon={<VpnKeyIcon />}>
      Log in
    </Button>
  </Container>
);

export default MainPage;
