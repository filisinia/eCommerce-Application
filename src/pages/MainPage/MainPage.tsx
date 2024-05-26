import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const MainPage = (): JSX.Element => (
  <Container sx={{ padding: '20px 0' }}>
    <Typography variant='h5' marginBottom='10px'>
      Main Page
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
    <br />
    <Button component={Link} to='/product-info' variant='outlined' startIcon={<VpnKeyIcon />}>
      Product-info
    </Button>
  </Container>
);

export default MainPage;
