import { Navigate } from 'react-router-dom';

import authCustomerStore from 'store/slices/customer/customerSlice';

interface IProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps): JSX.Element => {
  const { customer } = authCustomerStore((state) => state);

  return !customer ? <Navigate to='/login' replace /> : children;
};

export default ProtectedRoute;
