import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

import App from 'app/App';

import 'styles/styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const Root = (
  <StrictMode>
    <App />
  </StrictMode>
);

root.render(Root);
