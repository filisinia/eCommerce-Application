import Header from 'components/header/Header';
import AuthCustomerPage from 'pages/AuthCustomerPage/AuthCustomerPage';

import 'styles/styles.scss';

const App = (): JSX.Element => (
  <main>
    <Header />
    <AuthCustomerPage />
  </main>
);

export default App;
