import { Suspense, lazy, useEffect } from 'react';

import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import setApiToken from 'api/setApiToken';
import Header from 'components/header/Header';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import notification from 'utils/notification';

const AuthPage = lazy(() => import('pages/AuthPage/AuthPage'));
const ErrorPage = lazy(() => import('pages/ErrorPage/ErrorPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const MainPage = lazy(() => import('pages/MainPage/MainPage'));
const ProductsPage = lazy(() => import('pages/ProductsPage/ProductsPage'));
const ProductPage = lazy(() => import('pages/ProductPage/ProductPage'));

const App = (): JSX.Element => {
  useEffect(() => {
    setApiToken().catch((e: Error) => notification('error', e.message));
  }, []);

  return (
    <BrowserRouter>
      <CssBaseline>
        <Header />
        <Suspense>
          <Routes>
            <Route element={<AuthPage />} path='/signup' />
            <Route element={<LoginPage />} path='/login' />
            <Route element={<MainPage />} path='/' />
            <Route element={<ErrorPage />} path='*' />

            <Route element={<ProductsPage />} path='/products' />
            <Route element={<ProductPage />} path='/products/:product' />
          </Routes>
        </Suspense>
        <ToastContainer />
      </CssBaseline>
    </BrowserRouter>
  );
};

export default App;
