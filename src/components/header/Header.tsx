import { AppBar, Button, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = (): JSX.Element => (
  <>
    <AppBar sx={{ backgroundColor: '#0d0d0d' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button component={Link} to='/'>
            Store Name
          </Button>
        </Box>
        <Button component={Link} to='/login' variant='outlined' sx={{ marginRight: '10px' }}>
          Log in
        </Button>
        <Button component={Link} to='/signup' variant='contained'>
          Sign up
        </Button>
      </Toolbar>
    </AppBar>
    <Toolbar />
  </>
);

export default Header;