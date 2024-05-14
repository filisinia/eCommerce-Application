import { AppBar, Button, Toolbar, Typography } from '@mui/material';

const Header = (): JSX.Element => (
  <>
    <AppBar sx={{ backgroundColor: '#0d0d0d' }}>
      <Toolbar>
        <Typography variant='h5' sx={{ flexGrow: 1 }}>
          Store Name
        </Typography>
        <Button variant='outlined' sx={{ marginRight: '10px' }}>
          Log in
        </Button>
        <Button variant='contained'>Sign up</Button>
      </Toolbar>
    </AppBar>
    <Toolbar />
  </>
);

export default Header;
