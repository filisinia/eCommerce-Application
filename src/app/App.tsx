import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from 'components/header/Header';
import AuthCustomerPage from 'pages/AuthCustomerPage/AuthCustomerPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import MainPage from 'pages/MainPage/MainPage';

const App = (): JSX.Element => (
  <BrowserRouter>
    <CssBaseline>
      <Header />
      <Routes>
        <Route element={<MainPage />} path='/' />
        <Route element={<AuthCustomerPage />} path='/signup' />
        <Route element={<LoginPage />} path='/login' />
      </Routes>
    </CssBaseline>
  </BrowserRouter>
);

export default App;
