import { toast, Zoom } from 'react-toastify';

const successNotification = (msg: string): void => {
  toast.success(msg, {
    position: 'bottom-left',
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

export default successNotification;
