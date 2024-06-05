import { memo } from 'react';

import { Modal } from '@mui/material';

interface IEditModal {
  children: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
}

const EditModal = ({ children, isOpen, onClose }: IEditModal): JSX.Element => (
  <Modal
    open={isOpen}
    onClose={onClose}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgb(255, 228, 196)',
      zIndex: '999',
    }}
  >
    {children}
  </Modal>
);

export default memo(EditModal);
