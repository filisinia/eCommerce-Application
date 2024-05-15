import { Suspense, lazy } from 'react';

import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from 'components/header/Header';

const AuthPage = lazy(() => import('pages/AuthPage/AuthPage'));
const ErrorPage = lazy(() => import('pages/ErrorPage/ErrorPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const MainPage = lazy(() => import('pages/MainPage/MainPage'));

const App = (): JSX.Element => (
  <BrowserRouter>
    <CssBaseline>
      <Header />
      <Suspense>
        <Routes>
          <Route element={<MainPage />} path='/' />
          <Route element={<AuthPage />} path='/signup' />
          <Route element={<LoginPage />} path='/login' />
          <Route element={<ErrorPage />} path='*' />
        </Routes>
      </Suspense>
    </CssBaseline>
  </BrowserRouter>
);

export default App;
