import { toast, Zoom } from 'react-toastify';

const errorNotification = (msg: string): void => {
  toast.error(msg, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Zoom,
  });
};

export default errorNotification;
