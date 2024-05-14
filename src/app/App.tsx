import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from 'components/header/Header';
import AuthCustomerPage from 'pages/AuthCustomerPage/AuthCustomerPage';
import MainPage from 'pages/MainPage/MainPage';

const App = (): JSX.Element => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route element={<MainPage />} path='/' />
      <Route element={<AuthCustomerPage />} path='/signup' />
    </Routes>
  </BrowserRouter>
);

export default App;
